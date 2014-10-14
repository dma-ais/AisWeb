'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('dashboardApp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.chart',
    'openlayers-directive',
    'dashboardApp.aisview',
    'dashboardApp.aisstore',
    'dashboardApp.aisabnormal',
    'dashboardApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

app.controller("DashboardCtrl", ['$scope', function ($scope) {
    $scope.views = [
        {name: 'AisStore', url: 'aisstore/aisstore.html'},
        {name: 'AisView', url: 'aisview/aisview.html'},
        {name: 'AisAbnormal', url: 'aisabnormal/aisabnormal.html'}
    ];
}]);
