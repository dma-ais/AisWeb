'use strict';

angular.module('dashboardApp.aisabnormal', ['openlayers-directive'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/aisabnormal', {
            templateUrl: 'aisabnormal/aisabnormal.html',
            controller: 'AisAbnormalCtrl'
        });
    }])

    .filter('unCamelCase', function() {
        return function(camelCase) {
            return camelCase.replace(/([A-Z])/g, ' $1').substr(1).replace(/ \w\S*/g, function(txt){return txt.substr(0).toLowerCase();});
        };
    })

    .service('AisAbnormalService', function ($http, $filter) {
        this.getParams = function (params) {
            var qParams = [];
            if (params != null) {
                angular.forEach(params, function (val, key) {
                    var result = key + "=" + encodeURIComponent(val);
                    qParams.push(result);
                });
            }
            return qParams.join("&");
        };

        this.ping = function () {
            return $http.get("/abnormal/ping");
        };

        this.recent_events = function (no_of_events) {
            var url = "/abnormal/rest/event?" + this.getParams({numberOfRecentEvents: no_of_events});
            return $http.get(url);
        };

        this.events_last_24h = function () {
            var t1 = new Date();
            var t0 = new Date(t1 - 24*60*60*1000 * 90 /* TODO */);

            var from = $filter('date')(t0, 'dd/MM/yyyy HH:mm');
            var to = $filter('date')(t1, 'dd/MM/yyyy HH:mm');

            var url = "/abnormal/rest/event?" + this.getParams({from: from, to: to});

            return $http.get(url);
        };
    })

    .controller('AisAbnormalCtrl', ['$scope', '$interval', 'AisAbnormalService', function ($scope, $interval, AisAbnormalService) {
        this.load_and_show_recent_events = function() {
            AisAbnormalService
                .events_last_24h()
                .success(function (data) {
                    $scope.events = data;
                    $scope.lastUpdate = new Date();
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: Could not reach Abnormal Behaviour web services: " + status);
                });
        };
        this.load_and_show_recent_events();
        $interval(this.load_and_show_recent_events, 5*60*1000);
    }]);
