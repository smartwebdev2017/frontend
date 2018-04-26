
angular.module('pcarfinder.pages.services')
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
            price_from:'',
            price_to:'',
            mileage_from:'',
            mileage_to:'',
            listing_exterior_color:'',
            listing_interior_color:'',
            listing_engine_size:'',
            vin:'',
            bsf_model_detail:'',
            bsf_msrp_from:'',
            bsf_msrp_to:'',
            bsf_exterior:'',
            bsf_interior:'',
            bsf_options:'',
            pcf_id:'',
            listing_drivetrain:'',
            pcf_msrp_from:'',
            pcf_msrp_to:'',
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
            listing_date : {
                startDate:  '',
                endDate:''
            },
            listing_date_start: '',
            listing_date_end:'',
            listing_sold_status:'',
            mobile:1,
            page:1

        };

        var self = this;
        self.filter = persist();
        self.options = options;
        self.resetFacets = resetFacets;

        return self;

        function persist(){
            var searchInfo = $localStorage.filter;
            if (searchInfo){
                return searchInfo;
            } else {
                $localStorage.filter = angular.copy(defaults);
                return $localStorage.filter;
            }
        }

        function resetFacets() {
            self.filter = angular.copy(defaults);
            $localStorage.filter = angular.copy(defaults);
        }
    }]);