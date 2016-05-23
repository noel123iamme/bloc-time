(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    
    $stateProvider
      .state('timer', {
        url: '/',
        controller: 'TimerController as TCtrl',
        templateUrl: '/templates/timer.html'
    });
  }

  angular
    .module('blocApp', ['firebase', 'ui.router'])
    .config(config);
})();
