(function () {
    'use strict';

    angular
        .module('app')
        .factory('ApiService', ApiService);

    function ApiService($http, $log) { 
        return {
            // Les services param
            getAllDataParam : getAllDataParam,
            setDataParam: setDataParam,
            deleteDataParam: deleteDataParam,
            getFeed: getFeed
        }
        // Fonctions param
        function deleteDataParam(id) {
            // http://api.jolychristophe.com/index.php?service=delete&table=param&bdd=accueil&id=4
            var url = 'http://api.jolychristophe.com/index.php';
            var service = 'delete';
            var params = { service: service, table: 'param', bdd: 'accueil' , id: id };
            return $http.get(url, { params: params })
                .then(getAllDataCompleted)
                .catch(getErreur);
        }
        function setDataParam(data,user,app) {
            // http://api.jolychristophe.com/index.php?service=insert_param&table=param&bdd=accueil&data=test&user=cjo 
            var url = 'http://api.jolychristophe.com/index.php';
            var params = { service: 'insert_param', table: 'param', bdd: 'accueil', data: data , user:user+'-'+app };
            return $http.get(url, { params: params })
                .then(getAllDataCompleted)
                .catch(getErreur);
        }
        function getAllDataParam() {
         //   http://api.jolychristophe.com/index.php?service=selectall&table=param&bdd=accueil
            var url = 'http://api.jolychristophe.com/index.php';
            var service = 'selectall';
            var params = { service: service , table: 'param' , bdd: 'accueil'};
            return $http.get(url, {params: params})
                                .then(getAllDataCompleted)
                                .catch(getErreur);
        }

        function getFeed(rssUrl, nbFeed) {
            var url = 'https://api.rss2json.com/v1/api.json';
            return $http.get(url, {params:{
                rss_url: rssUrl,
                api_key: 'xwkpawaunuh8oopvdb8gv9enigi07inoukbtzuio', // put your api key here
                count: nbFeed}
            })
                .then(getAllDataCompleted)
                .catch(getErreur);
        }

        // Fonctions communes
        function getAllDataCompleted(reponse) {
            return reponse.data;
        }
        function getErreur(erreur) {
            // $log.info('Haireur', erreur);
        }

    }
})();