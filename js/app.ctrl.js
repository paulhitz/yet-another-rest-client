var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table',
	'bootstrap.fileField', 'toaster', 'ngAnimate', 'angulartics', 'angulartics.google.analytics']);

/**
 * Main application controller. Prepares the page and submits the request.
 */
clientApp.controller('ClientAppCtrl', function($scope, clientAppHelper, utils, ProgressbarService, favorites,
		$modal, headerService, auth, toaster) {

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
		utils.copyToClipboard(text);
		toaster.success("", "Successfully copied to the Clipboard.");
	};

	//Listen for an event indicating that the current request should be saved.
	$scope.$on("addFavorite", function(event, args) {
		if ($scope.requestUrl) {
			$scope.openAddFavoriteModal($scope.requestUrl);
		} else {
			toaster.info("No URL", "There's no request URL to save. Please enter a Request URL and try again.");
		}
	});

	//Listen for an event indicating that the specified favorite should be applied.
	$scope.$on("applyFavorite", function(event, args) {
		//Populate the form...
		if (angular.isNumber(args)) {
			var favorite = favorites.findById(args);
			$scope.requestUrl = favorite.url;
			$scope.requestMethod = favorite.method;
			$scope.payload = favorite.payload;
			headerService.set(favorite.headers);
			auth.set(favorite.auth);
			toaster.success("", "The selected favorite has been applied.");
		} else {
			$scope.requestUrl = args.url;
			$scope.requestMethod = args.method;
			$scope.payload = args.payload;
			headerService.set(args.headers);
			toaster.success("", "The selected request has been applied.");
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
					'id': Date.now(), 'name': name, 'url': url, 'method': $scope.requestMethod,
					'payload': $scope.payload, 'headers': headerService.get(), 'auth': auth.get()
				};
				favorites.saveFavorite(data, function() {
					toaster.success("", "Successfully added to Favorites");
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
