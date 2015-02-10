var app = angular.module('aisHDD', ['$strap.directives']);

//idea from http://jsfiddle.net/sebmade/swfjT/
app.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    };
});

//autocomplete textfields
app.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function() {
                $timeout(function() {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
});

app.factory('UrlService', function() {
    return {
        area: null,
        fromDate: null,
        toDate: null,
        timeZone: null,
        tables: null,
        separator: null,
        header: null,
        samples: null,
        sourceFiltering: null,
        targetFilter: null,
        areaValidService: null,
        timeValidService: null,
        setArea: function(msg) {
            this.area = msg;
        },
        setFromDate: function(msg){
            this.fromDate = msg;
        },
        setToDate: function(msg){
            this.toDate = msg;
        },
        setTimeZone: function(msg){
            this.timeZone = msg;
        },
        setTables: function(msg){
            this.tables = msg;
        },
        setSeparator: function(msg){
            this.separator = msg;
        },
        setHeader: function(msg){
            this.header = msg;
        },
        setSamples: function(msg){
            this.samples = msg;
        },
        setSourceFiltering: function(msg){
            this.sourceFiltering = msg;
        },
        setTargetFilter: function(msg){
            this.targetFilter = msg;
        },
        setAreaValidService: function(msg){
            this.areaValidService = msg;
        },
        setTimeValidService: function(msg){
            this.timeValidService = msg;
        }
    }
});




//Include all text from custom number of dynamic text fields
function includeFromTextFields(array,baseString) {
    var returnString ='';
    var someInput = false;
    //append all source bases
    angular.forEach(array, function(item) {
        if(item.input && item.input.length>0) someInput=true;
    });
    if(someInput) {
        returnString=baseString;

        angular.forEach(array, function(item) {
            if(item.input.length>0) returnString+=item.input+',';
        });
    }else returnString='';

    //replace , with & at end of string
    returnString=returnString.replace(/^,|,$/g,'&');

    return returnString;
}


//Include all text from custom number of dynamic text fields
function includeFromCheckBoxes(array,baseString) {
    var returnString = '';
    angular.forEach(array, function(item) {
        if(item.include && item.value) returnString+=item.value+',';
    });

    //replace , with & at end of string
    returnString=returnString.replace(/^,|,$/g,'&');

    if (returnString!=''){
        return baseString+returnString
    }
    
    return returnString;
}


//Include all text from custom number of dynamic text fields if input is in database
function includeFromTextFieldWithDB(array,dbArray,baseString) {
    var returnString;

    //any output and any true country input?
    var someInput = false;
    var trueInput = false;
    var indexOfCountry;

    angular.forEach(array, function(item) {
        indexOfCountry = dbArray.indexOf(item.input.toUpperCase());
        //check input length
        if(item.input.length>0) someInput=true;
        //check input quality
        if(indexOfCountry!=-1) trueInput = true;

    });
    //append all input which are in database
    if(someInput && trueInput) {
        returnString=baseString;

        var indexOfCountry;
        angular.forEach(array, function(item) {
            indexOfCountry = dbArray.indexOf(item.input.toUpperCase());
            if(item.input.length>0 && indexOfCountry!=-1) returnString+=countryCode[indexOfCountry]+',';
        });
    }else returnString='';

    //replace , with & at end of string
    returnString=returnString.replace(/^,|,$/g,'&');

    return returnString;
}

//uses countryDatabase from data.js
function checkCountryDB(country) {

        //user input
        var testString = country.toUpperCase();

        //test to see if user input is in country db
        var indexOfControlCountry = countryDatabase.indexOf(testString);

        //console.log('blur on text field '+index +' with input: '+testString+' with index ' +indexOfControlCountry +' in db');

        //Making boolean to control css-class
        if (testString.length != 0 && indexOfControlCountry===-1) return true;
        else return false;
}

function checkTextField(key,value) {
    switch (key) {
        case "country":
            return checkCountryDB(value);
    }
    return true;
}

//Adding new text field for name
function newIncrementingTextField(name,$scope) {
    if ($scope.textFields[name] == null) {
        $scope.textFields[name] = [];
    }

    var stateObject = $scope.textFields[name];

    if (stateObject.length == 0 || stateObject[stateObject.length-1].input.length > 0) {
        stateObject.push({"text": $scope.prefix+name+'=', input:''});    
    }

    $scope.pushToService();
};