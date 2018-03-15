(function () {
    'use strict';

    angular.module('pcarfinder.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);

    function SearchPageCtrl($scope, $window, $rootScope, $filter, $location, $timeout, BSLookup, $http, $state, $stateParams, CFG, Offer,
                            Cities, States, Vins, SearchOptions, DisplayOptions, MobileDisplayOptions, DesktopDisplayOptions, $uibModal, uiGridConstants){
        $scope.offer = {};

        $scope.filter = SearchOptions.filter;
        $scope.resetFacets = SearchOptions.resetFacets;
        $scope.resetDisplayColumns = DisplayOptions.resetDisplayColumns;
        $scope.filterOptions = SearchOptions.options;
        $scope.data = [];
        var settingTemplate = '<div>Detail Link<button type="button" class="setting_btn" data-toggle="modal" ng-click="open()"><i class="ion-gear-a"></i></button></div>';
        var selectedRow = null;
        $scope.chkCounts = 0;
        $scope.chkAvailable = false;
        var off=[];
        $scope.colums = DisplayOptions.persist(DesktopDisplayOptions);
        $rootScope.is_mobile = false;
        $rootScope.isLastListing = false;
        $scope.keywordClear = false;

        if ($window.innerWidth < 480) {
            $rootScope.is_mobile = true;
            $scope.colums = DisplayOptions.persist(MobileDisplayOptions);
        }

        $scope.clearIconToggle = function(param){
            if($scope.filter[param].length)
                $scope[param+'Clear'] = true;
            else
                $scope[param+'Clear'] = false;
        };
        $scope.clearText = function(param){
            $scope.filter[param] = '';
            $scope.clearIconToggle(param);
        };

        $scope.clearIconToggle("keyword");

        $(window).resize(function() {
            $scope.windowWidth = $(window).width();

            if ($scope.windowWidth < 480) {
                $rootScope.is_mobile = true;
                $scope.resetDisplayColumns(MobileDisplayOptions);
                $scope.colums = DisplayOptions.persist(MobileDisplayOptions);
            } else {
                $rootScope.is_mobile = false;
                //$scope.resetDisplayColumns(DesktopDisplayOptions);
                //$scope.colums = DisplayOptions.persist(DesktopDisplayOptions);
            }

            setDisplayOptions();
        });

        function getCellClass(grid, row){
            //return row.uid === selectedRow ? 'highlight' : '';
        }
        $scope.gridOptions = {
            onRegisterApi: function(gridApi){
                $rootScope.$gridApi = gridApi;

                gridApi.selection.on.rowSelectionChanged($scope, function(row){
                    $state.go("normal.detail", {
                    vin:row.entity.pcf__vid,
                    model:$scope.filter['model'],
                    title:$scope.filter['title'],
                    city:$scope.filter['city'],
                    state:typeof($scope.filter.state) === 'object'?$scope.filter.state.value:'',
                    year_from:$scope.filter['year_from']==1955?'':$scope.filter['year_from'],
                    year_to:$scope.filter['year_to']==2019?'':$scope.filter['year_to'],
                    description:$scope.filter['description'],
                    cond:typeof($scope.filter.cond) === 'object'?$scope.filter.cond.value:'',
                    seller_type:typeof($scope.filter.seller_type) === 'object'?$scope.filter.seller_type.value:'',
                    longhood:$scope.filter['longhood'],
                    widebody:$scope.filter['widebody'],
                    pts:$scope.filter['pts'],
                    pccb:$scope.filter['pccb'],
                    lwb:$scope.filter['lwb'],
                    aircooled:$scope.filter['aircooled'],
                    auto_trans:typeof($scope.filter.auto_trans) === 'object'?$scope.filter.auto_trans.value:'',
                    listing_transmission:typeof($scope.filter.listing_transmission) === 'object'?$scope.filter.listing_transmission.value:'',
                    listing_drivetrain:typeof($scope.filter.listing_drivetrain) === 'object'?$scope.filter.listing_drivetrain.value:'',
                    listing_sold_status:typeof($scope.filter.listing_sold_status) === 'object'?$scope.filter.listing_sold_status.value:'',
                    listing_exterior_color:$scope.filter['listing_exterior_color'],
                    listing_interior_color:$scope.filter['listing_interior_color'],
                    listing_engine_size:$scope.filter['listing_engine_size'],
                    mileage_from:$scope.filter['mileage_from'],
                    mileage_to:$scope.filter['mileage_to'],
                    price_from:$scope.filter['price_from'],
                    price_to:$scope.filter['price_to'],
                    model_number:typeof($scope.filter.model_number) === 'object'?$scope.filter.model_number.value:'',
                    listing_year:$scope.filter['listing_year'],
                    listing_age_from:$scope.filter['listing_age_from']==-1?'':$scope.filter['listing_age_from'],
                    listing_age_to:$scope.filter['listing_age_to']==31?'':$scope.filter['listing_age_to'],
                    pcf_listing_age_from:$scope.filter['pcf_listing_age_from']==-1?'':$scope.filter['pcf_listing_age_from'],
                    pcf_listing_age_to:$scope.filter['pcf_listing_age_to']==31?'':$scope.filter['pcf_listing_age_to'],
                    pcf_msrp_from:$scope.filter['pcf_msrp_from'],
                    pcf_msrp_to:$scope.filter['pcf_msrp_to'],
                    bs_model_detail:$scope.filter['bsf_model_detail'],
                    bs_msrp_from:$scope.filter['bsf_msrp_from'],
                    bs_msrp_to:$scope.filter['bsf_msrp_to'],
                    bs_interior:$scope.filter['bsf_interior'],
                    bs_exterior:$scope.filter['bsf_exterior'],
                    bs_model_year_from:$scope.filter['bsf_model_year_from']==1955?'':$scope.filter['bsf_model_year_from'],
                    bs_model_year_to:$scope.filter['bsf_model_year_to']==2019?'':$scope.filter['bsf_model_year_to'],
                    bs_production_month_from:$scope.filter['bsf_production_month_from'],
                    bs_production_month_to:$scope.filter['bsf_production_month_to'],
                    listing_date_start:$scope.filter['listing_date_start'],
                    listing_date_end:$scope.filter['listing_date_end'],
                    pcf_body_type:typeof($scope.filter.pcf_body_type) === 'object'?$scope.filter.pcf_body_type.value:'',
                    keyword:$scope.filter['keyword']});
                });

                $rootScope.$gridApi.core.on.sortChanged($scope, function(grid, sortColumns){
                    if (sortColumns.length == 0){
                        $scope.filter['sort'] = '';
                    } else {
                        $scope.filter['sort'] = sortColumns[0].name;
                        $scope.filter['direction'] = sortColumns[0].sort.direction;
                        doSearch();
                    }
                });

            },
            data: '$dataSource',
            useExternalSorting: true,
            enableRowSelection: true,
            enableColumnResizing: true,
            enableHiding: false,
            minRowsToShow: 11,
            enableRowHeaderSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0
        };

        $scope.gridOptions.columnDefs = [
            {name: 'ID', width:60},
            {name: 'listing_title',  displayName:'(L) Title', enableHiding: false},
            {name: 'pcf__model_number', displayName:'Model Number', width:120, enableHiding: false},
            {name: 'mileage', displayName:'Mileage', width:100, enableHiding: false},
            {name: 'price', displayName:'Price',width:100, enableHiding: false},

            {name: 'city', displayName:'City',width:100, enableHiding: false},
            {name: 'state', displayName:'State', width:100, enableHiding: false},
            {name: 'vin_code', displayName:'VIN', width:200, enableHiding: false},
            {name: 'listing_make', displayName:'Make', width:150, enableHiding: false},
            {name: 'listing_model', displayName:'Model', width:150, enableHiding: false},
            {name: 'listing_trim', displayName:'Trim', width:100, enableHiding: false},
            {name: 'listing_date', displayName:'Date', width:100, enableHiding: false},
            {name: 'cond', displayName:'Condition', width:100, enableHiding: false},

            {name: 'pcf__vid', displayName:'PCF', enableHiding: false},
            {name: 'listing_year', displayName:'(L) Year', width:100, enableHiding: false},
            {name: 'listing_exterior_color', displayName:'(L) Exterior', width:150, enableHiding: false},
            {name: 'listing_interior_color', displayName:'(L) Interior', width:150, enableHiding: false},
            {name: 'listing_transmission', displayName:'Transmission', width:150, enableHiding: false},
            {name: 'vin__msrp', displayName:'MSRP', width:100, enableHiding: false},
            {name: 'pcf__gap_to_msrp', displayName:'% of MSRP', width:100, enableHiding: false},
            {name: 'listing_engine_size', displayName:'Engine', width:100, enableHiding: false},
            {name: 'listing_drivetrain', displayName:'Drivetrain', width:100, enableHiding: false},

            {name: 'vin__model_year', displayName:'(BS) Year', width:100, enableHiding: false},
            {name: 'vin__model_detail', displayName:'(BS) Model', width:300, enableHiding: false},
            {name: 'vin__color', displayName:'(BS) Exterior', width:200, enableHiding: false},
            {name: 'vin__interior', displayName:'(BS) Interior', width:200, enableHiding: false},
            {name: 'vin__production_month', displayName:'Production Month', width:200, enableHiding: false},
            {name: 'vin__warranty_start', displayName:'Warranty Start', width:200, enableHiding: false},

            {name: 'pcf__pts', displayName:'PTS', width:100, enableHiding: false},
            {name: 'pcf__lwb_seats', displayName:'LWB Seats', width:100, enableHiding: false},
            {name: 'pcf__longhood', displayName:'Longhood', width:100, enableHiding: false},
            {name: 'pcf__widebody', displayName:'Widebody', width:100, enableHiding: false},
            {name: 'pcf__pccb', displayName:'PCCB', width:100, enableHiding: false},
            {name: 'pcf__air_cooled', displayName:'Air-Cooled', width:100, enableHiding: false},
            {name: 'pcf__listing_age', displayName:'Listing Age', width:100, enableHiding: false},
            {name: 'pcf__body_type', displayName:'Body Type', width:100, enableHiding: false},
            {name: 'pcf__auto_trans', displayName:'Auto Trans Type', width:200, enableHiding: false},
        ];



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

        //$scope.$watch(function () {
        //    return $window.innerWidth;
        //}, function (innerWidth){
        //    //$rootScope.safeApply(function(){
        //        $rootScope.is_mobile = false;
        //        if (innerWidth < 480) $rootScope.is_mobile = true;
        //    //});
        //});
        setDisplayOptions();

        $scope.changeStatus = function(name){
            if ( $scope.chkCounts < 9){
            } else {
                $scope.colums[name] = false;
            }

        };
        $scope.reset = function(){
            $scope.windowWidth = $(window).width();

            if ($scope.windowWidth < 480) {
                $rootScope.is_mobile = true;
                $scope.resetDisplayColumns(MobileDisplayOptions);
                $scope.colums = DisplayOptions.persist(MobileDisplayOptions);
            } else {
                $rootScope.is_mobile = false;
                $scope.resetDisplayColumns(DesktopDisplayOptions);
                $scope.colums = DisplayOptions.persist(DesktopDisplayOptions);
            }

            setDisplayOptions();

        };

        function doUpdateCols(val){
            $scope.chkCounts = 0;

            for( var index = 0; index < val.length; index++){
                if (val[index] ) {
                    $scope.chkCounts++;
                }
            }

            if ( $scope.chkCounts <= 9){
                setDisplayOptions();
            }

            $rootScope.$gridApi.grid.refresh();
        }

        function pushData(data, obj){

            data.push({
                'ID': obj.id,
                'listing_title': obj.listing_title,
                'mileage':obj.mileage != null && obj.mileage !=0?obj.mileage.toLocaleString():'',
                'price': obj.price != null && obj.price != 0?'$' + (obj.price.toLocaleString()):'',
                'city': $scope.colums['city']?obj.city:'' ,
                'state': $scope.colums['state']?obj.state:'',
                'vin_code': obj.vin_code,
                'listing_make': obj.listing_make,
                'listing_model': obj.listing_model,
                'listing_trim': obj.listing_trim,
                'listing_date': obj.listing_date.slice(0,10),
                'pcf__vid': obj.pcf.vid,
                'cond': obj.cond,
                'listing_year': obj.listing_year,
                'listing_exterior_color': obj.listing_exterior_color,
                'listing_interior_color': obj.listing_interior_color,
                'listing_transmission': obj.listing_transmission,
                'listing_engine_size': obj.listing_engine_size,
                'listing_drivetrain': obj.listing_drivetrain,
                'vin__msrp': (obj.vin != null?'$' + (obj.vin.msrp.toLocaleString()):''),
                'vin__model_year': obj.vin !=null?obj.vin.model_year:'',
                'vin__model_detail': obj.vin !=null?obj.vin.model_detail:'',
                'vin__color': obj.vin !=null?obj.vin.color:'',
                'vin__interior': obj.vin !=null?obj.vin.interior:'',
                'vin__production_month': obj.vin !=null?obj.vin.production_month.slice(0, 7):'',
                'vin__warranty_start': obj.vin !=null?obj.vin.warranty_start:'',
                'pcf__model_number': obj.pcf.model_number,
                'pcf__gap_to_msrp': obj.pcf.gap_to_msrp != 0?obj.pcf.gap_to_msrp + '%':'',
                'pcf__pts': obj.pcf.pts == 0?'No':'Yes',
                'pcf__lwb_seats': obj.pcf.lwb_seats == 0?'No':'Yes',
                'pcf__longhood': obj.pcf.longhood == 0?'No':'Yes',
                'pcf__widebody': obj.pcf.widebody == 0?'No':'Yes',
                'pcf__pccb': obj.pcf.pccb == 0?'No':'Yes',
                'pcf__air_cooled': obj.pcf.air_cooled == 0?'No':'Yes',
                'pcf__listing_age': obj.pcf.listing_age + ' days',
                'pcf__body_type': obj.pcf.body_type,
                'pcf__auto_trans': obj.pcf.auto_trans
            });
        }
        function loadOffers(){
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);

            if ( filter.listing_date == null ){
                filter.listing_date_start = '';
                filter.listing_date_end = '';
            } else {
                if (filter.listing_date.startDate == null){
                    filter.listing_date_start = '';
                }else {
                    if (filter.listing_date.startDate.format == null) {
                        filter.listing_date_start = filter.listing_date.startDate.slice(0, 10);
                    } else {
                        filter.listing_date_start = filter.listing_date.startDate.format('YYYY-MM-DD');
                    }
                }

                if (filter.listing_date.endDate == null) {
                    filter.listing_date_end = '';
                } else {
                    if (filter.listing_date.endDate.format == null) {
                        filter.listing_date_end = filter.listing_date.endDate.slice(0, 10);
                    } else {
                        filter.listing_date_end = filter.listing_date.endDate.format('YYYY-MM-DD');
                    }
                }
            }

            if ( typeof(filter.listing_sold_status) === 'object' ) {
                filter.listing_sold_status = filter.listing_sold_status.value;
            }else{
                filter.listing_sold_status = 0;
            }

            if ( typeof(filter.state) === 'object' ) filter.state = filter.state.value;
            if ( typeof(filter.auto_trans) === 'object' ) filter.auto_trans = filter.auto_trans.value;
            if ( typeof(filter.cond) === 'object' ) filter.cond = filter.cond.value;
            if ( typeof(filter.seller_type) === 'object' ) filter.seller_type = filter.seller_type.value;
            if ( typeof(filter.listing_transmission) === 'object' ) filter.listing_transmission = filter.listing_transmission.value;
            if ( typeof(filter.listing_drivetrain) === 'object' ) filter.listing_drivetrain = filter.listing_drivetrain.value;
            if ( typeof(filter.model_number) === 'object' ) filter.model_number = filter.model_number.value;
            if ( typeof(filter.pcf_body_type) === 'object' ) filter.pcf_body_type = filter.pcf_body_type.value;
            if ( filter.bsf_model_year_from = 1955 & filter.bsf_model_year_to == 2019 ){
                filter.bsf_model_year_from = '';
                filter.bsf_model_year_to = '';
            }

            Offer.query(filter, {}, function (offers) {
                $rootScope.isLoading = false;
                $rootScope.$totalLength = offers.count.toLocaleString();
                $rootScope.$next_list = {};
                var data = [];

                if (offers.results.length == 0){
                    if (filter.keyword.length != 17) return;

                    BSLookup.get({id:filter.keyword}, function (offers) {
                        $rootScope.isLoading = false;

                        $rootScope.$active = offers;
                        if (offers.length>0) {
                            $scope.bShowActive = true;
                        } else {
                            $scope.bShowActive = false;
                        }
                    }, function(err){
                        $rootScope.isLoading = false;
                        $rootScope.handleErrors($scope,err);
                    });
                }else {
                    for (var i = 0; i < offers.results.length; i++) {
                        var record = {};
                        if (i < offers.results.length - 1)
                            if (offers.results[i + 1].pcf != null) $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i + 1].pcf.vid;
                        pushData(data, offers.results[i]);
                    }
                }

                $rootScope.$next = offers.next;
                $rootScope.$prev = offers.previous;
                $rootScope.$dataSource = data;

            }, function(err){
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope,err);
            });
        }

        function doSearch(){

            if (!$rootScope.isLoading) {
                $scope.page = 0;
                $scope.offers = [];

                loadOffers()
            }
        }
        $scope.openSettingDlg = function () {
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
            if (!$rootScope.$next) return;

            var newURL = $rootScope.extractURL($rootScope.$next);
            $rootScope.isLoading = true;
            $scope.filter.page += 1;

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

                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    $rootScope.$dataSource = data;

                    if ($rootScope.isLastListing){
                        if ( offers.results.length > 0) $window.location = '/ID/' + offers.results[0].pcf.vid;
                    }
                })
                .error(function(offers){
                    $rootScope.isLoading = false;
                })
        };

        $rootScope.prevPage = function(){

            var newURL = $rootScope.extractURL($rootScope.$prev);
            if ($scope.filter.page > 1) $scope.filter.page -= 1;
            $rootScope.isLoading = true;
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

                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    $rootScope.$dataSource = data;
                })
                .error(function(response){
                    $rootScope.isLoading = false;
                })
        };

        function setDisplayOptions() {
            $scope.gridOptions.columnDefs[0].visible = false;
            $scope.gridOptions.columnDefs[1].visible = $scope.colums['title'];
            $scope.gridOptions.columnDefs[2].visible = $scope.colums['model_number'];
            $scope.gridOptions.columnDefs[3].visible = $scope.colums['mileage'];
            $scope.gridOptions.columnDefs[4].visible = $scope.colums['price'];

            $scope.gridOptions.columnDefs[5].visible = $scope.colums['city'];
            $scope.gridOptions.columnDefs[6].visible = $scope.colums['state'];
            $scope.gridOptions.columnDefs[7].visible = $scope.colums['vin'];
            $scope.gridOptions.columnDefs[8].visible = false;
            $scope.gridOptions.columnDefs[9].visible = $scope.colums['model'];
            $scope.gridOptions.columnDefs[10].visible = $scope.colums['trim'];
            $scope.gridOptions.columnDefs[11].visible = $scope.colums['date'];
            $scope.gridOptions.columnDefs[12].visible = $scope.colums['condition'];
            $scope.gridOptions.columnDefs[13].visible = false;
            $scope.gridOptions.columnDefs[14].visible = $scope.colums['listing_year'];
            $scope.gridOptions.columnDefs[15].visible = $scope.colums['listing_exterior'];
            $scope.gridOptions.columnDefs[16].visible = $scope.colums['listing_interior'];
            $scope.gridOptions.columnDefs[17].visible = $scope.colums['transmission'];
            $scope.gridOptions.columnDefs[18].visible = $scope.colums['msrp'];
            $scope.gridOptions.columnDefs[19].visible = $scope.colums['price_msrp'];
            $scope.gridOptions.columnDefs[20].visible = $scope.colums['engine'];
            $scope.gridOptions.columnDefs[21].visible = $scope.colums['drivetrain'];
            $scope.gridOptions.columnDefs[22].visible = $scope.colums['bs_year'];
            $scope.gridOptions.columnDefs[23].visible = $scope.colums['bs_model'];
            $scope.gridOptions.columnDefs[24].visible = $scope.colums['bs_exterior'];
            $scope.gridOptions.columnDefs[25].visible = $scope.colums['bs_interior'];
            $scope.gridOptions.columnDefs[26].visible = $scope.colums['production_month'];
            $scope.gridOptions.columnDefs[27].visible = $scope.colums['warranty_start'];
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
