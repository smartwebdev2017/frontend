/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict';

    angular.module('pcarfinder.pages.authSignIn', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider){
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/authSignIn/authSignIn.html',
                title: 'Sign in',
                controller: 'authSignInCtrl',
                authenticate: false
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'app/pages/authSignIn/authSignIn.html',
                title: 'Sign in',
                controller: function($http, $window){
                    $window.sessionStorage.clear();
                }
            });
    }
})();
