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
        $scope.main_width = 40;
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;

        var off=[];

        $scope.load = loadOffers;
        $scope.bShowMenu = false;
        $('.al-main').css('padding-left', '0px');

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
                var data = [];
                $rootScope.$next_list = {};

                for ( var i = 0;  i< offers.results.length; i++){
                    var record = {};
                    if ( i< offers.results.length - 1 )
                        $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;

                    data.push({
                        'ID': offers.results[i].id,
                        'listing_title': offers.results[i].listing_title,
                        'mileage': offers.results[i].mileage.toLocaleString(),
                        'price': '$'+ (offers.results[i].price.toLocaleString()),
                        'city': offers.results[i].city,
                        'state': offers.results[i].state,
                        'vin_code': offers.results[i].vin_code,
                        'listing_make': offers.results[i].listing_make,
                        'listing_model': offers.results[i].listing_model,
                        'listing_trim': offers.results[i].listing_trim,
                        'listing_date': offers.results[i].listing_date.slice(0,10),
                        'pcf__vid': offers.results[i].pcf.vid,
                        'cond': offers.results[i].cond,
                        'listing_year': offers.results[i].listing_year,
                        'listing_exterior_color': offers.results[i].listing_exterior_color,
                        'listing_interior_color': offers.results[i].listing_interior_color,
                        'listing_transmission': offers.results[i].listing_transmission,
                        'listing_engine_size': offers.results[i].listing_engine_size,
                        'listing_drivetrain': offers.results[i].listing_drivetrain,
                        'vin__msrp': offers.results[i].vin != null && offers.results[i].vin.msrp != null?'$' + (offers.results[i].vin.msrp.toLocaleString()):'',
                        'vin__model_year': offers.results[i].vin != null?offers.results[i].vin.model_year:'',
                        'vin__model_detail': offers.results[i].vin != null?offers.results[i].vin.model_detail:'',
                        'vin__color': offers.results[i].vin != null?offers.results[i].vin.color:'',
                        'vin__interior': offers.results[i].vin != null?offers.results[i].vin.interior:'',
                        'vin__production_month': offers.results[i].vin != null?offers.results[i].vin.production_month:'',
                        'vin__warranty_start':offers.results[i].vin != null?offers.results[i].vin.warranty_start:'',
                        'pcf__model_number': offers.results[i].pcf.model_number,
                        'pcf__gap_to_msrp': offers.results[i].pcf.gap_to_msrp !=0?offers.results[i].pcf.gap_to_msrp + '%':'',
                        'pcf__pts': offers.results[i].pcf.pts == 0?'No':'Yes',
                        'pcf__lwb_seats': offers.results[i].pcf.lwb_seats == 0?'No':'Yes',
                        'pcf__longhood': offers.results[i].pcf.longhood == 0?'No':'Yes',
                        'pcf__widebody': offers.results[i].pcf.widebody == 0?'No':'Yes',
                        'pcf__pccb': offers.results[i].pcf.pccb == 0?'No':'Yes',
                        'pcf__air_cooled': offers.results[i].pcf.air_cooled == 0?'No':'Yes',
                        'pcf__listing_age': offers.results[i].pcf.listing_age + ' days',
                        'pcf__body_type': offers.results[i].pcf.body_type,
                        'pcf__auto_trans': offers.results[i].pcf.auto_trans
                    });
                }

                //$rootScope.$carData = offers.results;
                //$rootScope.$carData1 = offers.results;
                $rootScope.$next = offers.next;
                $rootScope.$prev = offers.previous;

                $rootScope.$dataSource = data;
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
        $scope.setCollaspe = function(){
            $scope.bShowMenu = !$scope.bShowMenu;
            if ($scope.bShowMenu) {
                $('.al-main').css('padding-left', '300px');
            } else {
                $('.al-main').css('padding-left', '0px');
            }
        };
        loadCities();
        loadStates();
        loadModelNumbers();
        loadOffers();
  }
})();