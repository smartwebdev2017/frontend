//(function() {
//    'use strict';
//
//    angular.module('BlurAdmin.pages.services')
//        .service('searchTerms', searchTerms);
//
//    /** @ngInject */
//    function searchTerms($window) {
//        var terms = {
//            keyword: ''
//        };
//
//        function set(field,value){
//            terms[field] = value;
//        }
//
//        function get(field){
//            return terms[field];
//        }
//
//        return {
//            set: set,
//            value: terms
//        };
//    }
//
//})();
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
            }
        };

        var defaults = {
            model:'',
            title:'',
            city:'',
            state:'',
            price_from:options.price.start,
            price_to:options.price.end,
            mileage_from:options.mileage.start,
            mileage_to:options.mileage.end,
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
            keyword:''
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