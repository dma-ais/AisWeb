'use strict';

angular.module('dashboardApp.aisview', ['ui.chart', 'google-maps'])

    .value('charting', {
        pieChartOptions: {
            animate: true,
            seriesDefaults: {
                // Make this a pie chart.
                renderer: $.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true
                }
            },
            legend: {
                show: true,
                location: 'ne',
                rendererOptions: {numberColumns: 2}
            }

        },
        barChartOptions: {
            animate: true,
            animateReplot: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barDirection: 'vertical',
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    pointLabels: { show: true, location: 'e'}
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer
                }
            }
        }
    })

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/aisview', {
            templateUrl: 'aisview/aisview.html',
            controller: 'AisViewCtrl'
        });
    }])

    .service('AisViewService', function ($http) {

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


        this.vessel_list = function (params) {
            var url = "/service/vessel_list?" + this.getParams(params);
            return $http.get(url);
        };

        this.tracker_packets = function (params) {
            var url = "/service/tracker/packets/json/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_dynamic = function (params) {
            var url = "/service/tracker/dynamic/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_static = function (params) {
            var url = "/service/tracker/static/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_packets = function (params) {
            var url = "/service/tracker/packets/?" + this.getParams(params);
            return $http.get(url);
        }

    })

    .controller('AisViewCtrl', function ($scope, AisViewService, charting) {
        $scope.fastestVessel = [0, []];
        $scope.areaPresets = {
            'DNK': {
                name: "Denmark", box: "53.583,4.517,64.0,18.0", size:"large"
            },
            'GREENLAND': {
                name: "Greenland+Iceland", box: "84,-74,58,-10", size:"large"
            },

            'WORLD': {
                name: "World Wide", box: "-90,-180,90,180", size: "large"
            },

            'NUUK': {
                name: "Nuuk", box: "65,-54,63,-49", size: "small"
            }
        };



        $scope.preset = 'DNK';

        $scope.drawPreset = function (preset) {
            $scope.preset = preset;

            resetGraphs($scope.pies);
            resetGraphs($scope.bars);

            var box = $scope.areaPresets[preset].box;

            AisViewService.tracker_dynamic({"box": box, "columns": "targetType", "output": "jsonobject"}).success(function (data) {
                var graph = populateGraph(data);
                $scope.pies.vesselClass.data = graph;
                $scope.bars.vesselClass.data = graph;
            });


            AisViewService.tracker_static({"box": box, "columns": "shipType", "output": "jsonobject"}).success(function (data) {
                var graph = populateGraph(data);
                $scope.pies.vesselTypeStatic.data = graph;
            });

        }

        $scope.drawPreset($scope.preset);


        $scope.pies = {
            vesselClass: {data: [
                [
                    ['A', 1],
                    ['B', 1]
                ]
            ], options: charting.pieChartOptions},
            vesselTypeStatic: {data: [
                [
                    ['PLACEHOLDER', '1']
                ]
            ], options: charting.pieChartOptions}
        };


        $scope.bars = {
            vesselClass: {data: [
                [
                    ['PLACEHOLDER', '1']
                ]
            ], options: charting.barChartOptions}
        }

        $scope.map = {
            center: {
                latitude: 56,
                longitude: 12
            },
            zoom: 8
        };

        drawOpenSeaMap();
    });

//works when requesting just one column
function populateGraph(data) {
    var dict = {};
    var targetGraph = [
        []
    ];

    for (var k in data["data"]["targets"]) {
        if (data["data"]["targets"].hasOwnProperty(k)) {
            var v = data["data"]["targets"][k];
            if (v[0] == null) {
            }
            else {
                dict[v] = (dict[v[0]] || 1) + 1;
            }
        }
    }

    for (var k in dict) {
        if (dict.hasOwnProperty(k)) {
            var datapoint = [k, dict[k]];
            targetGraph[0].push(datapoint);
        }
    }

    return targetGraph;
}

function resetGraphs(graphs) {
    angular.forEach(graphs, function (graph, key) {
        graph.data = [
            ['PLACEHOLDER', 1]
        ];
    });
}

function drawOpenSeaMap() {
    var map = new OpenLayers.Map("openlayers-map", {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ScaleLine({topOutUnits : "nmi", bottomOutUnits: "km", topInUnits: 'nmi', bottomInUnits: 'km', maxWidth: '40'}),
            //new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.PanZoomBar()],
        //numZoomLevels: 18,
        //maxResolution: 156543,
        units: 'meters'
    });

    map.addLayer(new OpenLayers.Layer.OSM());

    map.setCenter(new OpenLayers.LonLat(12.0, 56.0).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913")));
    map.zoomTo(5);

    /*
    // Position and zoomlevel of the map
    var lon = 12.0915;
    var lat = 54.1878;
    var zoom = 15;

    var map = new OpenLayers.Map('openlayers-map', {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ScaleLine({topOutUnits : "nmi", bottomOutUnits: "km", topInUnits: 'nmi', bottomInUnits: 'km', maxWidth: '40'}),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.PanZoomBar()],
        maxExtent:
            new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
        numZoomLevels: 18,
        maxResolution: 156543,
        units: 'meters'
    });
/*
    // set the map centre on the middle of Denmark
    var lat = 56;
    var lon = 12;
    var zoom = 7;
    map.setCenter(new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"), zoom)
*
    var layer_default = new OpenLayers.Layer.OSM();

    // Mapnik
//    var layer_mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
    // Osmarender
    // XXX osmarender gibt es nicht mehr
    // layer_tah = new OpenLayers.Layer.OSM.Osmarender("Osmarender");
    // Seamark
 //   var layer_seamark = new OpenLayers.Layer.TMS("Seezeichen", "http://tiles.openseamap.org/seamark/",
 //       { numZoomLevels: 18, type: 'png', getURL: getTileURL, isBaseLayer: false, displayOutsideMaxExtent: true});

    map.addLayers([layer_default]);
//    jumpTo(lon, lat, zoom);

    // Add harbour layer
    //init_haefen(map, "./map/"); */
}