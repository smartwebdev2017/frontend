/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    /** @ngInject */
    function SearchPageCtrl($http, $window, $scope, $state, $filter, $rootScope, editableOptions, editableThemes) {
        console.log($scope);

        $scope.search_car = function(){
            $rootScope.keyword = $scope.keyword;
            $http({
                method: 'GET',
                url: '/api/cars' + '?model=' + $rootScope.model + '&title=' + $rootScope.title + '&city=' + $rootScope.city + '&state=' + $rootScope.state + '&price=' + $rootScope.price + '&mileage=' + $rootScope.mileage + '&year=' + $rootScope.year + '&description=' + $rootScope.description + '&keyword=' + $rootScope.keyword,
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
        /*$scope.smartTablePageSize = 10;
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
            //$state.go('main.basic');
        }
        $scope.getAllCars = function(){
            $http({
                method: 'GET',
                url: '/api/cars',
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Load data from server successfully');
                    $scope.carData =  response;
                    $scope.carData1 =  response;
                })
                .error(function(response){
                    $scope.carData =  [];
                })
        };

        $scope.filter_car = function(model,title, city, state, price, mileage, year, description){
            if (city == null) {
                city = '';
            }

            if (state == null) {
                state = '';
            }
            $http({
                method: 'GET',
                url: '/api/cars' + '?model=' + model + '&title=' + title + '&city=' + city + '&state=' + state + '&price=' + price + '&mileage=' + mileage + '&year=' + year + '&description=' + description,
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(response){
                    console.log('Search Done!');
                    $scope.carData =  response;
                    $scope.carData1 =  response;
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
        $scope.getAllCars();*/

    }
})();
