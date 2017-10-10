/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($http, $window, $scope, $state, $filter, $rootScope, editableOptions, editableThemes, baSidebarService) {

        $scope.smartTablePageSize = 10;
        $scope.title = '';
        $scope.model = '';
        $scope.year_value=2017;
        $scope.mileage_value=0;
        $scope.price_value=10000000;
        $scope.city_selected = "";
        $scope.state_selected = "";
        $scope.description = '';
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


        $scope.filter_car = function(model,title, city, state, price, mileage, year, description){
            $rootScope.title = title;
            $rootScope.model = model;
            $rootScope.city = city;
            $rootScope.state = state;
            $rootScope.price = price;
            $rootScope.mileage = mileage;
            $rootScope.year = year;
            $rootScope.description = description;
            if (city == null) {
                city = '';
            }

            if (state == null) {
                state = '';
            }
            $http({
                method: 'GET',
                url: '/api/cars' + '?model=' + model + '&title=' + title + '&city=' + city + '&state=' + state + '&price=' + price + '&mileage=' + mileage + '&year=' + year + '&description=' + description + '&keyword=' + $rootScope.keyword,
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

                    $scope.city = [];
                    for ( var index = 0; index<response.length; index++){
                        var temp= {};
                        temp['name'] = response[index]['city_name'];
                        $scope.city.push(temp);
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

                    $scope.state = [];
                    for ( var index = 0; index<response.length; index++){
                        var temp= {};
                        temp['name'] = response[index]['state_name'];
                        $scope.state.push(temp);
                    }

                })
                .error(function(response){
                    //$scope.carData =  [];
                })
        };

        $scope.getAllCities();
        $scope.getAllStates();
        $scope.getAllCars();


  }
})();