/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, ActiveOfferDetail, Cities, States, Vins, SearchOptions){
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;

        var off=[];

        $scope.load = loadOffers;

        off.push($scope.$watchGroup([
            'filter.model',
            'filter.title',
            'filter.city',
            'filter.state',
            'filter.price_from',
            'filter.price_to',
            'filter.mileage_from',
            'filter.mileage_to',
            'filter.year_from',
            'filter.year_to',
            'filter.description',
            'filter.longhood',
            'filter.widebody',
            'filter.pts',
            'filter.pccb',
            'filter.lwb',
            'filter.aircooled',
            'filter.auto_trans',
            'filter.model_number',
            'filter.transmission',
            'filter.keyword'
        ], doSearch));
        $scope.auto_trans = [
            {label: 'Sportomatic', value: 'Sportomatic'},
            {label: 'Tiptronic', value: 'tiptronic'},
            {label: 'PDK', value: 'pdk'}
        ];
        function loadCities() {

            Cities.query({}, function(cities){
                $scope.cities = [];
                for ( var index = 0; index<cities.length; index++){
                    var temp= {};
                    temp['label'] = cities[index]['city_name'];
                    temp['value'] = cities[index]['city_name'];
                    $scope.cities.push(temp);
                }
            }, function(err){
                $rootScope.handleErrors($scope, err);
            });
        }

        function loadStates() {
            States.query({}, function(states){
                $scope.states = [];
                for ( var index = 0; index<states.length; index++){
                    var temp= {};
                    temp['label'] = states[index]['state_name'];
                    temp['value'] = states[index]['state_name'];
                    $scope.states.push(temp);
                }
            }, function(err){
                $rootScope.handleErrors($scope, err);
            });
        }

        function loadModelNumbers() {
            Vins.query({}, function(vins){
                $scope.model_numbers = [];
                for ( var index = 0; index<vins.length; index++){
                    var temp= {};
                    temp['label'] = vins[index]['model_number'];
                    temp['value'] = vins[index]['model_number'];
                    $scope.model_numbers.push(temp);
                }
            }, function(err){
                $rootScope.handleErrors($scope, err);
            });
        }

        function loadOffers(){
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);
            //filter.page = $scope.page;
            if ( typeof(filter.city) === 'object' ) filter.city = filter.city.value;
            if ( typeof(filter.state) === 'object' ) filter.state = filter.state.value;
            if ( typeof(filter.auto_trans) === 'object' ) filter.auto_trans = filter.auto_trans.value;

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
        $scope.getActiveListingByIndex = function(index){
          $rootScope.$detailData = $rootScope.$active[index];
        };
        $scope.getInactiveListingByIndex = function(index){
          $rootScope.$detailData = $rootScope.$inactive[index];
        };
        loadCities();
        loadStates();
        loadModelNumbers();
        loadOffers();
  }
})();