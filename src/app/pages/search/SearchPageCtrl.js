/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    /** @ngInject */
    function SearchPageCtrl($http, $window, $scope, $filter, editableOptions, editableThemes) {
        $scope.smartTablePageSize = 10;
        $scope.title = '';
        $scope.model = '';
        $scope.year_value='';
        $scope.mileage_value='';
        $scope.price_value='';
        $scope.city = '';
        $scope.state = '';
        $scope.description = '';
        $scope.groupedByCitisItems = [];
        $scope.groupedByStatesItems = [];

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
        $scope.getAllCars();

    }
})();
