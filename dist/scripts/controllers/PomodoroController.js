(function() {
  function PomodoroController($firebaseArray, TimerFactory) {
    this.timer = TimerFactory;
    
    this.toggleMenu = function() {
      console.log('in toggle')
      $("#wrapper").toggleClass("toggled");
    };
  };
  
  angular
    .module('blocApp')
    .controller('PomodoroController', ['$firebaseArray', 'TimerFactory', PomodoroController])
})();