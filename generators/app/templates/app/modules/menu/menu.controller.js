(function(){
  angular
  .module('<%= appname %>.menu')
  .controller('MenuCtrl', ctrl);

  function ctrl(){
    console.log('MenuCtrl ready to go...');
  }
})();
