(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('ContactPageCtrl', ContactPageCtrl);

    function ContactPageCtrl($scope, $window, $location, $timeout, $http, $state, $stateParams, Email){
        $scope.bShowContact = false;
        $scope.email = '';
        $scope.subject = '';
        $scope.content = '';

        $scope.showContact = function(){
            $scope.bShowContact = !$scope.bShowContact;
        };

        $scope.sendEmail = function(){
            var data = {};
            data['email'] = $scope.email;
            data['subject'] = $scope.subject;
            data['content'] = $scope.content;

            Email.save({}, data, function (res) {
                console.log(res);
            }, function(err){
                console.log(err);
            });
        };
    }
})();
