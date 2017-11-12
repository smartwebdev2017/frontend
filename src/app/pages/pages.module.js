(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'ngTouch',
    'ui.grid',
    'ui.grid.moveColumns',
    'ui.grid.cellNav',
    'ui.grid.pinning',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    //'BlurAdmin.pages.dashboard',
    'ngResource',
    'ngStorage',

    'BlurAdmin.pages._common',
    'BlurAdmin.pages.ui',
    //'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.normal',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.search',
    'BlurAdmin.pages.services',
    'BlurAdmin.pages.config',
    'BlurAdmin.pages.main',

    'BlurAdmin.pages.authSignIn'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    $urlRouterProvider
      .when('', '/normal/search');
  }

})();
