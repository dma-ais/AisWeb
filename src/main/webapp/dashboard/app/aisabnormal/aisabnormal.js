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

    .service('OpenLayersService', ['olData', function (olData) {
        this.init = function($scope) {
            angular.extend($scope, {
                denmark: {
                    lat: 56.00,
                    lon: 12.00,
                    zoom: 6
                },
                defaults: {
                    maxZoom: 14,
                    interactions: {
                        mouseWheelZoom: false
                    },
                    controls: {
                        zoom: true,
                        rotate: false,
                        attribution: false
                    }
                },
                layers: {
                    main: {
                        source: {
                            type: "OSM"
                        }
                    },
                    markers: {
                        source: {
                            type: 'TopoJSON',
                            url: 'json/world.topo.json'
                        },
                        style: {
                            fill: {
                                color: 'rgba(255, 0, 0, 0.6)'
                            },
                            stroke: {
                                color: 'white',
                                width: 3
                            }
                        }
                    }
                }
            });

            var service = this;
            this.olData = olData;

            $scope.$watch("events", function() {
                service.show_events_on_map($scope);
            });
        };

        this.clear_all_markers = function() {
            console.log("TBI clear_all_markers");
        };

        this.add_marker_to_map = function(event) {
            olData.getMap().then(function(map) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point([
                        event.behaviours[0].trackingPoints[0].longitude,
                        event.behaviours[0].trackingPoints[0].latitude
                    ]).transform("EPSG:4326", "EPSG:900913"),
                    name: 'Null Island',
                    population: 4000,
                    rainfall: 500
                });

                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                        src: '/dashboard/img/incident.gif'
                    }))
                });

                iconFeature.setStyle(iconStyle);

                var vectorSource = new ol.source.Vector({
                    features: [iconFeature]
                });

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource
                });

                map.addLayer(vectorLayer);
            });

            olData.getLayers().then(function(layers) {
                console.log(event.id);
            });
        };

        this.show_events_on_map = function($scope) {
            if ($scope.events && $scope.events.length > 0) {
                this.clear_all_markers();
                $scope.events.forEach(this.add_marker_to_map);
            }
        };
    }])

    .controller('AisAbnormalCtrl', ['$scope', '$interval', 'AisAbnormalService', 'OpenLayersService', function ($scope, $interval, AisAbnormalService, OpenLayersService) {
        this.load_and_show_recent_events = function() {
            AisAbnormalService
                .recent_events(10) // .events_last_24h() TODO
                .success(function (data) {
                    $scope.events = data;
                    $scope.lastUpdate = new Date();
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: Could not reach Abnormal Behaviour web services: " + status);
                });
        };

        OpenLayersService.init($scope);
        this.load_and_show_recent_events();

        $interval(this.load_and_show_recent_events, 5*60*1000);
    }])
;
