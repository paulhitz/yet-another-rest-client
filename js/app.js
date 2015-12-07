var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'bootstrap.fileField']);

/**
 * Main application controller. Prepares the page and submits the request.
 */
clientApp.controller('ClientAppCtrl', function($scope, clientAppHelper, utils, ProgressbarService, favorites,
		$modal, headerService) {

	//Set up the page.
	$scope.favorites = favorites.get(); //TODO remove favs with duplicate URLs. Tough to do since we need the pass by reference?
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
		clientAppHelper.callService($scope);
	};

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};

	//Listen for an event indicating that the current request should be saved.
	$scope.$on("addFavorite", function(event, args) {
		if ($scope.requestUrl) {
			$scope.openAddFavoriteModal($scope.requestUrl);
		} else {
			//TODO show error message.
			console.log("no request url");
		}
	});

	//Add the current URL to favorites. TODO should this be in the favorites controller?
	$scope.openAddFavoriteModal = function(url) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/addFavoriteModal.html',
			controller: 'AddFavoriteModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});

		//Add the details to user favorites using the specified name.
		modalInstance.result.then(function(name) {
			$scope.favoriteCheckbox = false;

			if (name) {
				var data = {
					'id': Date.now(), 'name': name, 'url': url,
					'method': $scope.requestMethod, 'payload': $scope.payload, 'headers': headerService.get()
				};
				favorites.saveFavorite(data, function(count) {
					//TODO Display success/fail message. Where? need a new notification area?
					//$rootScope.notification = [{type: 'success', msg: "Successfully added to Favorites"}];
				});
			}
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
});
