/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    function SearchPageCtrl($scope, $window, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, Cities, States, Vins, SearchOptions,$uibModal, baProgressModal, uiGridConstants){
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;
        $scope.data = [];
        var settingTemplate = '<div>Detail Link<button type="button" class="setting_btn" data-toggle="modal" ng-click="grid.appScope.open()"><i class="ion-gear-a"></i></button></div>';
        var selectedRow = null;
        function getCellClass(grid, row){
            //return row.uid === selectedRow ? 'highlight' : '';
        }
        $scope.gridOptions = {
            onRegisterApi: function(gridApi){
                $rootScope.$gridApi = gridApi;
                //gridApi.cellNav.on.navigate($scope, function(selected){
                //   if ('.ui-grid-cell-focus ') {
                //       selectedRow = selected.row.uid;
                //       gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                //   }
                //});

                gridApi.selection.on.rowSelectionChanged($scope, function(row){
                    $state.go("normal.detail", {vin:row.entity.PCF})
                });

            },
            data: '$dataSource',
            enableRowSelection: true,
            enableColumnResizing: true,
            enableRowHeaderSelection: false
        };

        $scope.gridOptions.columnDefs = [
            {name: 'ID', width:60},
            {name: 'Title'},
            {name: 'Mileage', width:100},
            {name: 'Price', width:80},
            {name: 'Location'},
            {name: 'BuildSheet'},
            {name: 'Make'},
            {name: 'Model'},
            {name: 'Trim'},
            {name: 'Date', width:100},
            {name: 'Condition', width:60},
            {name: 'PCF'},
            {name: 'Detail Link', width: 100, headerCellTemplate: settingTemplate, cellTemplate:'<a class="email-link" ng-href="/#/normal/detail/{{row.entity.PCF}}">Detail View</a>'}
        ];
        //$scope.gridOptions.data = [{"id":1, "name":"test"},{"id":2, "name":"test"}];
        var off=[];

        $scope.load = loadOffers;
        $scope.colums = {
          title: true,
          mileage: true,
          price: true,
          location: true,
          vin: true,
          make: false,
          model: false,
          trim: false,
          date: false,
          condition: false,
        };

        $scope.gridOptions.columnDefs[1].visible = $scope.colums['title'];
        $scope.gridOptions.columnDefs[2].visible = $scope.colums['mileage'];
        $scope.gridOptions.columnDefs[3].visible = $scope.colums['price'];
        $scope.gridOptions.columnDefs[4].visible = $scope.colums['location'];
        $scope.gridOptions.columnDefs[5].visible = $scope.colums['vin'];
        $scope.gridOptions.columnDefs[6].visible = $scope.colums['make'];
        $scope.gridOptions.columnDefs[7].visible = $scope.colums['model'];
        $scope.gridOptions.columnDefs[8].visible = $scope.colums['trim'];
        $scope.gridOptions.columnDefs[9].visible = $scope.colums['date'];
        $scope.gridOptions.columnDefs[10].visible = $scope.colums['condition'];
        $scope.gridOptions.columnDefs[11].visible = false;
        off.push($scope.$watchGroup([
            'filter.keyword'
        ], doSearch));

        off.push($scope.$watchGroup([
            'colums.title',
            'colums.mileage',
            'colums.price',
            'colums.location',
            'colums.vin',
            'colums.make',
            'colums.model',
            'colums.trim',
            'colums.date',
            'colums.condition',
        ], doUpdateCols));
        function doUpdateCols(){
            $scope.gridOptions.columnDefs[1].visible = $scope.colums['title'];
            $scope.gridOptions.columnDefs[2].visible = $scope.colums['mileage'];
            $scope.gridOptions.columnDefs[3].visible = $scope.colums['price'];
            $scope.gridOptions.columnDefs[4].visible = $scope.colums['location'];
            $scope.gridOptions.columnDefs[5].visible = $scope.colums['vin'];
            $scope.gridOptions.columnDefs[6].visible = $scope.colums['make'];
            $scope.gridOptions.columnDefs[7].visible = $scope.colums['model'];
            $scope.gridOptions.columnDefs[8].visible = $scope.colums['trim'];
            $scope.gridOptions.columnDefs[9].visible = $scope.colums['date'];
            $scope.gridOptions.columnDefs[10].visible = $scope.colums['condition'];
            $scope.gridOptions.columnDefs[11].visible = false;
            $rootScope.$gridApi.grid.refresh();
        }

        function loadOffers(){
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);
            //filter.page = $scope.page;

            Offer.query(filter, {}, function (offers) {
                $rootScope.isLoading = false;

                $rootScope.$next_list = {};
                var data = [];
                for ( var i = 0;  i< offers.results.length; i++){
                    var record = {};
                    if ( i< offers.results.length - 1 )
                        $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;
                    data.push({
                        'ID': offers.results[i].id,
                        'Title': offers.results[i].listing_title,
                        'Mileage': offers.results[i].mileage,
                        'Price': offers.results[i].price,
                        'Location': offers.results[i].city + ' ' + offers.results[i].state,
                        'BuildSheet': offers.results[i].vin_code,
                        'Make': offers.results[i].listing_make,
                        'Model': offers.results[i].listing_model,
                        'Trim': offers.results[i].listing_trim,
                        'Date': offers.results[i].listing_date,
                        'PCF': offers.results[i].pcf.vid,
                        'Condition': offers.results[i].cond
                    });
                }

                //$rootScope.$carData = offers.results;
                //$rootScope.$carData1 = offers.results;
                $rootScope.$next = offers.next;
                $rootScope.$prev = offers.previous;
                $rootScope.$dataSource = data;
                //$rootScope.$gridApi.grid.refresh();

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
        $scope.open = function () {
          var page = 'app/pages/search/widgets/infoModal.html';
          $uibModal.open({
            animation: true,
            templateUrl: page,
            scope: $scope
          });
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
                .success(function(offers){
                    $rootScope.isLoading = false;

                    $rootScope.$next_list = {};
                    var data = [];
                    for ( var i = 0;  i< offers.results.length; i++){
                        var record = {};
                        if ( i< offers.results.length - 1 )
                            $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;
                        data.push({
                            'ID': offers.results[i].id,
                            'Title': offers.results[i].listing_title,
                            'Mileage': offers.results[i].mileage,
                            'Price': offers.results[i].price,
                            'Location': offers.results[i].city + ' ' + offers.results[i].state,
                            'BuildSheet': offers.results[i].vin_code,
                            'Make': offers.results[i].listing_make,
                            'Model': offers.results[i].listing_model,
                            'Trim': offers.results[i].listing_trim,
                            'Date': offers.results[i].listing_date,
                            'PCF': offers.results[i].pcf.vid,
                            'Condition': offers.results[i].cond
                        });
                    }

                    //$rootScope.$carData = offers.results;
                    //$rootScope.$carData1 = offers.results;
                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    $rootScope.$dataSource = data;
                    //$rootScope.$gridApi.grid.refresh();
                })
                .error(function(offers){

                })
        };

        $rootScope.prevPage = function(){
            var newURL = $rootScope.extractURL($rootScope.$prev);

            $http({
                method: 'GET',
                url: newURL,
                headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
            })
                .success(function(offers){
                    $rootScope.isLoading = false;

                    $rootScope.$next_list = {};
                    var data = [];
                    for ( var i = 0;  i< offers.results.length; i++){
                        var record = {};
                        if ( i< offers.results.length - 1 )
                            $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i+1].pcf.vid;
                        data.push({
                            'ID': offers.results[i].id,
                            'Title': offers.results[i].listing_title,
                            'Mileage': offers.results[i].mileage,
                            'Price': offers.results[i].price,
                            'Location': offers.results[i].city + ' ' + offers.results[i].state,
                            'BuildSheet': offers.results[i].vin_code,
                            'Make': offers.results[i].listing_make,
                            'Model': offers.results[i].listing_model,
                            'Trim': offers.results[i].listing_trim,
                            'Date': offers.results[i].listing_date,
                            'PCF': offers.results[i].pcf.vid,
                            'Condition': offers.results[i].cond
                        });
                    }

                    //$rootScope.$carData = offers.results;
                    //$rootScope.$carData1 = offers.results;
                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    $rootScope.$dataSource = data;
                    //$rootScope.$gridApi.grid.refresh();
                })
                .error(function(response){

                })
        };
    }
})();
