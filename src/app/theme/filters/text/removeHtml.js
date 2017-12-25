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
    return function(str){
        if (str != undefined) {
          var regStr = '\<span .*>(.*)\<\/span>';
          var pattern = new RegExp(regStr, "gi");
          str = '' + str;
          var value = pattern.exec(str);
          if (value != null) {
            var h_value = value[1].slice(0, 3) + "-" + value[1].slice(3, 6);
            str = str.replace(value[1], h_value);
            return str;
          }

          return str.slice(0, 3) + "-" + str.slice(3, 6);
        }
    }
  }

})();
