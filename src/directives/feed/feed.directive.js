(function () {
  'use strict';

  angular
        .module('app')
        .directive('feed', feed);

    function feed(ApiService) {
        function link(scope, element) {
            scope.feedsActive = false;
            scope.feedActive = [];
            ApiService.getFeed(scope.url, scope.nb).then(function (response) {
                scope.feeds = response;
            });
        }
        return {
            restrict: 'EA',
            link: link,
            templateUrl: './directives/feed/feed.html',
            scope: {
                url: '=',
                nb: '='
            }
        };
    }
})();
