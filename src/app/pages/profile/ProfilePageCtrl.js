(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
      .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($http, $window, $scope, fileReader, $rootScope, $filter, $uibModal, $stateParams, OfferDetail, SearchOptions) {
    $scope.carData = {};
    $scope.offer = {};
    $scope.filter = SearchOptions.filter;
    $scope.numLimit = 150;

    $scope.readMore = function(){
      $scope.numLimit = 100000;
    };
    $scope.readLess = function(){
      $scope.numLimit = 150;
    };
    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
            item.href = link;
          });
    };

    $scope.getCarDetail = function(vin) {
        $rootScope.isLoading = true;

        var filter = angular.copy($scope.filter);
        //filter.page = $scope.page;

        OfferDetail.get({id:vin}, function (offers) {
            $rootScope.isLoading = false;

            $scope.carData = offers[0]
        }, function(err){
            $rootScope.isLoading = false;
            $rootScope.handleErrors($scope,err);
        });
    };

    $scope.getCarDetail($stateParams.vin);
  }

})();
