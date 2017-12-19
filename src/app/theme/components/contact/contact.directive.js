(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('contact', contact);

  /** @ngInject */
  function contact() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/contact/page.html',
      controller: 'ContactPageCtrl'
    };
  }

})();