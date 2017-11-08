/**
 * @author a.demeshko
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .filter('plainText', plainText)
    .filter('slice', slice)  ;

  /** @ngInject */
  function plainText() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }

  function slice(){
    return function(str, start, end){
      return str?str.slice(start, end):'';
    }
  }

})();
