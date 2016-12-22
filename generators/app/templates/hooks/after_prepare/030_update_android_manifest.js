#!/usr/bin/env node

// Add Update Android Manifest file
// v1.0
// Automatically adds the permissions specified
// in Config.xml file into AndroidManifest.xml

var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var lodash = require('lodash');

var rootdir = process.argv[2];

function buildXML(obj, input){
  var dest = parser.toJson(
    obj,
    {
      reversible: true,
      sanitize : true,
      coerce: true,
      trim: true,
      arrayNotation: false
    }),
  cfg = parser.toJson(
    input,
    {
      reversible: true,
      sanitize : true,
      coerce: true,
      trim: true,
      arrayNotation: false
    });

  lodash.assign(cfg,[cfg,dest]);
  return parser.toXml(cfg);
}

function log(indexPath, targetPath){
  process.stdout.write('AndroidManifest.xml located in: '+ indexPath+' has been updated using the config file located in: '+targetPath+'\n');
}

function addPermissions(indexPath, targetPath){
  try {
    var configXML = fs.readFileSync(targetPath, 'utf8'),
    androidManifestXML = fs.readFileSync(indexPath,'utf8');
    var newAndroidManifest = buildXML(androidManifestXML, configXML);
    fs.writeFileSync(indexPath, newAndroidManifest, 'utf8');
    log(indexPath, targetPath);
  } catch (e) {
    process.stdout.write(e);
  }
}

function updateManifest(indexPath, targetPath){
  try {
    var configXML = fs.readFileSync(targetPath, 'utf8');
    fs.writeFileSync(indexPath,configXML,'utf8');
    log(indexPath, targetPath);
  } catch (e) {
    process.stdout.write(e);
  }
}

if (rootdir) {
  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for(var x=0; x<platforms.length; x++) {
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath, targetPath;

      if(platform == 'android') {
        indexPath= path.normalize('android_cfg.xml');
        process.stdout.write('\nandroid configuration to inject: '+ indexPath+'\n');

        targetPath = path.normalize(path.join('platforms', platform, 'AndroidManifest.xml'));
        process.stdout.write('\nAndroid manifest to update: '+ targetPath+'\n');
      }

      if(fs.existsSync(indexPath)) {
        process.stdout.write('trying to update configuration for '+ platform+'\n');
        // updateManifest(targetPath,indexPath);
        addPermissions(targetPath,indexPath)
      }

    } catch(e) {
      process.stdout.write(e);
    }
  }

}
