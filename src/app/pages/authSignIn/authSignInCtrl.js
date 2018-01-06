/**
 * Created by root on 9/20/17.
 */
(function() {
    'use strict'

    angular.module('pcarfinder.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, $state, $http, toastr, $rootScope, $window) {

        $rootScope.data = [];

        if ( $window.sessionStorage.user_token) {
            $rootScope.$pageFinishedLoading = true;
            $state.go('main.basic');
        }

        var vm = this;

        vm.login = login;

        function login(){
            var authUser = {
                user: vm.user,
                password: vm.passWord
            };

            $http({
                method: 'POST',
                url: '/api/api-token-auth/',
                data: $.param({
                    username: authUser.user,
                    password: authUser.password
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function(data){
                    console.log('Authentication is success.');
                    $rootScope.$pageFinishedLoading = true;
                    $window.sessionStorage.user_token = data['token'];
                    $state.go('main.basic');
                    toastr.success('Login Successfully!', 'Hello!' + authUser.user, {});
                })
                .error(function(data){
                    $rootScope.$pageFinishedLoading = true;

                    toastr.error(data.non_field_errors[0], 'Login Error', {});
                });
        }
        function logout(){
            if ( $window.sessionStorage.user_token) {
                $window.sessionStorage.clear();
            }
        }
    }
})();