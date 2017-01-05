var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('lodash');
var fs = require('fs-extra');
var path = require('path');

module.exports = class extends Generator{
  constructor(args,opts){
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.conflicter.force = true
  }
  _clean(){
    fs.emptyDirSync(this.destinationPath(this.options.appname));
  }
  _merge(dirList){
    var self = this;
    lodash.forIn(dirList, function(file){
      var target = path.join(
        self.destinationPath(),
        self.options.appname,
        file
      );
      self.fs.copyTpl(
        target,
        target,
        {
          appname : self.options.appname,
          version : self.options.version,
          description : self.options.description,
          package : self.options.package
        }
      );
    });
  }
  _copy(src,dest){
    try {
      fs.copySync(src, dest);
    } catch (err) {
      this.log(err);
    }
  }
  prompting(){
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('generator-ionic-app') + ' generator!'
    ));

    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : 'ionic-app'
    },
    {
      type    : 'input',
      name    : 'version',
      message : 'Your project version',
      default : '0.0.1'
    },
    {
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
      default : this.description
    },
    {
      type    : 'input',
      name    : 'package',
      message : 'Your project package',
      default : this.description
    }]).then((answers) => {
      this.options.appname = answers.name;
      this.options.version = answers.version;
      this.options.description = answers.description;
      this.options.package = answers.package;
    });
  }
  configuring(){
    this._clean();
    this._copy(
      this.templatePath(),
      path.join(
        this.destinationPath(),
        this.options.appname
      )
    );
  }
  writing(){
    this._merge([
      'android_cfg.xml',
      'bower.json',
      'config.xml',
      'ionic.config.json',
      'package.json',
      'README.md',
      'app/js/app.js',
      'app/js/app.i18n.js',
      'app/js/app.config.js',
      'app/modules/home/home.controller.js',
      'app/modules/home/home.js',
      'app/modules/home/home.routes.js',
      'app/modules/menu/menu.controller.js',
      'app/modules/menu/menu.js',
      'app/modules/menu/menu.routes.js',
      'app/index.html'
    ]);
  }
  install(){
    this.destinationRoot(
      path.join(
        this.destinationPath(),
        this.options.appname
      )
    );
    this.installDependencies({
      npm: true,
      bower: true
    });
  }
};
