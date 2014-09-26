'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('dashboardApp', [
  'ngRoute',
  'ui.bootstrap',
  'dashboardApp.aisview',
  'dashboardApp.aisstore',
  'dashboardApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/aisview'});
}]);


