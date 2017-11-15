angular.module('BlurAdmin.pages.services')
    .factory('DisplayOptions', ['$localStorage', function($localStorage){
        'use strict';

        var colums = {
            title: true,
            mileage: true,
            price: true,
            city: true,
            state: true,
            vin: true,
            make: false,
            model: false,
            trim: false,
            date: false,
            condition: false,
            pcf: false,
            listing_year: false,
            listing_exterior: false,
            listing_interior: false,
            transmission: false,
            engine: false,
            drivetrain: false,
            msrp: false,
            bs_year: false,
            bs_model: false,
            bs_exterior: false,
            bs_interior: false,
            production_month: false,
            warranty_start: false,
            model_number: false,
            price_msrp: false,
            pts: false,
            lwb: false,
            longhood: false,
            widebody: false,
            pccb: false,
            aircooled: false,
            listing_age: false,
            body_type: false,
            auto_trans: false
        };

        var self = this;
        self.colums = persist();

        self.reset = reset;

        return self;

        function persist(){
            var displayColums = $localStorage.colums;
            if (displayColums){
                return displayColums;
            } else {
                $localStorage.colums = angular.copy(colums);
                return $localStorage.colums;
            }
        }

        function reset() {
            self.filter = angular.copy(colums)
        }
    }]);