function targetFilters($scope,UrlService,$http) {
	//textfields for source filters
	$scope.textFields = {};

    //Ship types variables: source data.js
    $scope.shipTypes = shipTypes;

    $scope.prefix = "t.";

    //Control of checked ship types
    $scope.shipTypesSelect = function(shipType) {

        //if all is selected, deselect all other
        if(shipType.value==$scope.shipTypes[_.indexOf(_.pluck($scope.shipTypes, 'text'),'All')].value) {

            angular.forEach($scope.shipTypes, function(shipType) {
                shipType.include=false;
            });

            $scope.shipTypes[0].include=true;

        }

        //deselect all if any other is selected
        if(shipType.value!=$scope.shipTypes[_.indexOf(_.pluck($scope.shipTypes, 'text'),'All')].value) {
            $scope.shipTypes[0].include=false;
        }

        $scope.pushToService();
    }




    $scope.pushToService = function() {
    	var targetFilter = '';

    	for (var key in $scope.textFields) {
    		baseString = 't.'+key+'=';

    		switch (key) {
    			case "country":
    				targetFilter += includeFromTextFieldWithDB($scope.textFields[key],countryDatabase,baseString)
    				break
    			default:
    				targetFilter += includeFromTextFields($scope.textFields[key],baseString);
    				break;
    		}
			
    	}


		targetFilter+= includeFromCheckBoxes($scope.shipTypes,'t.type=');		

    	UrlService.setTargetFilter(targetFilter);
    }

    $scope.newIncrementingTextField = function(field) {
    	newIncrementingTextField(field,$scope);
    }


   

    //initial data
	newIncrementingTextField("name",$scope);
	newIncrementingTextField("mmsi",$scope);
	newIncrementingTextField("country",$scope);

	$scope.autoComplete = {'country': countryDatabase}

    
}


