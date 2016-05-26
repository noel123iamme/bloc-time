(function() {
  function TimerFactory(CONST, $interval, $rootScope) {
    var scope = $rootScope;
    var TimerFactory = {};
    
    var isTimer = undefined;
    var sessionCount = 0;
    
    
    scope.currentTime = CONST.WORK_SESSION;
    
    scope.$watch('currentTime', function() {
      if (scope.currentTime === 0) {
        mySound.play();
      }
    });
    
    var mySound = new buzz.sound("../assets/sounds/ElevatorDing.mp3", { preloan: true });

    var setButtonText = function(text) {
      TimerFactory.currentButtonText = text + ' ' + TimerFactory.currentButtonType;  
    }
    
    var setSession = function(seconds, button) {
      TimerFactory.onBreak = ( CONST.BREAK_BUTTON === button )
      TimerFactory.currentTime = seconds;
      TimerFactory.currentSession = seconds;
      TimerFactory.currentButtonType = button;
      setButtonText("Start");
    };
    
    var updateSesionCount = function() {
      sessionCount++;
      if (sessionCount === CONST.NUM_OF_SESSIONS) {
        sessionCount = 0;
        TimerFactory.currentTime = CONST.LONG_BREAK;
      }
    }
    
    var updateTime = function() {
      TimerFactory.currentTime--;
      scope.currentTime = TimerFactory.currentTime;
      if (TimerFactory.currentTime <= 0) {
        if (TimerFactory.currentButtonType === CONST.WORK_BUTTON) {
          setSession(CONST.BREAK_SESSION, CONST.BREAK_BUTTON);
          updateSesionCount();
        } else {
          setSession(CONST.WORK_SESSION, CONST.WORK_BUTTON);
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

    TimerFactory.currentTime = CONST.WORK_SESSION;
    TimerFactory.currentSession = CONST.WORK_SESSION;
    TimerFactory.currentButtonText = "Start " + CONST.WORK_BUTTON;
    TimerFactory.currentButtonType = CONST.WORK_BUTTON;
    TimerFactory.onBreak = false;
    
    var buttonClick = function(seconds, buttonType) {
      if ( angular.isUndefined(isTimer) ) {
        setButtonText("Reset");
        startTimer();
      } else {
        stopTimer();
        setSession(seconds, buttonType);
      }
    };
    
    TimerFactory.workClick = function() {
      buttonClick(CONST.WORK_SESSION, CONST.WORK_BUTTON)
    }
    
    TimerFactory.breakClick = function() {
      buttonClick(CONST.BREAK_SESSION, CONST.BREAK_BUTTON)
    }
    
    return TimerFactory;
  };
  
  angular
    .module('blocApp')
    .factory('TimerFactory', ['CONST', '$interval', '$rootScope', TimerFactory])
    .constant('CONST', {
      WORK_SESSION: 15,
      BREAK_SESSION: 3,
      LONG_BREAK: 18,
      NUM_OF_SESSIONS: 4,
      WORK_BUTTON: "Work",
      BREAK_BUTTON: "Break"  
    })
})();