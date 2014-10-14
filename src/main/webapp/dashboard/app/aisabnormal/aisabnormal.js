'use strict';

angular.module('dashboardApp.aisabnormal', ['google-maps'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/aisabnormal', {
            templateUrl: 'aisabnormal/aisabnormal.html',
            controller: 'AisAbnormalCtrl'
        });
    }])

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
        }

        this.ping = function () {
            return $http.get("/abnormal/ping");
        };

        this.recent_events = function (no_of_events) {
            var url = "http://localhost:8081/abnormal/rest/event?" + this.getParams({numberOfRecentEvents: no_of_events});
            return $http.get(url);
        };

        this.events_last_24h = function () {
            var t1 = new Date();
            var t0 = new Date(t1 - 24*60*60*1000);

            var from = $filter('date')(t0, 'dd/MM/yyyy HH:mm');
            var to = $filter('date')(t1, 'dd/MM/yyyy HH:mm');

            var url = "http://localhost:8081/abnormal/rest/event?" + this.getParams({from: from, to: to});

            return $http.get(url);
        };
    })

    .controller('AisAbnormalCtrl', ['$scope', '$interval', 'AisAbnormalService', function ($scope, $interval, AisAbnormalService) {
        $interval(function() {
            // TODO load recent abnormal events
            AisAbnormalService
                .events_last_24h()
                .success(function (data) {
                    $scope.events = data;
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: Could not reach Abnormal Behaviour web services: " + status);
                });
        }, 5000);
    }]);
