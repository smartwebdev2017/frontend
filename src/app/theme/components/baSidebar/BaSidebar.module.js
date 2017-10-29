/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('normal.offer', {
          url:'/api/cities',
          templateUrl:'app/pages/search/smart/tables.html',
          controller: 'BaSidebarCtrl'
        });
    //$urlRouterProvider.when('/search','/search/basic');
  }

})();
