(function () {

angular
    .module('<%= appname %>')
    .config(config);
    //injection of angular-translate module
    config.$inject = ['$translateProvider'];

function config ($translateProvider) {
    //configuring security
    //link: http://angular-translate.github.io/docs/#/guide/19_security
    $translateProvider.useSanitizeValueStrategy(null);
    //Loading translation files asynchronously
    //link: http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading
    //resource files must :
    //- be placed within assests/i18n folder
    //- their names must begin with 'resources-'
    //- they must be JSON files
    $translateProvider.useStaticFilesLoader({
        prefix:'i18n/resources-',
        suffix:'.json'
    });
    //defining a fall back language
    //the default language of the app is the french language
    $translateProvider.fallbackLanguage('fr-FR');

    //Set up the language negociation
    //Link: https://angular-translate.github.io/docs/#/guide/09_language-negotiation
    $translateProvider.registerAvailableLanguageKeys(['fr-FR'], {
        'fr': 'fr-FR'
    });

    //the app must be able to determine the preferred language by app start
    //device language is set using 'navigator.language' property
    //link:  https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language
    //$translateProvider.preferredLanguage(navigator.language || navigator.systemLanguage);
    $translateProvider.preferredLanguage("fr-FR");

    //the preferred language must be stored
    //laguage storage is done as the following
    // 1- localStorage
    // 2- Cookies
    // link: https://angular-translate.github.io/docs/#/guide/10_storages
    $translateProvider.useLocalStorage();
    //$translateProvider.useCookieStorage();
}

})();
