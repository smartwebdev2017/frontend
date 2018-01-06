/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict';

    angular.module('pcarfinder.pages.main', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/pages/main/main.html',
                redirectTo: 'main.basic',
                authenticate: true
            })
    }
})();