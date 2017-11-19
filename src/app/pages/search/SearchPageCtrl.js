/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    function SearchPageCtrl($scope, $window, $rootScope, $filter, $location, $timeout, $interval, $http, $state, $stateParams, CFG, Offer, Cities, States, Vins, SearchOptions, DisplayOptions, $uibModal, baProgressModal, uiGridConstants){
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;
        $scope.data = [];
        var settingTemplate = '<div>Detail Link<button type="button" class="setting_btn" data-toggle="modal" ng-click="open()"><i class="ion-gear-a"></i></button></div>';
        var selectedRow = null;
        $scope.chkCounts = 0;
        $scope.chkAvailable = false;

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
                    $state.go("normal.detail", {vin:row.entity.PCF});
                });

            },
            data: '$dataSource',
            enableRowSelection: true,
            enableColumnResizing: true,
            enableHiding: false,
            minRowsToShow: 11,
            enableRowHeaderSelection: false
        };

        $scope.gridOptions.columnDefs = [
            {name: 'ID', width:60},
            {name: 'Title', displayName:'(L) Title', enableHiding: false},
            {name: 'Mileage', width:100, enableHiding: false},
            {name: 'Price', width:80, enableHiding: false},
            {name: 'City', enableHiding: false},
            {name: 'State', enableHiding: false},
            {name: 'BuildSheet', displayName:'VIN', enableHiding: false},
            {name: 'Make', enableHiding: false},
            {name: 'Model', displayName:'(L) Model', enableHiding: false},
            {name: 'Trim', enableHiding: false},
            {name: 'Date', width:100, enableHiding: false},
            {name: 'Condition', width:60, enableHiding: false},

            {name: 'PCF', displayName:'PCF', enableHiding: false},
            {name: 'listing_year', displayName:'(L) Year', enableHiding: false},
            {name: 'listing_exterior', displayName:'(L) Exterior', enableHiding: false},
            {name: 'listing_interior', displayName:'(L) Interior', enableHiding: false},
            {name: 'Transmission', enableHiding: false},
            {name: 'Engine', enableHiding: false},
            {name: 'Drivetrain'},
            {name: 'MSRP', displayName:'MSRP', enableHiding: false},
            {name: 'bs_year', displayName:'(BS) Year', enableHiding: false},
            {name: 'bs_model', displayName:'(BS) Model', enableHiding: false},
            {name: 'bs_exterior', displayName:'(BS) Exterior', enableHiding: false},
            {name: 'bs_interior', displayName:'(BS) Interior', enableHiding: false},
            {name: 'production_month', displayName:'Production Month', enableHiding: false},
            {name: 'warranty_start', displayName:'Warranty Start', enableHiding: false},

            {name: 'model_number', displayName:'Model Number', enableHiding: false},
            {name: 'price_msrp', displayName:'Price % of MSRP', enableHiding: false},
            {name: 'PTS', displayName:'PTS', enableHiding: false},
            {name: 'lwb', displayName:'LWB Seats', enableHiding: false},
            {name: 'Longhood', enableHiding: false},
            {name: 'Widebody', enableHiding: false},
            {name: 'pccb', displayName:'PCCB', enableHiding: false},
            {name: 'aircooled', displayName:'Air-cooled', enableHiding: false},
            {name: 'listing_age', displayName:'Listing Age', enableHiding: false},
            {name: 'body_type', displayName:'Body Type', enableHiding: false},
            {name: 'auto_trans', displayName:'Auto Trans Type', enableHiding: false},


            //{name: 'Detail Link', width: 100, headerCellTemplate: settingTemplate, cellTemplate:'<a class="email-link" ng-href="/#/normal/detail/{{row.entity.PCF}}">Detail View</a>'}
        ];
        //$scope.gridOptions.data = [{"id":1, "name":"test"},{"id":2, "name":"test"}];
        var off=[];

        $scope.load = loadOffers;
        $scope.colums = DisplayOptions.colums;

        off.push($scope.$watchGroup([
            'filter.keyword'
        ], doSearch));

        off.push($scope.$watchGroup([
            'colums.title',
            'colums.mileage',
            'colums.price',
            'colums.city',
            'colums.state',
            'colums.vin',
            'colums.make',
            'colums.model',
            'colums.trim',
            'colums.date',
            'colums.condition',
            'colums.pcf',
            'colums.listing_year',
            'colums.listing_exterior',
            'colums.listing_interior',
            'colums.transmission',
            'colums.engine',
            'colums.drivetrain',
            'colums.msrp',
            'colums.bs_year',
            'colums.bs_model',
            'colums.bs_exterior',
            'colums.bs_interior',
            'colums.production_month',
            'colums.warranty_start',
            'colums.model_number',
            'colums.price_msrp',
            'colums.pts',
            'colums.lwb',
            'colums.longhood',
            'colums.widebody',
            'colums.pccb',
            'colums.aircooled',
            'colums.listing_age',
            'colums.body_type',
            'colums.auto_trans'
        ], function (val){
            doUpdateCols(val);
        }));

        setDisplayOptions();

        $scope.changeStatus = function(name){
            if ( $scope.chkCounts < 9){
            } else {
                $scope.colums[name] = false;
            }

        };
        function doUpdateCols(val){
            $scope.chkCounts = 0;

            for( var index = 0; index < val.length; index++){
                if (val[index] ) {
                    $scope.chkCounts++;
                }
            }

            if ( $scope.chkCounts <= 9){
                //$scope.chkAvailable = true;
                setDisplayOptions();
            } else {
                //$scope.chkAvailable = false;
            }



            $rootScope.$gridApi.grid.refresh();
        }

        function pushData(data, obj){

            data.push({
                'ID': obj.id,
                'Title': obj.listing_title,
                'Mileage':obj.mileage.toLocaleString(),
                'Price': '$' + (obj.price.toLocaleString()),
                'City': $scope.colums['city']?obj.city:'' ,
                'State': $scope.colums['state']?obj.state:'',
                'BuildSheet': obj.vin_code,
                'Make': obj.listing_make,
                'Model': obj.listing_model,
                'Trim': obj.listing_trim,
                'Date': obj.listing_date.slice(0,10),
                'PCF': obj.pcf.vid,
                'Condition': obj.cond,
                'listing_year': obj.listing_year,
                'listing_exterior': obj.listing_exterior_color,
                'listing_interior': obj.listing_interior_color,
                'Transmission': obj.listing_transmission,
                'Engine': obj.listing_engine_size,
                'Drivetrain': obj.listing_drivetrain,
                'MSRP': (obj.vin != null?'$' + (obj.vin.msrp.toLocaleString()):''),
                'bs_year': obj.vin !=null?obj.vin.model_year:'',
                'bs_model': obj.vin !=null?obj.vin.model_detail:'',
                'bs_exterior': obj.vin !=null?obj.vin.color:'',
                'bs_interior': obj.vin !=null?obj.vin.interior:'',
                'production_month': obj.vin !=null?obj.vin.production_month:'',
                'warranty_start': obj.vin !=null?obj.vin.warranty_start:'',
                'model_number': obj.pcf.model_number,
                'price_msrp': obj.pcf.gap_to_msrp != 0?obj.pcf.gap_to_msrp + '%':'',
                'PTS': obj.pcf.pts == 0?'No':'Yes',
                'lwb': obj.pcf.lwb_seats == 0?'No':'Yes',
                'Longhood': obj.pcf.longhood == 0?'No':'Yes',
                'Widebody': obj.pcf.widebody == 0?'No':'Yes',
                'pccb': obj.pcf.pccb == 0?'No':'Yes',
                'aircooled': obj.pcf.air_cooled == 0?'No':'Yes',
                'listing_age': obj.pcf.listing_age + ' days',
                'body_type': obj.pcf.body_type,
                'auto_trans': obj.pcf.auto_trans
            });
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
                    pushData(data, offers.results[i]);
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
                        pushData(data, offers.results[i]);
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
                        pushData(data, offers.results[i]);
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

        function setDisplayOptions() {
            $scope.gridOptions.columnDefs[0].visible = false;
            $scope.gridOptions.columnDefs[1].visible = $scope.colums['title'];
            $scope.gridOptions.columnDefs[2].visible = $scope.colums['mileage'];
            $scope.gridOptions.columnDefs[3].visible = $scope.colums['price'];
            $scope.gridOptions.columnDefs[4].visible = $scope.colums['city'];
            $scope.gridOptions.columnDefs[5].visible = $scope.colums['state'];
            $scope.gridOptions.columnDefs[6].visible = $scope.colums['vin'];
            $scope.gridOptions.columnDefs[7].visible = false;
            $scope.gridOptions.columnDefs[8].visible = $scope.colums['model'];
            $scope.gridOptions.columnDefs[9].visible = $scope.colums['trim'];
            $scope.gridOptions.columnDefs[10].visible = $scope.colums['date'];
            $scope.gridOptions.columnDefs[11].visible = $scope.colums['condition'];
            $scope.gridOptions.columnDefs[12].visible = false;
            $scope.gridOptions.columnDefs[13].visible = $scope.colums['listing_year'];
            $scope.gridOptions.columnDefs[14].visible = $scope.colums['listing_exterior'];
            $scope.gridOptions.columnDefs[15].visible = $scope.colums['listing_interior'];
            $scope.gridOptions.columnDefs[16].visible = $scope.colums['transmission'];
            $scope.gridOptions.columnDefs[17].visible = $scope.colums['engine'];
            $scope.gridOptions.columnDefs[18].visible = $scope.colums['drivetrain'];
            $scope.gridOptions.columnDefs[19].visible = $scope.colums['msrp'];
            $scope.gridOptions.columnDefs[20].visible = $scope.colums['bs_year'];
            $scope.gridOptions.columnDefs[21].visible = $scope.colums['bs_model'];
            $scope.gridOptions.columnDefs[22].visible = $scope.colums['bs_exterior'];
            $scope.gridOptions.columnDefs[23].visible = $scope.colums['bs_interior'];
            $scope.gridOptions.columnDefs[24].visible = $scope.colums['production_month'];
            $scope.gridOptions.columnDefs[25].visible = $scope.colums['warranty_start'];
            $scope.gridOptions.columnDefs[26].visible = $scope.colums['model_number'];
            $scope.gridOptions.columnDefs[27].visible = $scope.colums['price_msrp'];
            $scope.gridOptions.columnDefs[28].visible = $scope.colums['pts'];
            $scope.gridOptions.columnDefs[29].visible = $scope.colums['lwb'];
            $scope.gridOptions.columnDefs[30].visible = $scope.colums['longhood'];
            $scope.gridOptions.columnDefs[31].visible = $scope.colums['widebody'];
            $scope.gridOptions.columnDefs[32].visible = $scope.colums['pccb'];
            $scope.gridOptions.columnDefs[33].visible = $scope.colums['aircooled'];
            $scope.gridOptions.columnDefs[34].visible = $scope.colums['listing_age'];
            $scope.gridOptions.columnDefs[35].visible = $scope.colums['body_type'];
            $scope.gridOptions.columnDefs[36].visible = $scope.colums['auto_trans'];
        }

    }
})();
