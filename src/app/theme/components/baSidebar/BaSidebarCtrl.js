/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, Cities, States, Vins, SearchOptions){
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

                for ( var i = 0;  i< offers.results.length - 1; i++){
                    offers.results[i].next = offers.results[i+1].pcf.vid;
                    console.log(offers.results[i+1].pcf.vid);
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

        loadCities();
        loadStates();
        loadModelNumbers();
        loadOffers();
        /*$scope.filter
        $scope.smartTablePageSize = 10;
        $scope.title = '';
        $scope.model = '';
        $scope.year_value=2019;
        $scope.mileage_value=0;
        $scope.price_value=10000000;

        $scope.year_from = 1955;
        $scope.year_to = 2019;
        $scope.description = '';

        $scope.vm = {};
        $scope.vm.disabled = undefined;
        $scope.vm.transmission = {};
        $scope.vm.transmissions = [
            {label: 'Sportomatic', value: 'Sportomatic'},
            {label: 'Tiptronic', value: 'tiptronic'},
            {label: 'PDK', value: 'pdk'}
        ];

        if ( $window.sessionStorage.user_token) {
            $rootScope.$pageFinishedLoading = true;
            $rootScope.$isLogged = true;
        }

        $scope.getAllCars = function(){
            $http({
                method: 'GET',
                url: '/api/cars',
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Load data from server successfully');
                    $rootScope.$carData =  response.results;
                    $rootScope.$carData1 =  response.results;
                    $rootScope.$next = response.next;
                    $rootScope.$prev = response.previous;
                })
                .error(function(response){
                    $scope.carData =  [];
                })
        };

        $scope.filter_car = function(){
            var auto_trans = '';
            var city = '';
            var state = '';
            var model_number = '';

            if (this.$select != undefined){
                if ( this.$select.placeholder == 'Select State'){
                    state = this.$select.selected.value;
                    searchTerms.set('state', state);
                }else if ( this.$select.placeholder == 'Select City'){
                    city = this.$select.selected.value;
                    searchTerms.set('city', city);
                }else if ( this.$select.placeholder == 'Select Transmission'){
                    auto_trans = this.$select.selected.value;
                    searchTerms.set('auto_trans', auto_trans);
                }else if ( this.$select.placeholder == 'Select VIN Model Number'){
                    model_number = this.$select.selected.value;
                    searchTerms.set('model_number', model_number);
                }

            }
            searchTerms.set('title', this.title);
            searchTerms.set('model', this.model);


            searchTerms.set('price', this.price_value);
            searchTerms.set('mileage', this.mileage_value);
            searchTerms.set('year', this.year_value);
            searchTerms.set('description', this.description);
            searchTerms.set('longhood', this.longhood);
            searchTerms.set('widebody', this.widebody);
            searchTerms.set('pts', this.pts);
            searchTerms.set('pccb', this.pccb);
            searchTerms.set('lwb', this.lwb);
            searchTerms.set('aircooled', this.aircooled);


            $http({
                method: 'GET',
                url: '/api/cars' + '?model=' + this.model + '&title=' + this.title + '&city=' + searchTerms.value['city'] + '&state=' + searchTerms.value['state'] + '&price=' + this.price_value +
                '&mileage=' + this.mileage_value + '&year=' + this.year_value + '&description=' + this.description + '&longhood=' + this.longhood + '&widebody=' + this.widebody +
                '&pts=' + this.pts + '&pccb=' + this.pccb + '&lwb=' + this.lwb + '&aircooled=' + this.aircooled + '&auto_trans=' + auto_trans + '&model_number=' + searchTerms.value['model_number'] +
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
        };
        $scope.onChangedYear = function(data){
            console.log(data.value);
        };
        $scope.getAllCities = function(){
            $http({
                method: 'GET',
                url: '/api/cities',
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Load cities data from server successfully');

                    $scope.cities = [];
                    for ( var index = 0; index<response.length; index++){
                        var temp= {};
                        temp['label'] = response[index]['city_name'];
                        temp['value'] = response[index]['city_name'];
                        $scope.cities.push(temp);
                    }

                })
                .error(function(response){
                    //$scope.carData =  [];
                })
        };
        $scope.getAllModelNumber = function(){
            $http({
                method: 'GET',
                url: '/api/codes',
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Load VIN model numbers from server successfully');

                    $scope.model_numbers = [];
                    for ( var index = 0; index<response.length; index++){
                        var temp= {};
                        temp['label'] = response[index]['model_number'];
                        temp['value'] = response[index]['model_number'];
                        $scope.model_numbers.push(temp);
                    }

                })
                .error(function(response){
                    //$scope.carData =  [];
                })
        };
        $scope.getAllStates = function(){
            $http({
                method: 'GET',
                url: '/api/states',
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Load states data from server successfully');

                    $scope.states = [];
                    for ( var index = 0; index<response.length; index++){
                        var temp= {};
                        temp['label'] = response[index]['state_name'];
                        temp['value'] = response[index]['state_name'];
                        $scope.states.push(temp);
                    }

                })
                .error(function(response){
                    //$scope.carData =  [];
                })
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

        $scope.getAllCities();
        $scope.getAllStates();
        $scope.getAllModelNumber();
        $scope.getAllCars();*/


  }
})();