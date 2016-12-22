(function(){
  angular
  .module('<%= appname %>.home')
  .config(routes);

  function routes($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'modules/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  }
})();
