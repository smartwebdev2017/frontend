(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

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
