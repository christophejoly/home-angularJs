(function () {
    'use strict';

    angular
        .module("app")
        .filter("dateFormat", dateFormat);

    /** @ngInject */
    function dateFormat() {
        return function (stringDate) {
            return moment(stringDate).format('DD/MM/YYYY hh:mm');
        }
    }

})();