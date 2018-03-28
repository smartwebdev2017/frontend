(function () {
    'use strict';

    angular.module('pcarfinder.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($scope, $rootScope, $filter, $window, $location, uiGridConstants, $timeout, $state, $stateParams, CFG, BSLookup, Offer, ActiveOfferDetail, Cities, States, Vins, Engines, Pcfbodies, SearchOptions){

        var listing_year_slider = $('.listing_year_slider');
        var off=[];
        var qTimer;
        $scope.filter = {};

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

        $scope.initialPage = function() {
            $scope.opts = {
                locale: {
                    format: 'YYYY-MM-DD'
                }
            };

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

            $scope.main_width = 40;
            $scope.offer = {};
            $scope.oldFilter = null;
            //$scope.filter = SearchOptions.filter;
            $scope.filter['listing_date']= SearchOptions.filter['listing_date'];
            $scope.filter['model'] = $location.search().model != undefined ? $location.search().model : SearchOptions.filter['model'];
            $scope.filter['title'] = $location.search().title != undefined ? $location.search().title : SearchOptions.filter['title'];
            $scope.filter['city'] = $location.search().city != undefined ? $location.search().city : SearchOptions.filter['city'];
            if ($location.search().state != undefined) {
                for (var i = 0; i < $scope.states.length; i++) {
                    if ($scope.states[i].value == $location.search().state){
                        $scope.filter['state']  = $scope.states[i];
                        break;
                    }
                }
            }

            $scope.filter['year_from'] = $location.search().year_from != undefined?$location.search().year_from:SearchOptions.filter['year_from'];
            $scope.filter['year_to'] = $location.search().year_to != undefined?$location.search().year_to:SearchOptions.filter['year_to'];
            $scope.filter['description'] = $location.search().description != undefined?$location.search().description:SearchOptions.filter['description'];
            if ($location.search().cond != undefined) {
                for (var i = 0; i < $scope.cond.length; i++) {
                    if ($scope.cond[i].value == $location.search().cond){
                        $scope.filter['cond']  = $scope.cond[i];
                        break;
                    }
                }
            }

            if ($location.search().seller_type != undefined) {
                for (var i = 0; i < $scope.seller_type.length; i++) {
                    if ($scope.seller_type[i].value == $location.search().seller_type){
                        $scope.filter['seller_type']  = $scope.seller_type[i];
                        break;
                    }
                }
            }

            if ($location.search().listing_transmission != undefined) {
                for (var i = 0; i < $scope.transmissions.length; i++) {
                    if ($scope.transmissions[i].value == $location.search().listing_transmission){
                        $scope.filter['listing_transmission']  = $scope.transmissions[i];
                        break;
                    }
                }
            }

            if ($location.search().listing_drivetrain != undefined) {
                for (var i = 0; i < $scope.drivetrain.length; i++) {
                    if ($scope.drivetrain[i].value == $location.search().listing_drivetrain){
                        $scope.filter['listing_drivetrain']  = $scope.drivetrain[i];
                        break;
                    }
                }
            }

            if ($location.search().listing_sold_status != undefined) {
                for (var i = 0; i < $scope.sold_status.length; i++) {
                    if ($scope.sold_status[i].value == $location.search().listing_sold_status){
                        $scope.filter['listing_sold_status']  = $scope.sold_status[i];
                        break;
                    }
                }
            }

            if ($location.search().listing_sold_status != undefined) {
                for (var i = 0; i < $scope.sold_status.length; i++) {
                    if ($scope.sold_status[i].value == $location.search().listing_sold_status){
                        $scope.filter['listing_sold_status']  = $scope.sold_status[i];
                        break;
                    }
                }
            }

            if ($location.search().model_number != undefined) {
                $scope.filter['model_number']  = {'label':$location.search().model_number, 'value':$location.search().model_number}
            }

            if ($location.search().pcf_body_type != undefined) {
                $scope.filter['pcf_body_type']  = {'label':$location.search().pcf_body_type, 'value':$location.search().pcf_body_type}
            }

            if ($location.search().auto_trans != undefined) {
                $scope.filter['auto_trans']  = {'label':$location.search().auto_trans, 'value':$location.search().auto_trans}
            }
            //$scope.filter['cond']  = $location.search().cond != undefined?$location.search().cond:SearchOptions.filter['cond'];
            //$scope.filter['seller_type']  = $location.search().seller_type != undefined?$location.search().seller_type:SearchOptions.filter['seller_type'];
            if ($location.search().widebody == undefined || $location.search().widebody != '1'){
                $scope.filter['widebody'] = false;
            } else {
                $scope.filter['widebody'] = true;
            }

            if ($location.search().longhood == undefined || $location.search().longhood != '1'){
                $scope.filter['longhood'] = false;
            } else {
                $scope.filter['longhood'] = true;
            }

            if ($location.search().pts == undefined || $location.search().pts != '1'){
                $scope.filter['pts'] = false;
            } else {
                $scope.filter['pts'] = true;
            }

            if ($location.search().pccb == undefined || $location.search().pccb != '1'){
                $scope.filter['pccb'] = false;
            } else {
                $scope.filter['pccb'] = true;
            }

            if ($location.search().lwb == undefined || $location.search().lwb != '1'){
                $scope.filter['lwb'] = false;
            } else {
                $scope.filter['lwb'] = true;
            }

            if ($location.search().aircooled == undefined || $location.search().aircooled != '1'){
                $scope.filter['aircooled'] = false;
            } else {
                $scope.filter['aircooled'] = true;
            }
            //$scope.filter['lwb'] = $location.search().lwb != undefined?$location.search().lwb:SearchOptions.filter['lwb'];
            //$scope.filter['aircooled'] = $location.search().aircooled != undefined?$location.search().aircooled:SearchOptions.filter['aircooled'];
            //$scope.filter['auto_trans']  = $location.search().auto_trans != undefined?$location.search().auto_trans:SearchOptions.filter['auto_trans'];

            //$scope.filter['listing_drivetrain']  = $location.search().listing_drivetrain != undefined?$location.search().listing_drivetrain:SearchOptions.filter['listing_drivetrain'];
            //$scope.filter['listing_sold_status']  = $location.search().listing_sold_status != undefined?$location.search().listing_sold_status:SearchOptions.filter['listing_sold_status'];
            $scope.filter['listing_exterior_color'] = $location.search().listing_exterior_color != undefined?$location.search().listing_exterior_color:SearchOptions.filter['listing_exterior_color'];
            $scope.filter['listing_interior_color'] = $location.search().listing_interior_color != undefined?$location.search().listing_interior_color:SearchOptions.filter['listing_interior_color'];
            $scope.filter['listing_engine_size'] = $location.search().listing_engine_size != undefined?$location.search().listing_engine_size:SearchOptions.filter['listing_engine_size'];
            $scope.filter['mileage_from'] = $location.search().mileage_from != undefined?$location.search().mileage_from:SearchOptions.filter['mileage_from'];
            $scope.filter['mileage_to'] = $location.search().mileage_to != undefined?$location.search().mileage_to:SearchOptions.filter['mileage_to'];
            $scope.filter['price_from'] = $location.search().price_from != undefined?$location.search().price_from:SearchOptions.filter['price_from'];
            $scope.filter['price_to'] = $location.search().price_to != undefined?$location.search().price_to:SearchOptions.filter['price_to'];
            //$scope.filter['model_number'] = $location.search().model_number != undefined?$location.search().model_number:SearchOptions.filter['model_number'];
            $scope.filter['listing_year'] = $location.search().listing_year != undefined?$location.search().listing_year:SearchOptions.filter['listing_year'];
            //$scope.filter['listing_age_from'] = $location.search().listing_age_from != undefined?$location.search().listing_age_from:SearchOptions.filter['listing_age_from'];
            //$scope.filter['listing_age_to'] = $location.search().listing_age_to != undefined?$location.search().listing_age_to:SearchOptions.filter['listing_age_to'];
            $scope.filter['pcf_listing_age_from'] = $location.search().pcf_listing_age_from != undefined?$location.search().pcf_listing_age_from:SearchOptions.filter['pcf_listing_age_from'];
            $scope.filter['pcf_listing_age_to'] = $location.search().pcf_listing_age_to != undefined?$location.search().pcf_listing_age_to:SearchOptions.filter['pcf_listing_age_to'];
            $scope.filter['pcf_msrp_from'] = $location.search().pcf_msrp_from != undefined?$location.search().pcf_msrp_from:SearchOptions.filter['pcf_msrp_from'];
            $scope.filter['pcf_msrp_to'] = $location.search().pcf_msrp_to != undefined?$location.search().pcf_msrp_to:SearchOptions.filter['pcf_msrp_to'];
            $scope.filter['bsf_model_detail'] = $location.search().bs_model_detail != undefined?$location.search().bs_model_detail:SearchOptions.filter['bsf_model_detail'];
            $scope.filter['bsf_options'] = $location.search().bs_options != undefined?$location.search().bs_options:SearchOptions.filter['bsf_options'];
            $scope.filter['bsf_msrp_from'] = $location.search().bs_msrp_from != undefined?$location.search().bs_msrp_from:SearchOptions.filter['bsf_msrp_from'];
            $scope.filter['bsf_msrp_to'] = $location.search().bs_msrp_to != undefined?$location.search().bs_msrp_to:SearchOptions.filter['bsf_msrp_to'];
            $scope.filter['bsf_interior'] = $location.search().bs_interior != undefined?$location.search().bs_interior:SearchOptions.filter['bsf_interior'];
            $scope.filter['bsf_exterior'] = $location.search().bs_exterior != undefined?$location.search().bs_exterior:SearchOptions.filter['bsf_exterior'];
            $scope.filter['bsf_model_year_from'] = $location.search().bs_model_year_from != undefined?$location.bs_model_year_from().model:SearchOptions.filter['bsf_model_year_from'];
            $scope.filter['bsf_model_year_to'] = $location.search().bs_model_year_to != undefined?$location.search().bs_model_year_to:SearchOptions.filter['bsf_model_year_to'];
            $scope.filter['bsf_production_month_from'] = $location.search().bs_production_month_from != undefined?$location.search().bs_production_month_from:SearchOptions.filter['bsf_production_month_from'];
            $scope.filter['bsf_production_month_to'] = $location.search().bs_production_month_to != undefined?$location.search().bs_production_month_to:SearchOptions.filter['bsf_production_month_to'];
            //$scope.filter['listing_date_start'] = $location.search().listing_date_start != undefined?$location.search().listing_date_start:SearchOptions.filter['listing_date_start'];
            //$scope.filter['listing_date_end'] = $location.search().listing_date_end != undefined?$location.search().listing_date_end:SearchOptions.filter['listing_date_end'];
            //$scope.filter['pcf_body_type'] = $location.search().pcf_body_type != undefined?$location.search().pcf_body_type:SearchOptions.filter['pcf_body_type'];
            $scope.filter['sort'] = $location.search().sort != undefined?$location.search().sort:SearchOptions.filter['sort'];
            $scope.filter['direction'] = $location.search().direction != undefined?$location.search().direction:SearchOptions.filter['direction'];
            $scope.filter['keyword'] = $location.search().keyword != undefined?$location.search().keyword:SearchOptions.filter['keyword'];

            $scope.filterOptions = SearchOptions.options;
            $scope.titleClear = false;

            if ($window.innerWidth < 760) $rootScope.is_mobile = true;

            $scope.load = loadOffers;
            $scope.bShowMenu = false;
            $scope.bShowListing = false;
            $scope.bShowPCF = false;
            $scope.bShowBSF = false;
            $rootScope.isShowPrevNext = true;
            $rootScope.isGridPageLoaded = true;
            $rootScope.isProfilePageLoaded = false;
            //$rootScope.$totalLength = 0;
            $rootScope.is_mobile = false;

            angular.element(function(){
            $('.al-main').css('padding-left', '0px');

                loadModelNumbers();
                loadEngines();
                loadPcfbodies();
            });

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
            $scope.clearIconToggle("title");
            $scope.clearIconToggle("model");
            $scope.clearIconToggle("city");
            $scope.clearIconToggle("price_from");
            $scope.clearIconToggle("price_to");
            $scope.clearIconToggle("mileage_from");
            $scope.clearIconToggle("mileage_to");
            $scope.clearIconToggle("description");
            $scope.clearIconToggle("listing_exterior_color");
            $scope.clearIconToggle("listing_interior_color");
            $scope.clearIconToggle("listing_engine_size");
            //$scope.clearIconToggle("vin");
            $scope.clearIconToggle("bsf_model_detail");
            $scope.clearIconToggle("bsf_msrp_from");
            $scope.clearIconToggle("bsf_msrp_to");
            $scope.clearIconToggle("bsf_exterior");
            $scope.clearIconToggle("bsf_interior");
            $scope.clearIconToggle("bsf_production_month_from");
            $scope.clearIconToggle("bsf_production_month_to");
            $scope.clearIconToggle("bsf_options");
            $scope.clearIconToggle("pcf_listing_age_to");
            $scope.clearIconToggle("pcf_listing_age_from");
            //$scope.clearIconToggle("pcf_id");
            //$scope.clearIconToggle("listing_drivetrain");
            $scope.clearIconToggle("pcf_msrp_from");
            $scope.clearIconToggle("pcf_msrp_to");

        };

        $(window).resize(function() {
            if ($rootScope.isGridPageLoaded) {
                $scope.windowWidth = $(window).width();
                if ($scope.windowWidth < 760) {
                    $rootScope.is_mobile = true;
                } else {
                    $rootScope.is_mobile = false;
                }
                //updateBar();
            }
        });

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
            //$scope.filter = SearchOptions.filter;
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
                var keyword_length = 0;
                var vin_length = 0;

                if ((filter.keyword == undefined) || (filter.keyword == '')) {
                    keyword_length = 0;
                } else {
                    keyword_length = filter.keyword.length;
                }
                if ((filter.vin == undefined) || (filter.vin == '')) {
                    vin_length = 0;
                } else {
                    vin_length = filter.vin.length;
                }

                $rootScope.$next_list = {};
                $rootScope.$totalLength = offers.count.toLocaleString();
                $rootScope.$totalCounts = offers.count;

                if (offers.results.length == 0 && (keyword_length == 17 || vin_length == 17)){
                    var keyword = filter.keyword;
                    if (filter.keyword == '') keyword = filter.vin;

                    BSLookup.save({}, {id:keyword}, function (offers) {
                        $rootScope.isLoading = false;
                        $scope.bShowActive = false;
                        $scope.bShowInactive = false;
                        if ( offers.data == null ) return;
                        data.push({
                            'ID': offers['data'][0].id,
                            'listing_title': offers['data'][0].listing_title,
                            'mileage': offers['data'][0].mileage != null?offers['data'][0].mileage.toLocaleString() : '',
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
                            'vin__production_month': offers['data'][0].vin != null ? offers['data'][0].vin.production_month.slice(0, 7) : '',
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
                            'mileage': offers.results[i].mileage != null && offers.results[i].mileage != 0 ? offers.results[i].mileage.toLocaleString() : '',
                            'price': offers.results[i].price != 0 && offers.results[i].price != null  ? '$' + (offers.results[i].price.toLocaleString()) : '',
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
                            'vin__production_month': offers.results[i].vin != null ? offers.results[i].vin.production_month.slice(0, 7) : '',
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

                    if (offers.next != null) {
                        var lastUrlParams = new URLSearchParams(offers.next);
                        var lastPg = parseInt(offers.count / 11) + 1;
                        lastUrlParams.set('page', lastPg);

                        $rootScope.$last = decodeURIComponent(lastUrlParams.toString());
                    }

                    if (offers.previous != null) {
                        var firstUrlParams = new URLSearchParams(offers.previous);
                        var firstPg = 1;
                        firstUrlParams.set('page', firstPg);
                        $rootScope.$first = decodeURIComponent(firstUrlParams.toString());
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
                //$rootScope.$gridApi.grid.notifyDataChange(uiGridConstants.dataChange.COLUMN);

            }, function(err){
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope,err);
            });
        }

        function doSearch(){
            if ($rootScope.onProfilePage){
                $rootScope.onProfilePage = false;
                return;
            }

            $state.go("normal.search", {
                model:$scope.filter['model'],
                title:$scope.filter['title'],
                city:$scope.filter['city'],
                state:typeof($scope.filter.state) === 'object'?$scope.filter.state.value:'',
                year_from:$scope.filter['year_from']==1955?'':$scope.filter['year_from'],
                year_to:$scope.filter['year_to']==2019?'':$scope.filter['year_to'],
                description:$scope.filter['description'],
                cond:typeof($scope.filter.cond) === 'object'?$scope.filter.cond.value:'',
                seller_type:typeof($scope.filter.seller_type) === 'object'?$scope.filter.seller_type.value:'',
                longhood:$scope.filter['longhood']==true?1:'',
                widebody:$scope.filter['widebody']==true?1:'',
                pts:$scope.filter['pts']==true?1:'',
                pccb:$scope.filter['pccb']==true?1:'',
                lwb:$scope.filter['lwb']==true?1:'',
                aircooled:$scope.filter['aircooled']==true?1:'',
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
                bs_options:$scope.filter['bsf_options'],
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
                sort:$scope.filter['sort'],
                direction:$scope.filter['direction'],
                keyword:$scope.filter['keyword']}, {notify:false});

            if (!$rootScope.isLoading) {
                $scope.offers = [];
                console.log('finished loadding');
                $timeout.cancel(qTimer);

                if ($scope.oldFilter == null){
                    $scope.oldFilter = $scope.filter;
                } else {
                    $scope.filter.page = 1;
                }

                loadOffers()
            }else{
                qTimer = $timeout(function(){
                    console.log('loadding......')
                    doSearch();
                }, 1000);
            }
        }

        $scope.doSearch = function(){
            doSearch();
        };

        function updateBar(){
            if ($rootScope.is_mobile) {
                $('.al-main').css('padding-left', '0px');
                if ($scope.bShowMenu) {
                    $('.aside_content').css('position', 'fixed');
                    $('.aside_content').css('width', '100%');
                    $('.aside_content').css('bottom', '40px');
                    $('.aside_content').css('left', '0px');
                } else {

                }
            } else {
                $('.aside_content').css('position', 'relative');
                $('.aside_content').css('bottom', '0px');
                if ($scope.bShowMenu) {
                    $('.aside_content').css('width', '300px');
                    $('.al-main').css('padding-left', '300px');
                    $('.btn_container').css('width', 'calc(100vw - 300px)');
                    //$('.btn_container').css('margin-left', '300px');
                } else {
                    $('.btn_container').css('width', '100%');
                    $('.btn_container').css('margin-left', '0px');
                    $('.al-main').css('padding-left', '0px');
                }
                $timeout(function(){
                    $(window).trigger('resize');
                });
            }
        }

        $scope.setCollaspe = function(){
            $scope.bShowMenu = !$scope.bShowMenu;
            updateBar();
        };

        $scope.setListingCollapse = function(){
            $scope.bShowListing = !$scope.bShowListing;
            if ($scope.bShowListing && $rootScope.is_mobile){
                $('.listing_container .content').css('height', 'calc(100vh - 230px)');
                $('.listing_container .content').css('overflow', 'scroll');
                $('.listing_container .content').css('background', '#fff');
            }
        };

        $scope.setPCFCollapse = function(){
            $scope.bShowPCF = !$scope.bShowPCF;
            if ($scope.bShowPCF && $rootScope.is_mobile){
                $('.pcf_container .content').css('height', 'calc(100vh - 230px)');
                $('.pcf_container .content').css('overflow', 'scroll');
                $('.pcf_container .content').css('background', '#fff');
            }
        };

        $scope.setBSFCollapse = function(){
            $scope.bShowBSF = !$scope.bShowBSF;
            if ($scope.bShowBSF && $rootScope.is_mobile){
                $('.bsf_container .content').css('height', 'calc(100vh - 230px)');
                $('.bsf_container .content').css('overflow', 'scroll');
                $('.bsf_container .content').css('background', '#fff');
            }
        };

        $scope.initialPage();
    }
})();