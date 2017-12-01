
angular.module('BlurAdmin.pages.services')
    .factory('SearchOptions', ['$localStorage', function($localStorage){
        'use strict';

        var options = {
            year:{
                start:1955,
                end:2019,
                step:1
            },
            price:{
                start: 10000,
                end:300000,
                step:1000
            },
            mileage:{
                start: 0,
                end:200000,
                step:1000
            },
            listing_age:{
                start:-1,
                end:31,
                step:1
            },
            pcf_msrp: {
                start:0,
                end:100,
                step:1
            }
        };

        var defaults = {
            model:'',
            title:'',
            city:'',
            state:'',
            //price_from:options.price.start,
            //price_to:options.price.end,
            //mileage_from:options.mileage.start,
            //mileage_to:options.mileage.end,
            year_from:options.year.start,
            year_to:options.year.end,
            description:'',
            longhood:'',
            widebody:'',
            pts:'',
            pccb:'',
            lwb:'',
            aircooled:'',
            auto_trans:'',
            model_number:'',
            keyword:'',
            sort:'',
            direction:'',
            listing_year:'',
            listing_age_from:options.listing_age.start,
            listing_age_to:options.listing_age.end,
            //pcf_msrp_from:options.pcf_msrp.start,
            //pcf_msrp_to:options.pcf_msrp.end,
            pcf_listing_age_from:options.listing_age.start,
            pcf_listing_age_to:options.listing_age.end,
            //bsf_msrp_from:options.price.start,
            //bsf_msrp_to:options.price.end,
            bsf_model_year_from:options.year.start,
            bsf_model_year_to:options.year.end,
            bsf_production_month_from:'',
            bsf_production_month_to:'',
            listing_date : '',
        };

        var self = this;
        self.filter = persist();
        self.options = options;
        self.reset = reset;

        return self;

        function persist(){
            //var searchInfo = $localStorage.filter;
            //if (searchInfo){
            //    return searchInfo;
            //} else {
                $localStorage.filter = angular.copy(defaults);
                return $localStorage.filter;
            //}
        }

        function reset() {
            self.filter = angular.copy(defaults)
        }
    }]);