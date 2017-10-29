(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
      .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($http, $window, $scope, fileReader, $rootScope, $filter, $uibModal, $stateParams, OfferDetail, SearchOptions) {
    $scope.carData = {};
    $scope.offer = {};
    $scope.filter = SearchOptions.filter;

    $scope.picture = $filter('profilePicture')('Nasta');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
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

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
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
    console.log($stateParams);
    $scope.getCarDetail($stateParams.vin);
    $scope.switches = [true, true, false, true, true, false];
  }

})();
