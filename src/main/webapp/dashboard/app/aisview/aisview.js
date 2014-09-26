'use strict';

angular.module('dashboardApp.aisview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/aisview', {
    templateUrl: 'aisview/aisview.html',
    controller: 'AisViewCtrl'
  });
}])

.controller('AisViewCtrl', [function() {

}]);