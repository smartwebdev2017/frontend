/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.normal', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('normal', {
                url: '/normal',
                templateUrl: 'app/pages/normal/normal.html',
                redirectTo: 'normal.search',
                authenticate: true
            })
    }
})();