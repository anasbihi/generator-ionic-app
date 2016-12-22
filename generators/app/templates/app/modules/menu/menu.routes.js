(function(){
  angular
  .module('<%= appname %>.menu')
  .config(cfg);

  function cfg($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'modules/menu/menu.html',
      controller: 'MenuCtrl'
    });
  }
})();
