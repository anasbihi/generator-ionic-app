# <%= appname %>

### <%= appname %> folders architecture

	- app
	 |- i18n
	 |- img
	 |- js
	 |- modules
	- gulp_scripts
	- hooks
	- resources
	- scss

#### app folder
The root folder of the app. Each subfolder has a precise aim.

##### i18n folder
Contains the translations files in JSON format.
please note that the translations JSON files should be named like the following **resources-{your-i18n}.json**.
>you can also change the way the files are named by changing the rules of loading static translation files in `app.i18n.js` file.
##### img folder
Contains images that will be used in the app
##### js folder
Contains the app's main JavaScript files:
- `app.js`  contains the dependency injections of all modules.
- `app.config.js` contains the behaviour to perform at app startup
- `app.i18n.js` contains the configuration of translation mechanism

##### modules folder
Contains the app modules will be loaded. Basically, this folder will contains all the parts of the app.
> More documentation about the best practices will be written in the future.
#### gulp_scripts
the ``gulp_scripts/`` folder contains two files javaScript files:
- ``config.js`` is a SSJS file that contains the following configuration:

```javascript
	var config = {
	  sass: ['../scss/**/*.scss'],
	  root: require('../package.json').appPath || 'app',
	  name: require('../package.json').name || 'new-app',
	  dist : 'www',
	  title: require('../package.json').description,
	  version: require('../package.json').version,
	  storepass: 'passwordForPlayStoreCertificate',
	  keystore: 'certs/<%= appname %>.keystore',
	  apk: 'platforms/android/build/outputs/apk',
	  sdkPath : 'path/to/android/sdk',
	  releases: 'output'
	};

```
>The only parameters that must be set up are:
> - **sdkPath** path to the developer's Android SDK
> - **storepass** the password of the certificate to use for signing android app's. click [here](https://developer.android.com/studio/publish/app-signing.html#signing-manually)  for more documentation.
- ``execute.js`` is also a SSJS file that contains a function wich is used inside the app's``Gulpfile.js``
