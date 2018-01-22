angular.module('pcarfinder.pages.services')
    .factory('MobileDisplayOptions', ['$localStorage', '$window',function($localStorage, $window){
        'use strict';

        var defaults = {};
        defaults = {
            title: true,
            mileage: false,
            price: true,
            city: false,
            state: false,
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

        return defaults;
    }]);