'use strict';

angular.module('dashboardApp.aisstore', ['ngRoute', 'ui.bootstrap'])

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

	$scope.stats =  [
    	{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ]

	AisStoreService.ping().success(function(data) {
		$scope.stats.push({type: 'success', msg: 'AisStore responded with: '+data});
	});

	AisStoreService.count('second').success(function(data) {
		$scope.stats.push({type: 'success', msg: 'Current packets/second: '+data});
	});


	$scope.closeAlert = function(index) {
    	$scope.stats.splice(index, 1);
    }
 

});


