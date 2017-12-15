(function () {
  'use strict';
  angular
    .module('app')
    .directive('toDo', toDo);

  function toDo($log, ApiService) {
    function link(scope) {
      // var truc =this
      // truc.addTodo = addTodo;
      // function addTodo() {
      //   return;
      // }

      var todos = scope.todos = [];
      scope.completed = false;
      ApiService.getAllDataParam()
        .then(getResponse);

      function deleteLigne(todo) {
        ApiService.deleteDataParam(todo.id);
      }


      function setResponse(reponses) {
        // $log.info('la réponses du service :', reponses);
        ApiService.getAllDataParam()
          .then(getResponse);
      }

      function getResponse(reponses) {
        //algo de traitement
        todos = scope.todos = [];
        reponses.forEach(function (reponse) {
          $log.info('utilisateur', reponse.user);
          if (reponse.user.indexOf('cgau-todo') != -1) {
            scope.todos.push({
              title: reponse.data,
              completed: false,
              id: reponse.id
            });
          }
        });
        // $log.info('la réponses du service :', reponses);
      }


      // var nouvelleentree = scope.newTodo;
      scope.addTodo = function () {
        /* scope.todos.push({
          title: scope.newTodo,
          completed: false
        });*/
        $log.info('todo', scope.todos);
        ApiService.setDataParam(scope.newTodo, 'cgau', 'todo')
          .then(setResponse);
        scope.newTodo = '';
      };

      scope.removeTodo = function (todo) {
        deleteLigne(todo);
        //$log.info('toto:', todo);
        scope.todos.splice(scope.todos.indexOf(todo), 1);
      };
      scope.markAll = function () {
        if (scope.completed === false) {
          scope.completed = true;
        } else {
          scope.completed = false;
        }
        scope.todos.forEach(function (todo) {
          todo.completed = scope.completed;
        });
      };
      scope.clearCompleted = function () {
        scope.todos = todos.filter(function (todo) {
          return todo.completed;
        });
        scope.todos.forEach(function (todo) {
          scope.removeTodo(todo);
        });
        scope.todos = todos.filter(function (todo) {
          return !todo.completed;
        });
        $log.info(scope.todos);
        /* $scope.todos.reverse().forEach(function (todo) {
          $log.success("avant",todo);
          if (todo.completed === true) {
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
          }
          $log("apres", todo);
        }); */
      };


    }
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: './directives/todo/todo.html',
      link: link
    };
  }
})();
