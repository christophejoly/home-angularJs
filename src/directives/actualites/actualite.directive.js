(function () {
  'use strict';
  angular
    .module('app')
    .directive('filActus', filActus);

  function filActus($log, ApiService) {
    function link(scope) {
      // var truc =this
      // truc.addfilactu = addfilactu;
      // function addfilactu() {
      //   return;
      // }

      var filactus = scope.filactus = [];
      scope.completed = false;
      ApiService.getAllDataParam()
        .then(getResponse);

      function deleteLigne(filactu) {
        ApiService.deleteDataParam(filactu.id);
      }


      function setResponse(reponses) {
        // $log.info('la réponses du service :', reponses);
        ApiService.getAllDataParam()
          .then(getResponse);
      }

      function getResponse(reponses) {
        //algo de traitement
        filactus = scope.filactus = [];
        reponses.forEach(function (reponse) {
          $log.info('utilisateur', reponse.user);
          if (reponse.user.indexOf('cgau-filactu') != -1) {
            scope.filactus.push({
              title: reponse.data,
              completed: false,
              id: reponse.id
            });
          }
        });
        // $log.info('la réponses du service :', reponses);
      }


      // var nouvelleentree = scope.newfilactu;
      scope.addfilactu = function () {
        /* scope.filactus.push({
          title: scope.newfilactu,
          completed: false
        });*/
        $log.info('filactu', scope.filactus);
        ApiService.setDataParam(scope.newfilactu, 'cgau', 'filactu')
          .then(setResponse);
        scope.newfilactu = '';
      };

      scope.removefilactu = function (filactu) {
        deleteLigne(filactu);
        //$log.info('toto:', filactu);
        scope.filactus.splice(scope.filactus.indexOf(filactu), 1);
      };
      scope.markAll = function () {
        if (scope.completed === false) {
          scope.completed = true;
        } else {
          scope.completed = false;
        }
        scope.filactus.forEach(function (filactu) {
          filactu.completed = scope.completed;
        });
      };
      scope.clearCompleted = function () {
        scope.filactus = filactus.filter(function (filactu) {
          return filactu.completed;
        });
        scope.filactus.forEach(function (filactu) {
          scope.removefilactu(filactu);
        });
        scope.filactus = filactus.filter(function (filactu) {
          return !filactu.completed;
        });
        $log.info(scope.filactus);
        /* $scope.filactus.reverse().forEach(function (filactu) {
          $log.success("avant",filactu);
          if (filactu.completed === true) {
            $scope.filactus.splice($scope.filactus.indexOf(filactu), 1);
          }
          $log("apres", filactu);
        }); */
      };


    }
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: './directives/actualites/actualite.html',
      link: link
    };
  }
})();

