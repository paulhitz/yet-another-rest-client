var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'ngSanitize', 'ui.select']);

/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, $log, clientAppHelper, utils, ProgressbarService, SERVICES_CONFIG, EXAMPLE_HEADERS) {


	$scope.endpoint = {};
	$scope.endpoints = SERVICES_CONFIG.endpoints;
	
	$scope.requestMethod = "GET";
	$scope.changeRequestMethod = function(method) {
		$scope.requestMethod = method;
	};



	//TODO Consider new controller solely for header functionality.

	var savedHeaders = clientAppHelper.retrieveSavedHeaders();
	if (savedHeaders.length > 0) {
		savedHeaders = clientAppHelper.prepareHeadersForDisplay(savedHeaders, "Custom");
	} else {
		//if there are no saved headers, add a placeholder called 'none'.
		savedHeaders = [ { group: 'Custom', label: 'None'} ];
	}

	//Add the dropdown category and generate the label to display.
	var exampleHeaders = clientAppHelper.prepareHeadersForDisplay(EXAMPLE_HEADERS, "Examples");

	//Merge the different types of headers to display
	$scope.favHeaders = savedHeaders.concat(exampleHeaders);

	$scope.headers = {};
	$scope.addCustomHeader = function(selectedHeader) {
		console.log("added header = " + JSON.stringify(selectedHeader));
		$scope.headers[selectedHeader.id] = (selectedHeader);
	};
	
	$scope.removeHeader = function(header) {
		console.log("removing header = " + JSON.stringify(header));
		delete $scope.headers[header.id]
	};
	
	//TODO move to utility class? Add to rootscope?
	$scope.isEmptyObject = function(object){
		return angular.equals({}, object);
	}




	//Populate the form.
	$scope.alerts = [];

	//Chrome specific operations. E.g. Chrome Storage related functionality.
	clientAppHelper.performChromeOperations($scope);

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.copyMessage = "";
		$scope.displayResponse = false;
		$scope.processing = true;

		//Update Progress Bar.
		$scope.progress = ProgressbarService.getProgressState('START');

		//
		clientAppHelper.configureAndCallService($scope, $scope.requestUrl);
	};

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};
});
