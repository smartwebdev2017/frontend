(function(angular){
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .factory('Email', EmailService);

    function EmailService($resource, CFG){

        var status = $resource(CFG.rest.baseURI + '/api/email/', {}, {
            'send': {method: 'POST'}
        });

        return status;
    }
})(angular);
