(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
      .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($http, $window, $scope, fileReader, $rootScope, $filter, $uibModal, $stateParams, OfferDetail, ActiveOfferDetail, InactiveOfferDetail, SearchOptions) {
    $scope.carData = {};
    $scope.offer = {};
    $scope.filter = SearchOptions.filter;
    $scope.numLimit = 150;
    $scope.bShowMenu = false;
    $scope.bShowActive = true;
    $scope.bShowInactive = true;
    $scope.keywords = $scope.filter.keyword.split(" ");

    $('.al-main').css('padding-left', '0px');

    $scope.readMore = function(){
      $scope.numLimit = 100000;
      $('.panel-body-description').css('height', '');
    };
    $scope.readLess = function(){
      $scope.numLimit = 150;
      $('.panel-body-description').css('height', '212px');
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
    function addCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    $scope.getCarDetail = function(vin) {
        $rootScope.isLoading = true;

        var filter = angular.copy($scope.filter);
        //filter.page = $scope.page;

        OfferDetail.get({id:vin}, function (offers) {
            $rootScope.isLoading = false;

            $rootScope.$detailData = offers[0];
            $rootScope.$detailData.price = addCommas($rootScope.$detailData.price);
            $rootScope.$detailData.mileage = addCommas($rootScope.$detailData.mileage);
            $('.panel-body-description').css('height', '212px');
        }, function(err){
            $rootScope.isLoading = false;
            $rootScope.handleErrors($scope,err);
        });
    };
    function getActiveListings(vin) {
        $rootScope.isLoading = true;

        var filter = angular.copy($scope.filter);
        //filter.page = $scope.page;

        ActiveOfferDetail.get({id:vin}, function (offers) {
            $rootScope.isLoading = false;

            $rootScope.$active = offers;
        }, function(err){
            $rootScope.isLoading = false;
            $rootScope.handleErrors($scope,err);
        });
    }
    function getInactiveListings(vin) {
        $rootScope.isLoading = true;

        var filter = angular.copy($scope.filter);
        //filter.page = $scope.page;

        InactiveOfferDetail.get({id:vin}, function (offers) {
            $rootScope.isLoading = false;

            $rootScope.$inactive = offers;
        }, function(err){
            $rootScope.isLoading = false;
            $rootScope.handleErrors($scope,err);
        });
    }
    $scope.setCollaspe = function(){
        $scope.bShowMenu = !$scope.bShowMenu;
        if ($scope.bShowMenu) {
            $('.al-main').css('padding-left', '150px');
        } else {
            $('.al-main').css('padding-left', '0px');
        }
    };
    $scope.setActiveCollapse = function(){
        $scope.bShowActive = !$scope.bShowActive;
    };
    $scope.setInactiveCollapse = function(){
        $scope.bShowInactive = !$scope.bShowInactive;
    };

    $scope.getCarDetail($stateParams.vin);
    getActiveListings($stateParams.vin);
    getInactiveListings($stateParams.vin);
    $scope.setCollaspe();
  }

  angular.module('BlurAdmin.pages.profile')
    .filter('highlightWord', function() {
        return function(text, selectedWords) {
          if(selectedWords.length>0) {

            for (var i = 0; i < selectedWords.length; i++){
              if (selectedWords[i] == "" ) continue;
              var regStr = '(?!(?:[^<]+>|[^>]+<\/.*?>))(' + selectedWords[i] + ')';
              var pattern = new RegExp(regStr, "gi");
              text = '' + text;
              var matches = text.match(pattern);
              text = text.replace(pattern, '<span class="ui-select-highlight">' + selectedWords[i] + '</span>');
            }

            return text;
          }
          else {
            return text;
          }
        };
    });
})();

