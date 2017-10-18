(function() {
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .service('searchTerms', searchTerms);

    /** @ngInject */
    function searchTerms($window) {
        var terms = {
            keyword: ''
        };

        function set(field,value){
            terms[field] = value;
        }

        function get(field){
            return terms[field];
        }

        return {
            set: set,
            value: terms
        };
    }

})();