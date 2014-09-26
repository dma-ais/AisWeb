'use strict';

angular.module('dashboardApp.aisstore', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/aisstore', {
    templateUrl: 'aisstore/aisstore.html',
    controller: 'AisStoreCtrl'
  });
}])


.service('AisStoreService', function($http) {
	this.ping = function() {
		return $http.get("/service/store/ping");
	};


	this.count = function(interval) {
		var url = "/service/store/count/";
		switch (interval) {
	    case "second":
		case "minute":
			return $http.get(url+interval);	
		default:
			return $http.get(url);	
		}
	        
		
	};

})

.controller('AisStoreCtrl', function($scope, AisStoreService) {
	$scope.ping = 'no ping yet';

	$scope.count = {second: -1}

	AisStoreService.ping().success(function(data) {
		$scope.ping = data;
	});

	AisStoreService.count('second').success(function(data) {
		$scope.count['second'] = data;
	});

});


