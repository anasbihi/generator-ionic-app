describe('Home Module', function() {
  var scope,
      homeCtrl;

  beforeEach(function(){
    module('<%= appname %>');
    module('<%= appname %>.home');
  });

  beforeEach(function(){
    inject(function ($injector, $controller, $rootScope) {
      scope = $rootScope.$new();
      $controller('HomeCtrl', {
        $scope:scope
      });
    });
  });

  it('should create a controller',function(){
    expect(scope.playlists.length).toBe(6);
  });

  it('should add an item to playlist', function(){
    scope.addItem({ title: 'Rock', id: 7 });
    expect(scope.playlists.length).toBe(7);
  });
});
