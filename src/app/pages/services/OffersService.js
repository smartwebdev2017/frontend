(function(angular){
    'use strict';

    angular.module('pcarfinder.pages.services')
        .factory('Offer', OfferService)
        .factory('OfferDetail', OfferDetailService)
        .factory('BSLookup', BSLookupService)
        .factory('ActiveOfferDetail', ActiveOfferDetailService)
        .factory('InactiveOfferDetail', InactiveOfferDetailService)
        .factory('OfferModal', OfferModalService);

    function OfferService($resource, CFG){

        var Offer = $resource(CFG.rest.baseURI + '/api/cars/:filter/', {filter:'@filter'}, {
            'get':{method: 'GET'},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET'},
            'remove': {method: 'DELETE'}
        });

        return Offer;
    }

    function OfferDetailService($resource, CFG){

        var OfferDetail = $resource(CFG.rest.baseURI + '/api/cars/:id/', {}, {
            'get':{method: 'GET', isArray:true},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET'},
            'remove': {method: 'DELETE'}
        });

        return OfferDetail;
    }

    function ActiveOfferDetailService($resource, CFG){

        var OfferDetail = $resource(CFG.rest.baseURI + '/api/active/:id/', {}, {
            'get':{method: 'GET', isArray:true},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET'},
            'remove': {method: 'DELETE'}
        });

        return OfferDetail;
    }

    function InactiveOfferDetailService($resource, CFG){

        var OfferDetail = $resource(CFG.rest.baseURI + '/api/inactive/:id/', {}, {
            'get':{method: 'GET', isArray:true},
            'create': {method: 'POST'},
            'save': {method: 'PUT'},
            'query': {method: 'GET'},
            'remove': {method: 'DELETE'}
        });

        return OfferDetail;
    }

    function BSLookupService($resource, CFG){

        var BSLookup = $resource(CFG.rest.baseURI + '/api/bsf/', {}, {
            'send': {method: 'POST'}, isArray:false
        });

        return BSLookup;
    }
    function OfferModalService($uibModal){

    }

})(angular);
