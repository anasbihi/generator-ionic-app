(function(){
  angular
  .module(
    '<%= appname %>',
    [
      //app dependencies
      'ionic',
      'pascalprecht.translate',
      'ngCookies',
      //app modules dependencies
      '<%= appname %>.menu',
      '<%= appname %>.home'
    ]);
})();
