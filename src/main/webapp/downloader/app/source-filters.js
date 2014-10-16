function sourceFilters($scope,UrlService,$http) {
    $scope.countryDatabase = countryDatabase;

    //textfields for s.region,s.bs,s.id
    $scope.textFields = {};
    $scope.prefix = "s.";

    

    //Source ID variables fetched from: source /store/sourceIDs
    $scope.tempIds = [];
    var sourceIds = [];
    sourceIds[0]= {text:'All', value: 'all&', include:true};

    $scope.sourceTypes = [{text:'LIVE', value: 'LIVE&', include:false},{text:'SAT', value: 'SAT&', include:false}];

    //Source ID variables: source data.js
    $scope.sourceIds = sourceIds;

    //Control of Source IDs
    $scope.sourceIdsSelect = function(sourceId) {

        //if all is selected, deselect all other
        if(sourceId.value==$scope.sourceIds[_.indexOf(_.pluck($scope.sourceIds, 'text'),'All')].value) {

            angular.forEach($scope.sourceIds, function(sourceId) {
                sourceId.include=false;
            });

            $scope.sourceIds[0].include=true;
            $scope.sourceIdTabHeader = tabHeadings[0];

        }

        //deselect all if any other is selected
        if(sourceId.value!=$scope.sourceIds[_.indexOf(_.pluck($scope.sourceIds, 'text'),'All')].value) {
            $scope.sourceIds[0].include=false;
            $scope.sourceIdTabHeader = tabHeadings[0]+'(*)';
        }


    }
    

    $scope.pushToService = function() {
        var filter = '';

        for (var key in $scope.textFields) {
            baseString = 's.'+key+'=';

            switch (key) {
                case "country":
                    filter += includeFromTextFieldWithDB($scope.textFields[key],countryDatabase,baseString)
                    break
                default:
                    filter += includeFromTextFields($scope.textFields[key],baseString);
                    break;
            }   
        }

        UrlService.setSourceFiltering(filter);
    }

    $scope.newIncrementingTextField = function(field) {
        newIncrementingTextField(field,$scope);
    }


    //initial data
    newIncrementingTextField("country",$scope);
    newIncrementingTextField("bs",$scope);
    newIncrementingTextField("region",$scope);


}
