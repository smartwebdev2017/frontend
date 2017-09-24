/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
    .controller('SelectpickerPanelCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($http, $window, $scope) {

    var vm = this;
    vm.disabled = undefined;


    vm.standardItem = {};
    vm.standardSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4}
    ];

    vm.withSearchItem = {};

    vm.selectWithSearchItems = [
      {label: 'Hot Dog, Fries and a Soda', value: 1},
      {label: 'Burger, Shake and a Smile', value: 2},
      {label: 'Sugar, Spice and all things nice', value: 3},
      {label: 'Baby Back Ribs', value: 4}
    ];
    vm.groupedItem = {};
    vm.groupedSelectItems = [
      {label: 'Group 1 - Option 1', value: 1, group: 'Group 1'},
      {label: 'Group 2 - Option 2', value: 2, group: 'Group 2'},
      {label: 'Group 1 - Option 3', value: 3, group: 'Group 1'},
      {label: 'Group 2 - Option 4', value: 4, group: 'Group 2'}
    ];

    vm.groupedByItem = {};
    vm.groupedBySelectItems = [
      {name: 'Adam', country: 'United States'},
      {name: 'Amalie', country: 'Argentina'},
      {name: 'Estefanía', country: 'Argentina'},
      {name: 'Adrian', country: 'Ecuador'},
      {name: 'Wladimir', country: 'Ecuador'},
      {name: 'Samantha', country: 'United States'},
      {name: 'Nicole', country: 'Colombia'},
      {name: 'Natasha', country: 'Ecuador'},
      {name: 'Michael', country: 'Colombia'},
      {name: 'Nicolás', country: 'Colombia'}
    ];
    vm.groupedByCitisItems = [];
    vm.groupedByStatesItems = [];
    vm.city = 'child';

    vm.someGroupFn = function (item) {

      if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';
      if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';
    };

    vm.disableItem = {};
    vm.disableItems = [];

    vm.multipleItem = {};
    vm.multipleSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
      {label: 'Option 6', value: 6},
      {label: 'Option 7', value: 7},
      {label: 'Option 8', value: 8}
    ];
    vm.withDeleteItem = {};
    vm.withDeleteSelectItems = [
      {label: 'Option 1', value: 1},
      {label: 'Option 2', value: 2},
      {label: 'Option 3', value: 3},
      {label: 'Option 4', value: 4},
      {label: 'Option 5', value: 5},
      {label: 'Option 6', value: 6},
      {label: 'Option 7', value: 7},
      {label: 'Option 8', value: 8}
    ];

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
          var temp= {}
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


