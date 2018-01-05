(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($http, $document, $scope, fileReader, $rootScope, $filter, $uibModal, $stateParams, OfferDetail, ActiveOfferDetail, InactiveOfferDetail, SearchOptions) {
        $scope.carData = {};
        $scope.offer = {};
        $scope.filter = SearchOptions.filter;
        $scope.numLimit = 150;
        $scope.bShowMenu = false;
        $scope.bShowActive = false;
        $scope.bShowInactive = false;
        $scope.keywords = $scope.filter.keyword.split(" ");

        $('.al-main').css('padding-left', '0px');

        $scope.readMore = function () {
            $scope.numLimit = 100000;
            $('.panel-body-description').css('height', '');
        };
        $scope.readLess = function () {
            $scope.numLimit = 150;
            $('.panel-body-description').css('height', '212px');
        };
        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/profileModal.html'
            }).result.then(function (link) {
                    item.href = link;
                });
        };
        function addCommas(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        $scope.getCarDetail = function (vin) {
            $rootScope.isLoading = true;

            var filter = angular.copy($scope.filter);
            //filter.page = $scope.page;

            OfferDetail.get({id: vin}, function (offers) {
                $rootScope.isLoading = false;

                $rootScope.$detailData = offers[0];

                if ($rootScope.$detailData.price == 0) $rootScope.$detailData.price = '';
                if ($rootScope.$detailData.price != null) $rootScope.$detailData.price = addCommas($rootScope.$detailData.price);
                if ($rootScope.$detailData.mileage == 0) $rootScope.$detailData.mileage = '';
                if ($rootScope.$detailData.mileage != null) $rootScope.$detailData.mileage = addCommas($rootScope.$detailData.mileage);

                if ($rootScope.$detailData.vin != null) {
                    if ($rootScope.$detailData.vin.production_month != '') {
                        var prod_month = new Date($rootScope.$detailData.vin.production_month);
                        $rootScope.$detailData.vin.production_month = prod_month.getMonth() < 10 ? '0' + prod_month.getMonth() + '-' + prod_month.getFullYear() : prod_month.getMonth() + '-' + prod_month.getFullYear();
                    }

                    $rootScope.$detailData.vin.msrp = addCommas($rootScope.$detailData.vin.msrp);
                }

                if ($('.panel-body-description').length == 1) {
                    $('.panel-body-description').css('height', '');
                    var original_height = $('.panel-body-description')[0].offsetHeight;
                    if (original_height < 212) {
                        $('#btn_more').css('display', 'none');
                        $('#btn_less').css('display', 'none');
                    } else {
                        $('#btn_more').css('display', 'block');
                        $('#btn_less').css('display', 'block');
                        $('.panel-body-description').css('height', '212px');
                    }
                }
                if ($rootScope.$detailData.pcf.air_cooled == 0 && $rootScope.$detailData.pcf.auto_trans == "" && $rootScope.$detailData.pcf.body_type == "" &&
                    $rootScope.$detailData.pcf.gap_to_msrp == 0 && $rootScope.$detailData.pcf.listing_age == 0 && $rootScope.$detailData.pcf.longhood == 0 &&
                    $rootScope.$detailData.pcf.lwb_seats == 0 && $rootScope.$detailData.pcf.model_number == "" && $rootScope.$detailData.pcf.option_code == "" &&
                    $rootScope.$detailData.pcf.option_description == "" && $rootScope.$detailData.pcf.pccb == 0 && $rootScope.$detailData.pcf.placeholder == 0 && $rootScope.$detailData.pcf.produced_globally == 0 &&
                    $rootScope.$detailData.pcf.produced_usa == 0 && $rootScope.$detailData.pcf.pts == 0 && $rootScope.$detailData.pcf.same_counts == 0) {
                    $scope.pcf_is_empty = true;
                } else {
                    $scope.pcf_is_empty = false;
                }

                var active_elems = document.getElementsByClassName('history-active-items');
                var inactive_elems = document.getElementsByClassName('history-inactive-items');

                for (var index = 0; index < active_elems.length; index++) {
                    var id = active_elems[index].id;
                    if (id == $rootScope.$detailData.id) {
                        active_elems[index].className += ' active';
                    }
                }

                for (var index = 0; index < inactive_elems.length; index++) {
                    var id = inactive_elems[index].id;
                    if (id == $rootScope.$detailData.id) {
                        inactive_elems[index].className += ' active';
                    }
                }

            }, function (err) {
                $rootScope.isLoading = false;
                $rootScope.handleErrors($scope, err);
            });
        };
        function getActiveListings(vin) {
            $rootScope.isLoading = true;
            var filter = angular.copy($scope.filter);

            ActiveOfferDetail.get({id: vin}, function (offers) {
                $rootScope.isLoading = false;
                $rootScope.$active = null;

                if (offers.length > 0) {
                    $scope.bShowActive = true;

                    for (var index = 0; index < offers.length; index++) {
                        var i_date = new Date(offers[index]['listing_date']);
                        for (var j = index + 1; j < offers.length; j++) {
                            var j_date = new Date(offers[j]['listing_date']);
                            if (i_date < j_date) {
                                var temp = offers[index];
                                offers[index] = offers[j];
                                offers[j] = temp;
                            }
                        }
                    }
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

                    for (var index = 0; index < offers.length; index++) {
                        var i_date = new Date(offers[index]['listing_date']);
                        for (var j = index + 1; j < offers.length; j++) {
                            var j_date = new Date(offers[j]['listing_date']);
                            if (i_date < j_date) {
                                var temp = offers[index];
                                offers[index] = offers[j];
                                offers[j] = temp;
                            }
                        }
                    }
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

        $scope.setCollaspe = function () {
            $scope.bShowMenu = !$scope.bShowMenu;
            if ($scope.bShowMenu) {
                $('.al-main').css('padding-left', '150px');
            } else {
                $('.al-main').css('padding-left', '0px');
            }
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
        //$scope.getCarDetail($stateParams.vin);
        getActiveListings($stateParams.vin);
        getInactiveListings($stateParams.vin);
        $scope.setCollaspe();

        function setFormat() {
            if ($rootScope.$detailData.price == 0) $rootScope.$detailData.price = '';
            if ($rootScope.$detailData.price != null) $rootScope.$detailData.price = addCommas($rootScope.$detailData.price);
            if ($rootScope.$detailData.mileage == 0) $rootScope.$detailData.mileage = '';
            if ($rootScope.$detailData.mileage != null) $rootScope.$detailData.mileage = addCommas($rootScope.$detailData.mileage);

            if ($rootScope.$detailData.vin != null) {
                if ($rootScope.$detailData.vin.production_month != '') {
                    var prod_month = new Date($rootScope.$detailData.vin.production_month);
                    $rootScope.$detailData.vin.production_month = prod_month.getMonth() < 9 ? '0' + (prod_month.getMonth() + 1) + '-' + prod_month.getFullYear() : (prod_month.getMonth() + 1) + '-' + prod_month.getFullYear();
                }

                $rootScope.$detailData.vin.msrp = addCommas($rootScope.$detailData.vin.msrp);
            }

            if ($('.panel-body-description').length == 1) {
                $('.panel-body-description').css('height', '');
                var original_height = $('.panel-body-description')[0].offsetHeight;
                if (original_height < 212) {
                    $('#btn_more').css('display', 'none');
                    $('#btn_less').css('display', 'none');
                } else {
                    $('#btn_more').css('display', 'block');
                    $('#btn_less').css('display', 'block');
                    $('.panel-body-description').css('height', '212px');
                }
            }
            if ($rootScope.$detailData.pcf.air_cooled == 0 && $rootScope.$detailData.pcf.auto_trans == "" && $rootScope.$detailData.pcf.body_type == "" &&
                $rootScope.$detailData.pcf.gap_to_msrp == 0 && $rootScope.$detailData.pcf.listing_age == 0 && $rootScope.$detailData.pcf.longhood == 0 &&
                $rootScope.$detailData.pcf.lwb_seats == 0 && $rootScope.$detailData.pcf.model_number == "" && $rootScope.$detailData.pcf.option_code == "" &&
                $rootScope.$detailData.pcf.option_description == "" && $rootScope.$detailData.pcf.pccb == 0 && $rootScope.$detailData.pcf.placeholder == 0 && $rootScope.$detailData.pcf.produced_globally == 0 &&
                $rootScope.$detailData.pcf.produced_usa == 0 && $rootScope.$detailData.pcf.pts == 0 && $rootScope.$detailData.pcf.same_counts == 0) {
                $scope.pcf_is_empty = true;
            } else {
                $scope.pcf_is_empty = false;
            }
        }
    }
    angular.module('BlurAdmin.pages.profile')
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

