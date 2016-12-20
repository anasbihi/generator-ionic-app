'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ionic-app') + ' generator!'
    ));

    var prompts = [{
          type: 'confirm',
          name: 'someAnswer',
          message: 'Would you like to enable this option?',
          store : true
        },{
          type: 'input',
          name: 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
        }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
