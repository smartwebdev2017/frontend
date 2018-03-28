(function () {
    'use strict';

    angular.module('pcarfinder.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, $rootScope, $window, $state, SearchOptions, $location) {
        $scope.filter = SearchOptions.filter;
        $rootScope.$numLimit = 150;

        $scope.keywords = $scope.filter.keyword.split(" ");
        $rootScope.isShowPrevNext = false;
        $rootScope.onProfilePage = true;

        $scope.readMore = function () {
            $rootScope.$numLimit = 100000;
            $('.panel-body-description').css('height', 'auto');
        };
        $scope.readLess = function () {
            $rootScope.$numLimit = 150;
            $('.panel-body-description').css('height', '212px');
        };

        angular.element(function(){
            $('.panel-body-description').css('height', '212px');
        });

        $scope.goBack = function() {
            var ustr = $location.url();
            var qpos = ustr.indexOf('?');
            if (qpos > -1){
                var pstr = ustr.substring(qpos, ustr.length);
                $window.location.href = "/" + pstr;
            }else{
                $window.location.href = "/";
            }
        }
        $scope.nextListing = function(){
            if ($rootScope.$next_list) {
                if ($rootScope.$next_list[$rootScope.$detailData.pcf.vid]) {
                    $rootScope.isLastListing = false;
                    //$window.location.href = '/ID/' + $rootScope.$next_list[$rootScope.$detailData.pcf.vid];
                    $state.go("normal.detail", {vin:$rootScope.$next_list[$rootScope.$detailData.pcf.vid]});
                }else {
                    $rootScope.isLastListing = true;
                    $rootScope.nextPage();
                }
            }
        }
    }
    angular.module('pcarfinder.pages.profile')
        .filter('highlightWord', function() {
            return function(text, selectedWords) {
                if(selectedWords.length>0) {

                    for (var i = 0; i < selectedWords.length; i++){
                        if (selectedWords[i] == "" ) continue;
                        var regStr = '(?!(?:[^<]+>|[^>]+<\/.*?>))(' + selectedWords[i] + ')';
                        var pattern = new RegExp(regStr, "gi");
                        text = '' + text;
                        var matches = text.match(pattern);
                        text = text.replace(pattern, '<span class="ui-select-highlight">' + selectedWords[i] + '</span>');
                    }

                    return text;
                }
                else {
                    return text;
                }
            };
        });
})();

