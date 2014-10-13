'use strict';

angular.module('dashboardApp.aisview', ['ui.chart'])

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
            return $http.get("/aisview/rest/ping");
        };


        this.vessel_list = function (params) {
            var url = "/aisview/rest/vessel_list?" + this.getParams(params);
            return $http.get(url);
        };

        this.tracker_packets = function (params) {
            var url = "/aisview/rest/tracker/packets/json/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_dynamic = function (params) {
            var url = "/aisview/rest/tracker/dynamic/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_static = function (params) {
            var url = "/aisview/rest/tracker/static/?" + this.getParams(params);
            return $http.get(url);
        }

        this.tracker_packets = function (params) {
            var url = "/aisview/rest/tracker/packets/?" + this.getParams(params);
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
