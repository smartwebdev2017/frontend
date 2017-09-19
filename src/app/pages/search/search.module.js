/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.search', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('search', {
          url: '/search',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'SearchPageCtrl',
          title: 'Search',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        }).state('search.basic', {
          url: '/basic',
          controller: 'SearchPageCtrl',
          templateUrl: 'app/pages/search/basic/tables.html',
          title: 'Search Basic Tables',
          sidebarMeta: {
            order: 0,
          },
        }).state('search.smart', {
          url: '/smart',
          controller: 'SearchPageCtrl',
          templateUrl: 'app/pages/search/smart/tables.html',
          title: 'Search Smart Tables',
          sidebarMeta: {
            order: 100,
          },
        });
    $urlRouterProvider.when('/search','/search/basic');
  }

})();
