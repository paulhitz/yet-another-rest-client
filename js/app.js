var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'ngSanitize', 'ui.select']);

/**
 * Main application controller. Prepares the page and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, $rootScope, clientAppHelper, utils, ProgressbarService, favorites) {

	//Set up the page.
	$scope.favorites = favorites.get();
	$rootScope.numFavorites = favorites.get().length;
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

	//Add the current URL to favorites.
	$scope.addFavorite = function(url) {
		console.log("adding to favorites = " + url);
		favorites.saveFavorite($scope, function(count){
			//Update the number of favorites count in the UI.
			$rootScope.numFavorites = count;
			$scope.alerts = [{type: 'success', msg: "Successfully added to Favorites"}];
			$scope.$apply();  //TODO need a new notification area?
		});
	};
});
