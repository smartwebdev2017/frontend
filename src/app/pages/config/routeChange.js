/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict';

    angular.module('pcarfinder'.pages.config)
        .run(stateChangeStart);

    /** @ngInject */
    function stateChangeStart($rootScope, $state, localStorage) {
        $rootScope.$on($stateChangeStart, function(event, toState, toParams, fromState, fromParams){
           var login = localStorage.getObject('dataUser');
           if (toState.authenticate && _.isEmpty(login)){
               $state.transitionTo("authSignin");
               event.preventDefault();
           }
        });
    }

});