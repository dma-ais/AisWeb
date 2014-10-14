'use strict';

angular.module('dashboardApp.aisabnormal', ['google-maps'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/aisabnormal', {
            templateUrl: 'aisabnormal/aisabnormal.html',
            controller: 'AisAbnormalCtrl'
        });
    }])

    .service('AisAbnormalService', function ($http) {
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

        this.recent_events = function (params) {
            var url = "http://localhost:8081/abnormal/rest/event?" + this.getParams(params);
            return $http.get(url);
        };
    })

    .controller('AisAbnormalCtrl', ['$scope', '$interval', 'AisAbnormalService', function ($scope, $interval, AisAbnormalService) {
        $interval(function() {
            // TODO load recent abnormal events
            AisAbnormalService
                .recent_events({numberOfRecentEvents: 5})
                .success(function (data) {
                    $scope.events = data;
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: Could not reach Abnormal Behaviour web services: " + status);
                });
        }, 5000);
    }]);
