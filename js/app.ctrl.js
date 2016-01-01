var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table',
	'bootstrap.fileField', 'toaster', 'ngAnimate', 'angulartics', 'angulartics.google.analytics']);

/**
 * Main application controller. Prepares the page and submits the request.
 */
clientApp.controller('AppCtrl', function($scope, $rootScope, $analytics, appHelper, utils, ProgressbarService,
		favorites, $modal, headers, auth, toaster, requests, REQUEST_METHODS) {

	//Set up the page.
	$rootScope.version = "v" + chrome.runtime.getManifest()['version'];
	favorites.retrieveFavorites();
	$scope.favorites = favorites.get(); //TODO remove favs with duplicate URLs. Tough to do since we need to pass by reference?
	$scope.alerts = [];
	$scope.requestMethod = REQUEST_METHODS[0];
	$scope.requestMethods = REQUEST_METHODS;
	$scope.changeRequestMethod = function(method) {
		//TODO only if not blank. add custom method to array. reset input (should be its own form?).
		$scope.requestMethod = method;
	};

	//Submit the Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.displayResponse = false;
		$scope.processing = true;

		//Send the request.
		$scope.progress = ProgressbarService.PROGRESS_STATES.IN_PROGRESS;
		requests.call($scope).then(function(success) {
			appHelper.handleResponse($scope, success);
		}, function(error) {
			appHelper.handleResponse($scope, error);
		});
	};

	//Cancel the current request.
	$scope.cancel = function() {
		requests.cancel();
		toaster.error("", "The request was cancelled.");
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

	//Listen for an event indicating that the specified favorite (or a previous request) should be applied.
	$scope.$on("applyFavorite", function(event, args) {
		//Populate the form...
		if (angular.isNumber(args)) {
			var favorite = favorites.findById(args);
			$scope.requestUrl = favorite.url;
			$scope.requestMethod = favorite.method;
			$scope.payload = favorite.payload;
			headers.set(favorite.headers);
			auth.set(favorite.auth);
			toaster.success("", "The selected favorite has been applied.");
		} else {
			$scope.requestUrl = args.url;
			$scope.requestMethod = args.method;
			$scope.payload = args.payload;
			headers.set(args.headers);
			auth.set("");
			toaster.success("", "The selected request has been applied.");
		}
	});

	//Add the current URL to favorites.
	$scope.openAddFavoriteModal = function(url) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/addFavoriteModal.html',
			controller: 'AddFavoriteModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			keyboard: false
		});

		//Add the details to user favorites using the specified name.
		modalInstance.result.then(function(name) {
			$scope.favoriteCheckbox = false;

			if (name) {
				var data = {
					'id': Date.now(), 'name': name, 'url': url, 'method': $scope.requestMethod,
					'payload': $scope.payload, 'headers': angular.copy(headers.get()), 'auth': angular.copy(auth.get())
				};
				favorites.saveFavorite(data, function() {
					toaster.success("", "Successfully added to Favorites");
					$analytics.eventTrack('Favorite Added');
				});
			}
		});
	};
});
