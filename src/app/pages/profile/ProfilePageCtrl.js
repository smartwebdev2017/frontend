(function () {
    'use strict';

    angular.module('pcarfinder.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, $rootScope, $window, $state, SearchOptions, $location) {
        $scope.filter = SearchOptions.filter;
        $rootScope.$numLimit = 150;

        $scope.keywords = $scope.filter.keyword.split(" ");
        $rootScope.isShowPrevNext = false;
        $rootScope.onProfilePage = true;
        $scope.filter = SearchOptions.filter;

        $scope.readMore = function () {
            $rootScope.$numLimit = 100000;
            $('.panel-body-description').css('height', 'auto');
        };
        $scope.readLess = function () {
            $rootScope.$numLimit = 150;
            $('.panel-body-description').css('height', '212px');
        };

        angular.element(function(){
            $('.panel-body-description').css('height', '212px');
        });

        $scope.goBack = function() {
            /*var ustr = $location.url();
            var qpos = ustr.indexOf('?');
            if (qpos > -1){
                var pstr = ustr.substring(qpos, ustr.length);
                $window.location.href = "/" + pstr;
            }else{
                $window.location.href = "/";
            }*/
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
                listing_sold_status:typeof($scope.filter.listing_sold_status) === 'object'?$scope.filter.listing_sold_status.value:$scope.filter.listing_sold_status,
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
                keyword:$scope.filter['keyword']}, {notify:true});
        }
        $rootScope.$nextListing = function(){
            if ($rootScope.$next_list) {
                if ($rootScope.$next_list[$rootScope.$detailData.pcf.vid]) {
                    $rootScope.isLastListing = false;
                    //$window.location.href = '/ID/' + $rootScope.$next_list[$rootScope.$detailData.pcf.vid];
                    $state.go("normal.detail", {vin:$rootScope.$next_list[$rootScope.$detailData.pcf.vid]});
                }else {
                    $rootScope.isLastListing = true;
                    $rootScope.nextPage();
                }
            }
        }
        $rootScope.$prevListing = function(){
            if ($rootScope.$prev_list) {
                if ($rootScope.$prev_list[$rootScope.$detailData.pcf.vid]) {
                    $rootScope.isFirstListing = false;
                    //$window.location.href = '/ID/' + $rootScope.$next_list[$rootScope.$detailData.pcf.vid];
                    $state.go("normal.detail", {vin:$rootScope.$prev_list[$rootScope.$detailData.pcf.vid]});
                }else {
                    $rootScope.isFirstListing = true;
                    $rootScope.prevPage();
                }
            }
        }
    }
    angular.module('pcarfinder.pages.profile')
        .filter('highlightWord', function() {
            return function(text, selectedWords) {
                if(selectedWords.length>0) {

                    for (var i = 0; i < selectedWords.length; i++){
                        if (selectedWords[i] == "" ) continue;
                        var regStr = '(?!(?:[^<]+>|[^>]+<\/.*?>))(' + selectedWords[i] + ')';
                        var pattern = new RegExp(regStr, "gi");
                        text = '' + text;
                        var matches = text.match(pattern);
                        text = text.replace(pattern, '<span class="ui-select-highlight">' + selectedWords[i] + '</span>');
                    }

                    return text;
                }
                else {
                    return text;
                }
            };
        });
})();

