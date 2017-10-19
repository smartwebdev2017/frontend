/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($http, $window, $scope, $state, $filter, $rootScope, editableOptions, editableThemes, baSidebarService, searchTerms) {

        $scope.smartTablePageSize = 10;
        $scope.title = '';
        $scope.model = '';
        $scope.year_value=2017;
        $scope.mileage_value=0;
        $scope.price_value=10000000;


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
                    $rootScope.$carData =  response;
                    $rootScope.$carData1 =  response;
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
                    $rootScope.$carData =  response;
                    $rootScope.$carData1 =  response;
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

        $scope.getAllCities();
        $scope.getAllStates();
        $scope.getAllModelNumber();
        $scope.getAllCars();


  }
})();