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
        controller: 'PomodoroController as pomo',
        templateUrl: '/templates/timer.html'
      })
      .state('task', {
        url: '/',
        controller: 'TaskController as taskCtrl',
        templateUrl: '/templates/tasks.html'
      });
  }

  angular
    .module('blocApp', ['firebase', 'ui.router'])
    .config(config);
})();
