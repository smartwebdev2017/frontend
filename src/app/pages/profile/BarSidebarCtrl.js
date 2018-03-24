(function () {
    'use strict';

    angular.module('pcarfinder.pages.profile')
        .controller('BarSidebarCtrl', BarSidebarCtrl);

    /** @ngInject */
    function BarSidebarCtrl($http, $timeout,$document, $window, $scope, $rootScope, $filter, $uibModal, $stateParams, OfferDetail, ActiveOfferDetail, InactiveOfferDetail, SearchOptions) {
        $scope.carData = {};
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;

        $scope.bShowMenu = false;
        $scope.bShowActive = false;
        $scope.bShowInactive = false;
        $scope.keywords = $scope.filter.keyword.split(" ");
        $rootScope.isShowPrevNext = false;
        $rootScope.is_mobile = false;
        $rootScope.isGridPageLoaded = false;
        $rootScope.isProfilePageLoaded = true;
        var resizeId;

        if ($window.innerWidth < 760) $rootScope.is_mobile = true;

        $(window).resize(function() {
            if ($rootScope.isProfilePageLoaded) {
                $scope.windowWidth = $(window).width();

                if ($scope.windowWidth < 760) {
                    $rootScope.is_mobile = true;
                } else {
                    $rootScope.is_mobile = false;
                }
                angular.element(function () {
                    updateBar();
                });
            }
        });

        function addCommas(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        function getActiveListings(vin) {
            $rootScope.isLoading = true;
            var filter = angular.copy($scope.filter);

            ActiveOfferDetail.get({id: vin}, function (offers) {
                $rootScope.isLoading = false;
                $rootScope.$active = null;

                if (offers.length > 0) {
                    $scope.bShowActive = true;

                    $rootScope.$active = offers;
                    $rootScope.$detailData = angular.copy(offers[0]);
                    setFormat();
                } else {
                    $scope.bShowActive = false;
                }
            }, function (err) {
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope, err);
            });
        }

        function getInactiveListings(vin) {
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);

            InactiveOfferDetail.get({id: vin}, function (offers) {
                $rootScope.isLoading = false;
                $rootScope.$inactive = null;

                if (offers.length > 0) {
                    $scope.bShowInactive = true;
                    $rootScope.$inactive = offers;

                    if ($rootScope.$active == null) {
                        $rootScope.$detailData = angular.copy(offers[0]);
                    } else {
                        $rootScope.$detailData = angular.copy($rootScope.$active[0]);
                    }
                    setFormat();
                } else {
                    $scope.bShowInactive = false;
                }
            }, function (err) {
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope, err);
            });
        }
        function updateBar(){
            if ($rootScope.is_mobile) {
                $('.al-main').css('padding-left', '0px');
                if ($scope.bShowMenu) {
                    $('.al-detail-sidebar').css('position', 'fixed');
                    $('.al-detail-sidebar').css('width', '150px');
                    $('.al-detail-sidebar').css('bottom', '40px');
                } else {

                }
            } else {
                $('.al-sidebar .al-detail-sidebar').css('position', 'initial');

                if ($scope.bShowMenu) {
                    $('.al-main').css('padding-left', '150px');
                    //$('.btn_container').css('width', 'calc(100vw - 150px)');
                   // $('.btn_container').css('margin-left', '150px');
                } else {
                    $('.btn_container').css('width', '100%');
                    $('.btn_container').css('margin-left', '0px');
                    $('.al-main').css('padding-left', '0px');
                }
            }
        }

        $scope.setCollaspe = function () {
            $scope.bShowMenu = !$scope.bShowMenu;
            updateBar();
        };

        $scope.setActiveCollapse = function () {
            $scope.bShowActive = !$scope.bShowActive;
        };
        $scope.setInactiveCollapse = function () {
            $scope.bShowInactive = !$scope.bShowInactive;
        };
        $scope.getActiveListingByIndex = function (index) {
            $('.history-active-items').removeClass('active');
            $('.history-inactive-items').removeClass('active');
            var elems = document.getElementsByClassName('history-active-items');
            elems[index].className += " active";
            $rootScope.$detailData = angular.copy($rootScope.$active[index]);
            setFormat();
        };
        $scope.getInactiveListingByIndex = function (index) {
            $('.history-active-items').removeClass('active');
            $('.history-inactive-items').removeClass('active');
            var elems = document.getElementsByClassName('history-inactive-items');
            elems[index].className += " active";
            $rootScope.$detailData = angular.copy($rootScope.$inactive[index]);
            setFormat();
        };

        getActiveListings($stateParams.vin);
        getInactiveListings($stateParams.vin);

        angular.element(function(){
            if ( !$rootScope.is_mobile) $scope.setCollaspe();
        });


        function setFormat() {
            $rootScope.$numLimit = 150;
            if ($rootScope.$detailData.price == 0) $rootScope.$detailData.price = '';
            if ($rootScope.$detailData.price != null) $rootScope.$detailData.price = addCommas($rootScope.$detailData.price);
            if ($rootScope.$detailData.mileage == 0) $rootScope.$detailData.mileage = '';
            if ($rootScope.$detailData.mileage != null) $rootScope.$detailData.mileage = addCommas($rootScope.$detailData.mileage);

            if ($rootScope.$detailData.vin != null) {
                if ($rootScope.$detailData.vin.production_month != '') {
                    var prod_month = new Date($rootScope.$detailData.vin.production_month);
                    $rootScope.$detailData.vin.production_month = prod_month.getMonth() < 9 ? prod_month.getFullYear() + '-' + '0' + (prod_month.getMonth() + 1) : prod_month.getFullYear() + '-' + (prod_month.getMonth() + 1);
                }

                if ($rootScope.$detailData.vin.warranty_start != '') {
                    var warranty_start = new Date($rootScope.$detailData.vin.warranty_start);
                    $rootScope.$detailData.vin.warranty_start = warranty_start.getMonth() < 9 ? warranty_start.getFullYear() + '-' + '0' + (warranty_start.getMonth() + 1) + '-' + (warranty_start.getDate()) : warranty_start.getFullYear() + '-' + (warranty_start.getMonth() + 1) + '-' + (warranty_start.getDate());
                }

                $rootScope.$detailData.vin.msrp = addCommas($rootScope.$detailData.vin.msrp);
            }

            if ($('.panel-body-description').length == 1) {
                $('.panel-body-description').css('height', 'auto');
                var original_height = $('.panel-body-description')[0].offsetHeight;
                if (original_height < 212) {
                    $('#btn_more').css('display', 'none');
                    $('#btn_less').css('display', 'none');
                } else {
                    $('#btn_more').css('display', 'block');
                    $('#btn_less').css('display', 'block');
                    $('.panel-body-description').css('height', '212px');
                }
            } else {
                $('.panel-body-description').css('height', '212px');
            }
            if ($rootScope.$detailData.pcf.air_cooled == 0 && $rootScope.$detailData.pcf.auto_trans == "" && $rootScope.$detailData.pcf.body_type == "" &&
                $rootScope.$detailData.pcf.gap_to_msrp == 0 && $rootScope.$detailData.pcf.longhood == 0 &&
                $rootScope.$detailData.pcf.lwb_seats == 0 && $rootScope.$detailData.pcf.model_number == "" && $rootScope.$detailData.pcf.option_code == "" &&
                $rootScope.$detailData.pcf.option_description == "" && $rootScope.$detailData.pcf.pccb == 0 && $rootScope.$detailData.pcf.placeholder == 0 && $rootScope.$detailData.pcf.produced_globally == 0 &&
                $rootScope.$detailData.pcf.produced_usa == 0 && $rootScope.$detailData.pcf.pts == 0 && $rootScope.$detailData.pcf.same_counts == 0) {
                $scope.pcf_is_empty = true;
            } else {
                $scope.pcf_is_empty = false;
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

