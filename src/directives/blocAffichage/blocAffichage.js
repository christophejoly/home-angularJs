(function () {
  'use strict';
  angular
    .module('app')
    .directive('blocAffichage', blocAffichage);

  function blocAffichage($log, ApiService, $http) {
    function link(scope) {

      console.log("scope", scope);

      $http.jsonp('https://api.rss2json.com/v1/api.json?rss_url=http://news.ycombinator.com/rss')
        .success(function (data, status, headers, config) {
          console.log('yahoo : ', data, status, headers, config);
          scope.feed = {
            title: 'DailyJS',
            items: data.query.results.entry
          };
        })
        .error(function (data, status, headers, config) {
          console.error('Error fetching feed:', data);
        });
    };
    return {
      restrict: 'EA',
      scope: {
        url: '='
      },
      templateUrl: './directives/blocAffichage/blocAffichage.html',
      link: link
    }; 
  };
})();

