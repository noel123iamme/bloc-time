(function() {
  function TaskController($firebaseArray) {
    var ref = new Firebase("https://fiery-heat-166.firebaseio.com");

    this.tasks = $firebaseArray(ref);
    this.newTaskText = '';
    
    this.addTask = function() {
      this.tasks.$add({
        text: this.newTaskText
      });
    };
  };
  
  angular
    .module('blocApp')
    .controller('TaskController', ['$firebaseArray', TaskController])
})();