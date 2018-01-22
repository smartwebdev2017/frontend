angular.module('pcarfinder.pages.services')
    .factory('DisplayOptions', ['$localStorage', '$window',function($localStorage, $window){
        'use strict';

        var self = this;
        //self.colums = persist();
        self.persist = persist;

        self.resetDisplayColumns = resetDisplayColumns;

        return self;

        function persist(defaults){
            var displayColums = $localStorage.colums;
            if (displayColums){
                return displayColums;
            } else {
                $localStorage.colums = angular.copy(defaults);
                return $localStorage.colums;
            }
        }

        function resetDisplayColumns(defaults) {
            //self.colums = angular.copy(defaults);
            $localStorage.colums = angular.copy(defaults);
        }
    }]);