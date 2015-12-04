var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'ngSanitize', 'ui.select', 'bootstrap.fileField']);

/**
 * Main application controller. Prepares the page and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, clientAppHelper, utils, ProgressbarService, favorites, $modal) {

	//Set up the page.
	$scope.favorites = favorites.get(); //TODO remove favs with duplicate URLs.
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

	//Add the current URL to favorites. TODO should this be in the favorite controller?
	$scope.openAddFavoriteModal = function(url) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/addFavoriteModal.html',
			controller: 'AddFavoriteModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});

		//Add the details to user favorites using the specified name.
		modalInstance.result.then(function(name) {
			var data = {
				'id': Date.now(), 'name': name, 'url': $scope.requestUrl, 
				'method': $scope.requestMethod, 'payload': $scope.payload, 'headers': []
			};
			favorites.saveFavorite(data, function(count){
				//TODO Display success/fail message. Where? need a new notification area?
				//$rootScope.notification = [{type: 'success', msg: "Successfully added to Favorites"}];
			});
		});
	};
});


/**
 * Simple modal controller for adding a favorite.
 */
clientApp.controller('AddFavoriteModalInstanceCtrl', function ($scope, $modalInstance) {

	$scope.ok = function(name) {
		$modalInstance.close(name);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
