(function () {
  'use strict';

  angular.module('pcarfinder.pages.search', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        /*.state('search', {
          url: '/search',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'SearchPageCtrl',
          title: 'Search',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        })*/.state('main.basic', {
          url: '/basic  ',
          controller: 'SearchPageCtrl',
          templateUrl: 'app/pages/search/basic/tables.html',
          title: 'Search Basic Tables',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('normal.search', {
          views: {
              'baSidebar':{
                controller: 'BaSidebarCtrl',
                templateUrl: 'app/theme/components/baSidebar/ba-sidebar.html',
              },
              'content':{
                controller: 'SearchPageCtrl',
                templateUrl: 'app/pages/search/smart/tables.html',
                title: 'Search Smart Tables',
              }
          },
          url: '/search',
        });
    //$urlRouterProvider.when('/search','/search/basic');
  }

})();
