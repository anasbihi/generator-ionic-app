var config = {
  sass: ['../scss/**/*.scss'],
  root: require('../package.json').appPath || 'app',
  name: require('../package.json').name || 'new-app',
  dist : 'www',
  title: require('../package.json').description,
  version: require('../package.json').version,
  storepass: 'qQ29*h5v13Q0X5Y',
  keystore: 'certs/<%= appname %>.keystore',
  apk: 'platforms/android/build/outputs/apk',
  sdkPath : '~/Library/Android/sdk/build-tools/23.0.3',
  releases: 'output'
};

module.exports = config;
