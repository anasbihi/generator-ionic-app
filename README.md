# A [Yeoman](http://yeoman.io) generator for Ionic Projects

This is a yeoman generator for my [Ionic app](https://github.com/anasbihi/generator-ionic-app), an Ionic app ready to use. It sets up everything to get you started with [Gulp](http://gulpjs.com/) and [Ionic](http://ionicframework.com/) in no time.
Currently using Ionic 1.3.2 and Angular 1.5.10.


### Features

* Gulp jobs for development, building, emulating and running your app
* Compiles and concatenates your Sass
* Local development server with live reload, even inside android and ios emulators
* Auto min-safe all Angular DI through `ng-annotate`, no need to use weird bracket notation
* Easily customize Ionic styles from within your Sass
* Comes already with a set of cordova plugins that are very helpful to produce robust mobile apps:
	*  [cordova-plugin-android-permissions](https://github.com/NeoLSN/cordova-plugin-android-permission)
	*  [cordova-plugin-jailbreak-detection](https://github.com/leecrossley/cordova-plugin-jailbreak-detection)
	*  [cordova-plugin-root-detection](https://github.com/trykovyura/cordova-plugin-root-detection)


### Installation

[![NPM](https://nodei.co/npm/generator-ionic-app.png?downloads=true)](https://nodei.co/npm/generator-ionic-app/)

You should have Yeoman installed globally

```bash
npm install -g yo
```

To install generator-ionic-app from npm, run:

```bash
npm install -g generator-ionic-app
```

Finally, initiate the generator:

```bash
yo ionic-app
```

after installation, just start developing cool ionic apps!

## Changelog
#### 1.1.1
* Fix some errors on project description
* Add an example of unit test for the generated project

#### 1.0.1
* more documentation for the generated project

#### 1.0.0
* initial commit
* building app skeleton

## License
MIT
