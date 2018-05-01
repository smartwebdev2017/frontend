(function () {
  'use strict';

  angular.module('pcarfinder.theme')
      .constant("moment", moment)
      .constant("_", _)
      .run(runBlock);

  /** @ngInject */
  function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings) {
    var whatToWait = [
      //preloader.loadAmCharts(),
      $timeout(3000)
    ];

    var theme = themeLayoutSettings;
    if (theme.blur) {
      if (theme.mobile) {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
      }
    }

    //$q.all(whatToWait).then(function () {
    //  $rootScope.$pageFinishedLoading = true;
    //});
    //
    //$timeout(function () {
    //  if (!$rootScope.$pageFinishedLoading) {
    //    $rootScope.$pageFinishedLoading = true;
    //  }
    //}, 7000);

    $rootScope.$baSidebarService = baSidebarService;
  }

  function runBlock($location, $rootScope, $window, $document, $timeout, $state, toastr, CFG, $localStorage, SearchOptions, MobileDisplayOptions, DesktopDisplayOptions){

    $rootScope.isLogined = function(){
      return !!localStorage.getItem(CFG.auth.localStorageName);
    };
    $rootScope.reset = function(){
        if ($window.innerWidth < 480) {
          SearchOptions.resetFacets(MobileDisplayOptions);
        }else{
          SearchOptions.resetFacets(DesktopDisplayOptions);
        }

        $window.location.href = 'http://localhost:3000';
        //$window.location.reload();
    };

    $rootScope.clearFilter = function(){
        if ($window.innerWidth < 480) {
          SearchOptions.resetFacets(MobileDisplayOptions);
        }else{
          SearchOptions.resetFacets(DesktopDisplayOptions);
        }
        $window.location.href = 'http://localhost:3000';
    };
    $rootScope.showNotify = function(title, msg, type){

      var settings = {};

      if (typeof(title) === 'object') {
        settings = angular.extend(settings, title);
        type = title.type || 'error';
      } else if (typeof(title) === 'string'){
        settings = angular.extend(settings, {
          title: title,
          msg: msg
        });
        if (angular.isString(settings.msg)){
          toasty[type](settings);
        }else{
          toasty.error('Have problem from our system. please take a picture and send to support');
        }
      }
    };

    $rootScope.handleErrors = function($scope, err){
      $scope.$applyAsync(function(){
        $scope.isUpdating = false;
        $rootScope.isLoading = false;
      });

      if (err){
        switch (err.status){
          case 403:
          {
            if ($scope.showPop === true){
              var msg = '';
              if (angular.isObject(err.data.errors)){
                var flat = _.flatten(_.map(err.data.errors, _.values));
                msg = flat.join(" and ");
                $scope = false
              }
              $rootScope.showNotify('Error', msg, 'error');
            }
            localStorage.setItem(CFG.auth.localStorageNameRedirect, $location.url());

            Auth.logout();
            $location.path('/Login');
          }
            break;

          case 409:
          {
            if (err.data & err.data.errors){
              var dlg_title = err.data.errors_title || "Error";
              var dlg_type = err.data.errors_type || "error";

              $document.duScrollTop(0, 500).then(function() {
                var msg = '';
                if (angular.isObject(err.data.errors)) {
                  var flat = _.flatten(_.map(err.data.errors, _.values));
                  msg = flat.join(" and ");
                }
                $rootScope.showNotify(dlg_title, msg, dlg_type);
              });

              $scope.$applyAsync(function () {
                $scope.errors = err.data.errors;
              });
            } else {
              $rootScope.showNotify('Error', err);
            }
          }
        }
      }
    }

  }
})();