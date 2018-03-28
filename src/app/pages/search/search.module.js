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
          url: '?model&title&city&state&year_from&year_to&description&cond&seller_type&listing_transmission&listing_drivetrain&listing_sold_status&listing_exterior_color&listing_interior_color&listing_engine_size&mileage_from&mileage_to&price_from&price_to&longhood&widebody&pts&pccb&lwb&aircooled&auto_trans&model_number&listing_year&listing_age_from&listing_age_to&pcf_listing_age_from&pcf_listing_age_to&bs_model_year_from&bs_model_year_to&bs_production_month_from&bs_production_month_to&listing_date_start&listing_date_end&bs_model_detail&bs_msrp_from&bs_options&bs_msrp_to&bs_exterior&bs_interior&pcf_msrp_from&pcf_msrp_to&pcf_body_type&keyword&sort&direction',
        });
    //$urlRouterProvider.when('/search','/search/basic');
  }

})();
