// Karma configuration
// Generated on Tue Jan 10 2017 16:12:30 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //APIs used in the app
      'app/lib/angular/angular.js',
      'app/lib/ionic/js/ionic.js',
      'app/lib/ionic/js/ionic-angular.js',
      'app/lib/angular-sanitize/angular-sanitize.js',
      'app/lib/angular-ui-router/release/angular-ui-router.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-translate/angular-translate.js',
      'app/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'app/lib/angular-translate-storage-local/angular-translate-storage-local.js',
      'app/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/lib/angular-cookies/angular-cookies.js',
      //angular mocks API for test
      'app/lib/angular-mocks/angular-mocks.js',
      //app js files
      'app/js/*.js',
      'app/modules/{,**/}*.js',
      //unit tests files
      'spec/{,**/}*.spec.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
