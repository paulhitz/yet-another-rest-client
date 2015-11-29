var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'ngSanitize', 'ui.select']);

/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, clientAppHelper, utils, ProgressbarService, TYPEAHEAD) {

	//Populate the form.
	$scope.endpoints = TYPEAHEAD.endpoints;
	$scope.alerts = [];
	$scope.requestMethod = "GET";
	$scope.changeRequestMethod = function(method) {
		$scope.requestMethod = method;
	};

	//Chrome specific operations. E.g. Chrome Storage related functionality.
	clientAppHelper.performChromeOperations($scope);

	//Submit the Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.copyMessage = "";
		$scope.displayResponse = false;
		$scope.processing = true;

		//Call the Service.
		$scope.progress = ProgressbarService.PROGRESS_STATES.START;
		clientAppHelper.callService($scope)
	};

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};
});
