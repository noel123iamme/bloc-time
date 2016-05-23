(function() {
  function TimerFactory($interval) {
    var TimerFactory = {};
    
    var workSession = 1500;
    var breakSession = 300;
    var numberOfSessions = 4;
    var workButtonType = "Work";
    var breakButtonType = "Break";
    var isTimer = undefined;

    TimerFactory.currentTime = workSession;
    TimerFactory.currentSession = workSession;
    TimerFactory.currentButtonText = "Start " + workButtonType;
    TimerFactory.currentButtonType = workButtonType;
    
    var setButtonText = function(text) {
      TimerFactory.currentButtonText = text + ' ' + TimerFactory.currentButtonType;  
    }
    
    var setSession = function(seconds, button) {
      TimerFactory.currentTime = seconds;
      TimerFactory.currentSession = seconds;
      TimerFactory.currentButtonType = button;
      setButtonText("Start");
    };
    
    var updateTime = function() {
      TimerFactory.currentTime--;
      if (TimerFactory.currentTime <= 0) {
        if (TimerFactory.currentButtonType === workButtonType) {
          setSession(breakSession, breakButtonType);
        } else {
          setSession(workSession, workButtonType);
        }
        stopTimer();
      }
    };
    
    var startTimer = function() {
      if ( angular.isUndefined(isTimer) ) {
        isTimer = $interval(updateTime, 1000);
      }
    };

    var stopTimer = function() {
      if ( angular.isDefined(isTimer) ) {
        $interval.cancel(isTimer);
        isTimer = undefined;
      }
    };

    TimerFactory.buttonClick = function() {
      var seconds = TimerFactory.currentSession;
      var buttonType = TimerFactory.currentButtonType;
      
      if ( angular.isUndefined(isTimer) ) {
        setButtonText("Reset");
        startTimer();
      } else {
        stopTimer();
        setSession(seconds, buttonType);
      }
    };
    
    return TimerFactory;
  };
  
  angular
    .module('blocApp')
    .factory('TimerFactory', ['$interval', TimerFactory])
})();