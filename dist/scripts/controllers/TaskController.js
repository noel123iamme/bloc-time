(function() {
  function TaskController($firebaseArray) {
    var ref = new Firebase("https://fiery-heat-166.firebaseio.com");

    this.tasks = $firebaseArray(ref);
    this.newTaskText = '';
    
    this.addTask = function() {
      console.log(Date.now());
      this.tasks.$add({
        text: this.newTaskText,
        dateTime: Date.now()
      });
      
    };
  };
  
  angular
    .module('blocApp')
    .controller('TaskController', ['$firebaseArray', TaskController])
})();