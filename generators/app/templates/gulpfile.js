var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var cleanDest = require('gulp-dest-clean');
var copy = require('gulp-copy');
var htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var lodash = require('lodash');
var ngAnnotate = require('gulp-ng-annotate');

var execute = require('./gulp_scripts/execute.js');
var config = require('./gulp_scripts/config.js');

gulp.task('default', [
  'clean',
  'mkdir-dist',
  'concat',
  'sass'
]);

gulp.task('concat',[
  'concat-app',
  'concat-vendor',
  'concat-modules',
  'replace-HTML',
  'minify-HTML',
  'copy-fonts',
  'copy-translations'
]);

gulp.task('build-web',[
  'default'
]);

gulp.task('build-device',[
  'default'
]);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(gulp.dest('./www/css/'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./www/css/'))
  .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(config.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
  .on('log', function(data) {
    gutil.log('bower', gutil.colors.cyan(data.id), data.message);
  });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('clean', function(done){
  gulp.src(config.root)
  .pipe(cleanDest(config.dist))
  .on('end',done);
});

gulp.task('mkdir-dist', function(done){
  if (!fs.existsSync(config.dist)){
    fs.mkdirSync(config.dist);
  }
  done();
});

gulp.task('minify-HTML', function(done){
  gulp.src(config.root+'/modules/*/*.html')
  .pipe(htmlmin({collapseWhitespace:true}))
  .pipe(gulp.dest(config.dist+'/modules/'))
  .on('end', done);
});

gulp.task('replace-HTML', function(done){
  gulp.src(config.root+'/index.html')
  .pipe(htmlreplace({
    'css': 'css/ionic.app.min.css',
    'vendor': 'js/vendor.js',
    'js': 'js/app.js',
    'modules': 'js/modules.js'
  }))
  .pipe(gulp.dest(config.dist))
  .on('end', done);
});

gulp.task('concat-vendor', function(done){
  gulp.src([
    config.root+'/lib/angular/angular.js',
    config.root+'/lib/ionic/js/ionic.js',
    config.root+'/lib/ionic/js/ionic-angular.js',
    config.root+'/lib/angular-sanitize/angular-sanitize.js"',
    config.root+'/lib/angular-ui-router/release/angular-ui-router.js',
    config.root+'/lib/angular-animate/angular-animate.js',
    config.root+'/lib/angular-translate/angular-translate.js',
    config.root+'/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
    config.root+'/lib/angular-translate-storage-local/angular-translate-storage-local.js',
    config.root+'/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    config.root+'/lib/angular-cookies/angular-cookies.js',
    config.root+'/lib/angular-sanitize/angular-sanitize.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest(config.dist+'/js/'))
  .on('end', done);
});

gulp.task('concat-modules', function(done){
  gulp.src([
    config.root+'/modules/menu/menu.js',
    config.root+'/modules/menu/menu.routes.js',
    config.root+'/modules/menu/menu.controller.js',
    config.root+'/modules/home/home.js',
    config.root+'/modules/home/home.routes.js',
    config.root+'/modules/home/home.controller.js'
  ])
  .pipe(concat('modules.js'))
  .pipe(ngAnnotate({single_quotes: true}))
  .pipe(gulp.dest(config.dist+'/js/'))
  .on('end', done);
});

gulp.task('concat-app', function(done){
  gulp.src([
    config.root+'/js/app.js',
    config.root+'/js/app.config.js',
    config.root+'/js/app.i18n.js'
  ])
  .pipe(concat('app.js'))
  .pipe(ngAnnotate({single_quotes: true}))
  .pipe(gulp.dest(config.dist+'/js/'))
  .on('end', done);
});

gulp.task('copy-fonts', function(done){
  gulp.src(config.root+'/lib/ionic/fonts/**')
  .pipe(gulp.dest(config.dist+'/lib/ionic/fonts/'))
  .on('end',done);
});

gulp.task('copy-translations', function(done){
  gulp.src(config.root+'/i18n/**')
  .pipe(gulp.dest(config.dist+'/i18n/'))
  .on('end',done);
})

gulp.task('app-prepare', function(done){
  execute([
    'ionic state restore'
  ],done);
});

gulp.task('app-build-android',function(done){
  execute([
    'cordova platform rm android',
    'cordova platform add android',
    'ionic build android'
  ],done);
});

gulp.task('app-build-ios', function(done){
  execute([
    'ionic build ios',
    'security find-identity -v -p codesigning'
  ],done);
});

gulp.task('app-release-android',function(done){
  execute([
    'cordova build android --release',
    'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass '+config.storepass+' -keystore '+config.keystore+' '+config.apk+'/android-release-unsigned.apk '+config.name,
    'mkdir '+config.releases,
    config.sdkPath +'/zipalign -v 4 '+config.apk+'/android-release-unsigned.apk '+config.releases+'/'+config.name+'-'+config.version+'.apk',
  ],done);
});

gulp.task('app-release-ios', function(done){
  execute([
    'cordova build ios --release --device',
    'mkdir '+config.releases,
    'cp platforms/ios/build/device/*.ipa '+config.releases+'/'+config.name+'-v'+config.version+'.ipa'
  ],done);
})
