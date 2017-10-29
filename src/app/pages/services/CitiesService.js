(function(angular){
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .factory('Cities', CityService)
        .factory('States', StateService)
        .factory('Vins', VinsService);

    function CityService($resource, CFG){

        var Cities = $resource(CFG.rest.baseURI + '/api/cities',
        {},
        {
            'get':{method: 'GET'},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET', isArray:true},
            'remove': {method: 'DELETE'}
        });

        return Cities;
    }

    function StateService($resource, CFG){

        var States = $resource(CFG.rest.baseURI + '/api/states',
        {},
        {
            'get':{method: 'GET'},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET', isArray:true},
            'remove': {method: 'DELETE'}
        });

        return States;
    }

    function VinsService($resource, CFG) {

        var Vins = $resource(CFG.rest.baseURI + '/api/codes',
            {},
            {
                'get': {method: 'GET'},
                'create': {method: 'POST'},
                'save': {method: 'PUT'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'}
            });

        return Vins;
    }
})(angular);

