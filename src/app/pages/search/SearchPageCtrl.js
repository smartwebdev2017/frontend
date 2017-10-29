/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);
    /** @ngInject */
    /*
    function SearchPageCtrl($http, $window, $scope, $state, $filter, $rootScope, editableOptions, editableThemes, $timeout, searchTerms) {
        console.log($scope);
        var promise = '';

        $scope.keyword = searchTerms.value['keyword'];

        $scope.search_car = function(){
            if(promise){
                $timeout.cancel(promise);
            }
            promise = $timeout(function(){
                //$rootScope.keyword = $scope.keyword;
                searchTerms.set('keyword', $scope.keyword);
                $http({
                    method: 'GET',
                    url: '/api/cars' + '?model=' + searchTerms.value['model'] + '&title=' + searchTerms.value['title'] + '&city=' + searchTerms.value['city'] +
                    '&state=' + searchTerms.value['state'] + '&price=' + searchTerms.value['price'] + '&mileage=' + searchTerms.value['mileage'] + '&year=' + searchTerms.value['year'] +
                    '&description=' + searchTerms.value['description'] + '&longhood=' + searchTerms.value['longhood'] + '&widebody=' + searchTerms.value['widebody'] + '&pts=' + searchTerms.value['pts'] +
                    '&pccb=' + searchTerms.value['pccb'] + '&lwb=' + searchTerms.value['lwb'] + '&aircooled=' + searchTerms.value['aircooled'] + '&auto_trans=' + searchTerms.value['auto_trans'] + '&model_number=' + searchTerms.value['model_number'] +
                    '&keyword=' + searchTerms.value['keyword'],
                    headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
                })
                    .success(function(response){
                        console.log('Search Done!');
                        $rootScope.$carData =  response.results;
                        $rootScope.$carData1 =  response.results;
                        $rootScope.$next = response.next;
                        $rootScope.$prev = response.previous;
                    })
                    .error(function(response){
                        console.log('Search Error!');
                    })

            }, 300);
        };
    }*/
    function SearchPageCtrl($scope, $window, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, Cities, States, Vins, SearchOptions){
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;

        var off=[];

        $scope.load = loadOffers;

        off.push($scope.$watchGroup([
            'filter.keyword'
        ], doSearch));

        function loadOffers(){
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);
            //filter.page = $scope.page;

            Offer.query(filter, {}, function (offers) {
                $rootScope.isLoading = false;

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
                .success(function(response){
                    $rootScope.$carData =  response.results;
                    $rootScope.$carData1 =  response.results;
                    $rootScope.$next = response.next;
                    $rootScope.$prev = response.previous;
                })
                .error(function(response){

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
