(function () {
  'use strict';

  angular.module('pcarfinder.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('normal.detail', {
          views: {
              'baSidebar':{
                controller: 'ProfilePageCtrl',
                templateUrl: 'app/pages/profile/ba-sidebar_listing.html',
              },
              'content':{
                controller: 'ProfilePageCtrl',
                templateUrl: 'app/pages/profile/profile.html',
              }
          },
          url: '/detail/:vin',
          title: 'Detail Information',
        });
  }

})();
