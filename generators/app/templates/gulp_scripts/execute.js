var gulp = require('gulp');
var sh = require('shelljs');
var lodash = require('lodash');

function execute(cmds, callback) {
  var size = cmds.length;
  lodash.forIn(cmds, function(cmd, index) {
    sh.exec(cmd);
    size--;
    if (size === 0) {
      callback();
    }
  });
}

module.exports = execute;