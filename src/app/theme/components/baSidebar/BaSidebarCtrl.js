(function () {
    'use strict';

    angular.module('pcarfinder.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($scope, $rootScope, $filter, $location, $timeout, $state, $stateParams, CFG, BSLookup, Offer, ActiveOfferDetail, Cities, States, Vins, Engines, Pcfbodies, SearchOptions){
        $scope.main_width = 40;
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.filterOptions = SearchOptions.options;
        var listing_year_slider = $('.listing_year_slider');
        var off=[];

        $scope.load = loadOffers;
        $scope.bShowMenu = false;
        $scope.bShowListing = false;
        $scope.bShowPCF = false;
        $scope.bShowBSF = false;
        $('.al-main').css('padding-left', '0px');

        $scope.opts = {
            //singleDatePicker: true,
            locale: {
                format: 'YYYY-MM-DD'
            }
        };
        off.push($scope.$watchGroup([
            'filter.model',
            'filter.title',
            'filter.city',
            'filter.state',
            'filter.price_from',
            'filter.price_to',
            'filter.mileage_from',
            'filter.mileage_to',
            //'filter.year_from',
            //'filter.year_to',
            'filter.description',
            'filter.listing_date',
            'filter.longhood',
            'filter.widebody',
            'filter.pts',
            'filter.pccb',
            'filter.lwb',
            'filter.aircooled',
            'filter.auto_trans',
            'filter.model_number',
            'filter.transmission',
            'filter.keyword',

            'filter.listing_exterior_color',
            'filter.listing_interior_color',
            'filter.vin',
            'filter.listing_transmission',
            'filter.listing_engine_size',
            'filter.listing_body_type',
            'filter.listing_drivetrain',
            'filter.cond',
            'filter.seller_type',
            'filter.listing_age_from',
            'filter.listing_age_to',
            'filter.pcf_msrp_from',
            'filter.pcf_msrp_to',
            'filter.pcf_id',
            'filter.pcf_body_type',
            'filter.pcf_listing_age_from',
            'filter.pcf_listing_age_to',
            'filter.bsf_msrp_from',
            'filter.bsf_msrp_to',
            //'filter.bsf_model_year_from',
            //'filter.bsf_model_year_to',
            'filter.bsf_model_detail',
            'filter.bsf_exterior',
            'filter.bsf_interior',
            'filter.bsf_production_month_from',
            'filter.bsf_production_month_to',
            'filter.listing_sold_status',
            'filter.bsf_options',
        ], doSearch));
        $scope.auto_trans = [
            {label: 'All', value: ''},
            {label: 'Sportomatic', value: 'Sportomatic'},
            {label: 'Tiptronic', value: 'tiptronic'},
            {label: 'PDK', value: 'pdk'}
        ];
        $scope.transmissions = [
            {label: 'All', value: ''},
            {label: 'Auto', value: 'Auto'},
            {label: 'Manual', value: 'Manual'}
        ];
        $scope.cond = [
            {label: 'All', value: ''},
            {label: 'New', value: 'New'},
            {label: 'Used', value: 'Used'}
        ];
        $scope.seller_type = [
            {label: 'All', value: ''},
            {label: 'Private Party', value: 'Private Party'},
            {label: 'Dealership', value: 'Dealership'}
        ];
        $scope.drivetrain = [
            {label: 'All', value: ''},
            {label: '2WD', value: '2WD'},
            {label: '4WD', value: '4WD'}
        ];
        $scope.sold_status = [
            {label: 'All Vehicles', value: ''},
            {label: 'Currently For Sale', value:'0'},
            {label: 'Not Currently for Sale', value:'1'}
        ];

        //$scope.filter.listing_sold_status= $scope.sold_status[1];

        $scope.states = [
            {label: 'All', value: ''},
            {label: 'Alabama' , value: 'AL'},
            {label: 'Alaska'	, value: 'AK'},
            {label: 'Arizona'	, value: 'AZ'},
            {label: 'Arkansas'	, value: 'AR'},
            {label: 'California'	, value: 'CA'},
            {label: 'Colorado'	, value: 'CO'},
            {label: 'Connecticut'	, value: 'CT'},
            {label: 'Delaware'	, value: 'DE'},
            {label: 'Florida'	, value: 'FL'},
            {label: 'Georgia'	, value: 'GA'},
            {label: 'Hawaii'	, value: 'HI'},
            {label: 'Idaho'	, value: 'ID'},
            {label: 'Illinois'	, value: 'IL'},
            {label: 'Indiana'	, value: 'IN'},
            {label: 'Iowa'	, value: 'IA'},
            {label: 'Kansas'	, value: 'KS'},
            {label: 'Kentucky'	, value: 'KY'},
            {label: 'Louisiana'	, value: 'LA'},
            {label: 'Maine'	, value: 'ME'},
            {label: 'Maryland'	, value: 'MD'},
            {label: 'Massachusetts'	, value: 'MA'},
            {label: 'Michigan'	, value: 'MI'},
            {label: 'Minnesota'	, value: 'MN'},
            {label: 'Mississippi'	, value: 'MS'},
            {label: 'Missouri'	, value: 'MO'},
            {label: 'Montana'	, value: 'MT'},
            {label: 'Nebraska'	, value: 'NE'},
            {label: 'Nevada'	, value: 'NV'},
            {label: 'New Hampshire'	, value: 'NH'},
            {label: 'New Jersey'	, value: 'NJ'},
            {label: 'New Mexico'	, value: 'NM'},
            {label: 'New York'	, value: 'NY'},
            {label: 'North Carolina'	, value: 'NC'},
            {label: 'North Dakota'	, value: 'ND'},
            {label: 'Ohio'	, value: 'OH'},
            {label: 'Oklahoma'	, value: 'OK'},
            {label: 'Oregon'	, value: 'OR'},
            {label: 'Pennsylvania'	, value: 'PA'},
            {label: 'Rhode Island'	, value: 'RI'},
            {label: 'South Carolina'	, value: 'SC'},
            {label: 'South Dakota'	, value: 'SD'},
            {label: 'Tennessee'	, value: 'TN'},
            {label: 'Texas'	, value: 'TX'},
            {label: 'Utah'	, value: 'UT'},
            {label: 'Vermont'	, value: 'VT'},
            {label: 'Virginia'	, value: 'VA'},
            {label: 'Washington'	, value: 'WA'},
            {label: 'West Virginia'	, value: 'WV'},
            {label: 'Wisconsin'	, value: 'WI'},
            {label: 'Wyoming'	, value: 'WY'},
            {label: 'District of Columbia', value: 'DC'}
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

        function loadEngines() {
            Engines.query({}, function(engines){
                $scope.engines = [];
                for ( var index = 0; index<engines.length; index++){
                    var temp= {};
                    temp['label'] = engines[index]['name'];
                    temp['value'] = engines[index]['name'];
                    $scope.engines.push(temp);
                }
            }, function(err){
                $rootScope.handleErrors($scope, err);
            });
        }

        function loadPcfbodies() {
            Pcfbodies.query({}, function(pcfbodies){
                $scope.pcfbodies = [];
                $scope.pcfbodies.push({'label':'All','value':''});

                for ( var index = 0; index<pcfbodies.length; index++){
                    var temp= {};
                    temp['label'] = pcfbodies[index]['body_type'];
                    temp['value'] = pcfbodies[index]['body_type'];
                    $scope.pcfbodies.push(temp);
                }
            }, function(err){
                $rootScope.handleErrors($scope, err);
            });
        }

        function loadModelNumbers() {
            Vins.query({}, function(vins){
                $scope.model_numbers = [];
                $scope.model_numbers.push({'label':'All','value':''});

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

            if ( filter.listing_date.startDate.format == null ){
                filter.listing_date_start = '';
            }else{
                filter.listing_date_start = filter.listing_date.startDate.format($scope.opts.locale.format);
            }

            if ( filter.listing_date.endDate.format == null ){
                filter.listing_date_end = '';
            }else{
                filter.listing_date_end = filter.listing_date.endDate.format($scope.opts.locale.format);
            }

            if ( typeof(filter.listing_sold_status) === 'object' ) {
                filter.listing_sold_status = filter.listing_sold_status.value;
            }
            if ( typeof(filter.state) === 'object' ) filter.state = filter.state.value;
            if ( typeof(filter.auto_trans) === 'object' ) filter.auto_trans = filter.auto_trans.value;
            if ( typeof(filter.cond) === 'object' ) filter.cond = filter.cond.value;
            if ( typeof(filter.seller_type) === 'object' ) filter.seller_type = filter.seller_type.value;
            if ( typeof(filter.listing_transmission) === 'object' ) filter.listing_transmission = filter.listing_transmission.value;
            if ( typeof(filter.listing_drivetrain) === 'object' ) filter.listing_drivetrain = filter.listing_drivetrain.value;
            if ( typeof(filter.model_number) === 'object' ) filter.model_number = filter.model_number.value;
            if ( typeof(filter.pcf_body_type) === 'object' ) filter.pcf_body_type = filter.pcf_body_type.value;
            if (filter.year_from == 1955 && filter.year_to == 2019){
                filter.year_from = '';
                filter.year_to = '';
            }
            if ( filter.bsf_model_year_from == 1955 && filter.bsf_model_year_to == 2019 ){
                filter.bsf_model_year_from = '';
                filter.bsf_model_year_to = '';
            }

            Offer.query(filter, {}, function (offers) {
                $rootScope.isLoading = false;
                var data = [];
                $rootScope.$next_list = {};

                if (offers.results.length == 0 && filter.keyword.length == 17){

                    BSLookup.save({}, {id:filter.keyword}, function (offers) {
                        $rootScope.isLoading = false;
                        $scope.bShowActive = false;
                        $scope.bShowInactive = false;
                        if ( offers.data == null ) return;
                        data.push({
                            'ID': offers['data'][0].id,
                            'listing_title': offers['data'][0].listing_title,
                            'mileage': offers['data'][0].mileage != null ?offers['data'][0].mileage.toLocaleString() : '',
                            'price': offers['data'][0].price != 0 && offers['data'][0].price != null ? '$' + (offers['data'][0].price.toLocaleString()) : '',
                            'city': offers['data'][0].city,
                            'state': offers['data'][0].state,
                            'vin_code': offers['data'][0].vin_code,
                            'listing_make': offers['data'][0].listing_make,
                            'listing_model': offers['data'][0].listing_model,
                            'listing_trim': offers['data'][0].listing_trim,
                            'listing_date': offers['data'][0].listing_date != null? offers['data'][0].listing_date.slice(0, 10):'',
                            'pcf__vid': offers['data'][0].pcf.vid,
                            'cond': offers['data'][0].cond,
                            'listing_year': offers['data'][0].listing_year,
                            'listing_exterior_color': offers['data'][0].listing_exterior_color,
                            'listing_interior_color': offers['data'][0].listing_interior_color,
                            'listing_transmission': offers['data'][0].listing_transmission,
                            'listing_engine_size': offers['data'][0].listing_engine_size,
                            'listing_drivetrain': offers['data'][0].listing_drivetrain,
                            'vin__msrp': offers['data'][0].vin != null && offers['data'][0].vin.msrp != null ? '$' + (offers['data'][0].vin.msrp.toLocaleString()) : '',
                            'vin__model_year': offers['data'][0].vin != null ? offers['data'][0].vin.model_year : '',
                            'vin__model_detail': offers['data'][0].vin != null ? offers['data'][0].vin.model_detail : '',
                            'vin__color': offers['data'][0].vin != null ? offers['data'][0].vin.color : '',
                            'vin__interior': offers['data'][0].vin != null ? offers['data'][0].vin.interior : '',
                            'vin__production_month': offers['data'][0].vin != null ? offers['data'][0].vin.production_month : '',
                            'vin__warranty_start': offers['data'][0].vin != null ? offers['data'][0].vin.warranty_start : '',
                            'pcf__model_number': offers['data'][0].pcf.model_number,
                            'pcf__gap_to_msrp': offers['data'][0].pcf.gap_to_msrp != null && offers['data'][0].pcf.gap_to_msrp != 0 ? offers['data'][0].pcf.gap_to_msrp + '%' : '',
                            'pcf__pts': offers['data'][0].pcf.pts == 0 ? 'No' : 'Yes',
                            'pcf__lwb_seats': offers['data'][0].pcf.lwb_seats == 0 ? 'No' : 'Yes',
                            'pcf__longhood': offers['data'][0].pcf.longhood == 0 ? 'No' : 'Yes',
                            'pcf__widebody': offers['data'][0].pcf.widebody == 0 ? 'No' : 'Yes',
                            'pcf__pccb': offers['data'][0].pcf.pccb == 0 ? 'No' : 'Yes',
                            'pcf__air_cooled': offers['data'][0].pcf.air_cooled == 0 ? 'No' : 'Yes',
                            'pcf__listing_age': offers['data'][0].pcf.listing_age + ' days',
                            'pcf__body_type': offers['data'][0].pcf.body_type,
                            'pcf__auto_trans': offers['data'][0].pcf.auto_trans
                        });

                        $rootScope.$dataSource = data;
                        if (data.length == 1){
                            $timeout(function(){
                               $state.go("normal.detail", {vin:data[0].pcf__vid});
                            }, 2000);
                        }
                    }, function(err){
                        $rootScope.isLoading = false;
                        $rootScope.handleErrors($scope,err);
                    });
                }else {
                    for (var i = 0; i < offers.results.length; i++) {
                        var record = {};
                        if (i < offers.results.length - 1)
                            $rootScope.$next_list[offers.results[i].pcf.vid] = offers.results[i + 1].pcf.vid;

                        data.push({
                            'ID': offers.results[i].id,
                            'listing_title': offers.results[i].listing_title,
                            'mileage': offers.results[i].mileage != null ? offers.results[i].mileage.toLocaleString() : '',
                            'price': offers.results[i].price != 0 && offers.results[i].price != null ? '$' + (offers.results[i].price.toLocaleString()) : '',
                            'city': offers.results[i].city,
                            'state': offers.results[i].state,
                            'vin_code': offers.results[i].vin_code,
                            'listing_make': offers.results[i].listing_make,
                            'listing_model': offers.results[i].listing_model,
                            'listing_trim': offers.results[i].listing_trim,
                            'listing_date': offers.results[i].listing_date != null? offers.results[i].listing_date.slice(0, 10):'',
                            'pcf__vid': offers.results[i].pcf.vid,
                            'cond': offers.results[i].cond,
                            'listing_year': offers.results[i].listing_year,
                            'listing_exterior_color': offers.results[i].listing_exterior_color,
                            'listing_interior_color': offers.results[i].listing_interior_color,
                            'listing_transmission': offers.results[i].listing_transmission,
                            'listing_engine_size': offers.results[i].listing_engine_size,
                            'listing_drivetrain': offers.results[i].listing_drivetrain,
                            'vin__msrp': offers.results[i].vin != null && offers.results[i].vin.msrp != null ? '$' + (offers.results[i].vin.msrp.toLocaleString()) : '',
                            'vin__model_year': offers.results[i].vin != null ? offers.results[i].vin.model_year : '',
                            'vin__model_detail': offers.results[i].vin != null ? offers.results[i].vin.model_detail : '',
                            'vin__color': offers.results[i].vin != null ? offers.results[i].vin.color : '',
                            'vin__interior': offers.results[i].vin != null ? offers.results[i].vin.interior : '',
                            'vin__production_month': offers.results[i].vin != null ? offers.results[i].vin.production_month : '',
                            'vin__warranty_start': offers.results[i].vin != null ? offers.results[i].vin.warranty_start : '',
                            'pcf__model_number': offers.results[i].pcf.model_number,
                            'pcf__gap_to_msrp': offers.results[i].pcf.gap_to_msrp != null &&  offers.results[i].pcf.gap_to_msrp != 0? offers.results[i].pcf.gap_to_msrp + '%' : '',
                            'pcf__pts': offers.results[i].pcf.pts == 0 ? 'No' : 'Yes',
                            'pcf__lwb_seats': offers.results[i].pcf.lwb_seats == 0 ? 'No' : 'Yes',
                            'pcf__longhood': offers.results[i].pcf.longhood == 0 ? 'No' : 'Yes',
                            'pcf__widebody': offers.results[i].pcf.widebody == 0 ? 'No' : 'Yes',
                            'pcf__pccb': offers.results[i].pcf.pccb == 0 ? 'No' : 'Yes',
                            'pcf__air_cooled': offers.results[i].pcf.air_cooled == 0 ? 'No' : 'Yes',
                            'pcf__listing_age': offers.results[i].pcf.listing_age + ' days',
                            'pcf__body_type': offers.results[i].pcf.body_type,
                            'pcf__auto_trans': offers.results[i].pcf.auto_trans
                        });
                    }

                    $rootScope.$next = offers.next;
                    $rootScope.$prev = offers.previous;
                    $rootScope.$dataSource = data;

                    if (data.length == 1){
                        $timeout(function(){
                           $state.go("normal.detail", {vin:data[0].pcf__vid});
                        }, 2000);
                    }
                }

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
        $scope.doSearch = function(){
            doSearch();
        };
        $scope.getActiveListingByIndex = function(index){
            $rootScope.$detailData = $rootScope.$active[index];
        };
        $scope.getInactiveListingByIndex = function(index){
            $rootScope.$detailData = $rootScope.$inactive[index];
        };
        $scope.setCollaspe = function(){
            $scope.bShowMenu = !$scope.bShowMenu;
            if ($scope.bShowMenu) {
                $('.al-main').css('padding-left', '300px');
            } else {
                $('.al-main').css('padding-left', '0px');
            }
        };
        $scope.setListingCollapse = function(){
            $scope.bShowListing = !$scope.bShowListing;
        };
        $scope.setPCFCollapse = function(){
            $scope.bShowPCF = !$scope.bShowPCF;
        };
        $scope.setBSFCollapse = function(){
            $scope.bShowBSF = !$scope.bShowBSF;
        };
        $scope.$watch('filter.year_from', function (newValue1, oldValue1){
            console.log('1');
        });
        loadModelNumbers();
        loadOffers();
        loadEngines();
        loadPcfbodies();
    }
})();