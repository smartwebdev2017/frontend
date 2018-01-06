(function () {
    'use strict';

    angular.module('pcarfinder.theme.components')
        .controller('ContactPageCtrl', ContactPageCtrl);

    function ContactPageCtrl($scope, $window, $location, $timeout, $http, $state, $stateParams, Email, $uibModal){
        $scope.bShowContact = false;
        $scope.content = '';

        $scope.openFeedbackDlg = function () {
          var page = 'app/theme/components/contact/Modal.html';
          var $uibModalInstance = $uibModal.open({
            animation: true,
            templateUrl: page,
            controller: ['$uibModalInstance', '$scope', '$window', function($uibModalInstance, $scope, $window){
                this.ok = function(){
                    var data = {};
                    data['content'] = $scope.content;

                    Email.save({}, data, function (res) {
                        console.log(res);
                        $uibModalInstance.close();
                    }, function(err){
                        console.log(err);
                    });
                };
            }],
            controllerAs:'ctrl'
          });

        };
    }
})();
