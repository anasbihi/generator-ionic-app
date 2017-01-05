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

- ``execute.js`` is also a SSJS file that contains a function wich is used inside the app's``Gulpfile.js``.

#### resources folder
this folder will contains the set of images that are automatically generated from one of the following commands
```shell
	ionic resources
	ionic resources --icon
	ionic resources --splash
```
>Please read the [ionic framework official documentation](http://ionicframework.com/docs/cli/icon-splashscreen.html).

#### scss folder
Contains the SCSS files that will be used to generate CSS.

### Useful Gulp commands

#### At the beginning
Once the project is generated, the ``www/`` folder must be generated using the following Gulp command:

```shell
	gulp build-web
```

> Please remember that you have to use this command every time you need to test your app on web browser or device.

#### Build the app
Once the ``www/`` folder is generated, the build of the Android and iOS apps can be possible. To prepare your app for deploy on device, use the following command:

```shell
	gulp build-device
	gulp app-prepare
```

##### What's next?
You need to build the platform specific project that will contains all the HTML, JS and CSS files that has been generated using the previous commands.

To build an Android app, use the following command:

```shell
	gulp app-build-android
```
To build an iOS app, use the following command:
```shell
	gulp app-build-ios
```
#### Release the app
##### Release an Android app
To release your app, you need to check some details like:

* Having the account to deploy the app
* Having Generating the certificate that will be used to sign the app that will
* Having the right version number

>Please read publishing guide in the [Ionic framework official documentation](https://ionicframework.com/docs/guide/publishing.html).

If your ``gulp_scripts/config.js`` is configured correctly, you will be able to get a release version of your app that will be ready for deploy on playstore using the following command:

```shell
	gulp app-release-android
```

##### Release an iOS app
For iOS developers, it is much easier to get a release version of the app using :

```shell
	gulp app-release-ios
```
>Please read publishing guide in the [Ionic framework official documentation](https://ionicframework.com/docs/guide/publishing.html).