/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict';

    angular.module('pcarfinder.pages.normal', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('normal', {
                abstract:true,
                url: '/',
                templateUrl: 'app/pages/normal/normal.html',
                redirectTo: 'normal.search',
                authenticate: true
            })
    }
})();