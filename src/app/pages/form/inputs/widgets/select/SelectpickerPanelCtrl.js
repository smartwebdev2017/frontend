(function () {
  'use strict';

  angular.module('pcarfinder.pages.form')
    .controller('SelectpickerPanelCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($http, $window, $scope) {

    var vm = this;
    vm.disabled = undefined;


    vm.getAllCities = function(){
      $http({
        method: 'GET',
        url: '/api/cities',
        headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
      })
      .success(function(response){
        console.log('Load cities data from server successfully');

        vm.groupedByCitisItems = [];
        for ( var index = 0; index<response.length; index++){
          var temp= {};
          temp['name'] = response[index]['city_name'];
          vm.groupedByCitisItems.push(temp);
        }

      })
      .error(function(response){
            $scope.carData =  [];
      })
    };

    vm.getAllStates = function(){
      $http({
        method: 'GET',
        url: '/api/states',
        headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
      })
      .success(function(response){
        console.log('Load states data from server successfully');

        vm.groupedByStatesItems = [];
        for ( var index = 0; index<response.length; index++){
          var temp= {};
          temp['name'] = response[index]['state_name'];
          vm.groupedByStatesItems.push(temp);
        }

      })
      .error(function(response){
            $scope.carData =  [];
      })
    };

    vm.getAllCities();
    vm.getAllStates();
  }
})();


