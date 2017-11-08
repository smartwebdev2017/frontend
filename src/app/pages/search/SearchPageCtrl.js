/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    function SearchPageCtrl($scope, $window, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, Cities, States, Vins, SearchOptions,$uibModal, baProgressModal){
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;

        var off=[];

        $scope.load = loadOffers;
        $scope.colums = {
          title: true,
          mileage: true,
          price: true,
          location: true,
          vin: true,
          make: false,
          model: false,
          trim: false,
          date: false,
          condition: false,
        };
        off.push($scope.$watchGroup([
            'filter.keyword'
        ], doSearch));

        function loadOffers(){
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);
            //filter.page = $scope.page;

            Offer.query(filter, {}, function (offers) {
                $rootScope.isLoading = false;

                $rootScope.$next_list = {};
                for ( var i = 0;  i< offers.results.length - 1; i++){
                    $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;
                }

                $rootScope.$carData = offers.results;
                $rootScope.$carData1 = offers.results;
                $rootScope.$next = offers.next;
                $rootScope.$prev = offers.previous;
            }, function(err){
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope,err);
            });
        }
        function getFilterDate(){

        }
        function doSearch(){
            getFilterDate();
            if (!$rootScope.isLoading) {
                $scope.page = 0;
                $scope.offers = [];

                loadOffers()
            }
        }
        $scope.open = function (page, size) {
          $uibModal.open({
            animation: true,
            templateUrl: page,
            scope: $scope
          });
        };

        $rootScope.extractURL = function(url){
            var a = document.createElement('a');
            a.href = url;
            return a.pathname + a.search;
        };
        $rootScope.nextPage = function(){
            var newURL = $rootScope.extractURL($rootScope.$next);

            $http({
                method: 'GET',
                url: newURL,
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(offers){
                    $rootScope.isLoading = false;

                    $rootScope.$next_list = {};
                    for ( var i = 0;  i< offers.results.length - 1; i++){
                        $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;
                    }

                    $rootScope.$carData =  offers.results;
                    $rootScope.$carData1 =  offers.results;
                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    console.log($rootScope.$next_list);
                })
                .error(function(offers){

                })
        };

        $rootScope.prevPage = function(){
            var newURL = $rootScope.extractURL($rootScope.$prev);

            $http({
                method: 'GET',
                url: newURL,
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    $rootScope.$carData =  response.results;
                    $rootScope.$carData1 =  response.results;
                    $rootScope.$next = response.next;
                    $rootScope.$prev = response.previous;
                })
                .error(function(response){

                })
        };
    }
})();
