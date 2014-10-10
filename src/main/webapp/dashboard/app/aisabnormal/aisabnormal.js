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
            return $http.get("/service/ping");
        };

        this.recent_events = function (params) {
            var url = "///localhost:8081/abnormal/rest/event?" + this.getParams(params);
            return $http.get(url);
        };
    })

    .controller('AisAbnormalCtrl', ['$scope', '$interval', 'AisAbnormalService', function ($scope, $interval, AisAbnormalService) {
            $scope.map = {
                center: {
                    latitude: 56,
                    longitude: 12
                },
                zoom: 8
            };

        initOpenSeaMap();

        $interval(function() {
            // TODO load recent abnormal events
            AisAbnormalService
                .recent_events({numberOfRecentEvents: 5})
                .success(function (data) {
                    updateAbnormalBehavioursOnMap(data);
                })
                .error(function(data, status, headers, config) {
                    console.log("ERROR: Could not reach Abnormal Behaviour web services: " + status);
                });
        }, 5000);
    }]);

var openLayersMap;

function updateAbnormalBehavioursOnMap(events) {
    events.forEach(function(event) {
        var behaviours = event.behaviours;
        behaviours.forEach(function(behaviour) {
            if (behaviour.primary) {
                var tp = behaviour.trackingPoints[behaviour.trackingPoints.length-1];
                var lat = tp.latitude;
                var lon = tp.longitude;
                var desc = event.description;
                console.log("add event to map: " + lat + " " + lon + " " + desc);
            }
        });
    });
}

var openLayersMap;

function initOpenSeaMap() {
    openLayersMap = new OpenLayers.Map("openlayers-map", {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ScaleLine({topOutUnits: "nmi", bottomOutUnits: "km", topInUnits: 'nmi', bottomInUnits: 'km', maxWidth: '40'}),
            //new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.PanZoomBar()],
        //numZoomLevels: 18,
        maxResolution: 156543,
        units: 'meters'
    });

    openLayersMap.addLayer(new OpenLayers.Layer.OSM());

    openLayersMap.setCenter(new OpenLayers.LonLat(12.0, 56.0).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")));
    openLayersMap.zoomTo(6);

    // Add OpenSeaMap layers - http://www.openseamap.org/
    // Seamark
    var layer_seamark = new OpenLayers.Layer.TMS("Seezeichen", "http://tiles.openseamap.org/seamark/", { numZoomLevels: 18, type: 'png', getURL: getTileURL, isBaseLayer: false, displayOutsideMaxExtent: true});
    // Harbours
    //var layer_harbours = new OpenLayers.Layer.Markers("Häfen", { projection: new OpenLayers.Projection("EPSG:4326"), visibility: true, displayOutsideMaxExtent:true});
    //layer_harbours.setOpacity(0.8);

    openLayersMap.addLayers([layer_seamark /* layer_harbours*/]);
}

function getTileURL(bounds) {
    var res = openLayersMap.getResolution();
    var x = Math.round((bounds.left - openLayersMap.maxExtent.left) / (res * 256 /*this.tileSize.w */));
    var y = Math.round((openLayersMap.maxExtent.top - bounds.top) / (res * 256 /*this.tileSize.h */));
    var z = openLayersMap.getZoom();
    var limit = Math.pow(2, z);
    if (y < 0 || y >= limit) {
        return null;
    } else {
        x = ((x % limit) + limit) % limit;
        var url = this.url;
        var path = z + "/" + x + "/" + y + "." + this.type;
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    }
}
