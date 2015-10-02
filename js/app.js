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
$scope.headers = savedHeaders.concat(exampleHeaders);






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
