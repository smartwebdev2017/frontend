/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.search')
        .controller('SearchPageCtrl', SearchPageCtrl);
    /** @ngInject */
    function SearchPageCtrl($http, $window, $scope, $state, $filter, $rootScope, editableOptions, editableThemes, $timeout, searchTerms) {
        console.log($scope);
        var promise = '';

        $scope.search_car = function(){
            if(promise){
                $timeout.cancel(promise);
            }
            promise = $timeout(function(){
                //$rootScope.keyword = $scope.keyword;
                searchTerms.set('keyword', $scope.keyword);
                $http({
                    method: 'GET',
                    url: '/api/cars' + '?model=' + searchTerms.value['model'] + '&title=' + searchTerms.value['title'] + '&city=' + searchTerms.value['city'] +
                    '&state=' + searchTerms.value['state'] + '&price=' + searchTerms.value['price'] + '&mileage=' + searchTerms.value['mileage'] + '&year=' + searchTerms.value['year'] +
                    '&description=' + searchTerms.value['description'] + '&longhood=' + searchTerms.value['longhood'] + '&widebody=' + searchTerms.value['widebody'] + '&pts=' + searchTerms.value['pts'] +
                    '&pccb=' + searchTerms.value['pccb'] + '&lwb=' + searchTerms.value['lwb'] + '&aircooled=' + searchTerms.value['aircooled'] + '&auto_trans=' + searchTerms.value['auto_trans'] +
                    '&keyword=' + searchTerms.value['keyword'],
                    headers: {'Authorization':'Token' + $window.sessionStorage.user_token}
                })
                    .success(function(response){
                        console.log('Search Done!');
                        $rootScope.$carData =  response;
                        $rootScope.$carData1 =  response;
                    })
                    .error(function(response){
                        console.log('Search Error!');
                    })

            }, 300);
        };
    }
})();
