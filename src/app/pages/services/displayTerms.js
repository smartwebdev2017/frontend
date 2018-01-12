angular.module('pcarfinder.pages.services')
    .factory('DisplayOptions', ['$localStorage', function($localStorage){
        'use strict';

        var defaults = {
            title: true,
            mileage: true,
            price: true,
            city: false,
            state: true,
            vin: false,
            make: false,
            model: false,
            trim: false,
            date: false,
            condition: false,
            pcf: false,
            listing_year: false,
            listing_exterior: false,
            listing_interior: false,
            transmission: true,
            engine: false,
            drivetrain: false,
            msrp: true,
            bs_year: false,
            bs_model: false,
            bs_exterior: false,
            bs_interior: false,
            production_month: false,
            warranty_start: false,
            model_number: true,
            price_msrp: true,
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

        self.resetDisplayColumns = resetDisplayColumns;

        return self;

        function persist(){
            var displayColums = $localStorage.colums;
            if (displayColums){
                return displayColums;
            } else {
                $localStorage.colums = angular.copy(defaults);
                return $localStorage.colums;
            }
        }

        function resetDisplayColumns() {
            self.colums = angular.copy(defaults);
            $localStorage.colums = angular.copy(defaults);
        }
    }]);