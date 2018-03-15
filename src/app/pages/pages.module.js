(function () {
  'use strict';

  angular.module('pcarfinder.pages', [
    'ui.router',
    'ngTouch',
    'ui.grid',
    'ui.grid.moveColumns',
    'ui.grid.cellNav',
    'ui.grid.pinning',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'ui.grid.autoResize',
    //'pcarfinder.pages.dashboard',
    'ngResource',
    'ngStorage',

    'pcarfinder.pages._common',
    //'pcarfinder.pages.ui',
    //'pcarfinder.pages.components',
    'pcarfinder.pages.form',
    'pcarfinder.pages.normal',
    'pcarfinder.pages.profile',
    'pcarfinder.pages.search',
    'pcarfinder.pages.services',
    'pcarfinder.pages.config',
    'pcarfinder.pages.main',

    'pcarfinder.pages.authSignIn'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider
      .when('', '/');
  }

})();
