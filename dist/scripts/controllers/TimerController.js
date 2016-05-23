(function() {
  function TimerController(TimerFactory) {
    this.TFactory = TimerFactory;
  };
  
  angular
    .module('blocApp')
    .controller('TimerController', ['TimerFactory', TimerController])
})();
