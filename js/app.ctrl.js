var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table',
	'bootstrap.fileField', 'toaster', 'ngAnimate', 'angulartics', 'angulartics.google.analytics']);

/**
 * Main application controller. Prepares the page and submits the request.
 */
clientApp.controller('AppCtrl', function($scope, $rootScope, $analytics, appHelper, utils, progressbar,
		favorites, $uibModal, headers, auth, toaster, requests, REQUEST_METHODS, YARC_CONFIG) {
	$rootScope.config = YARC_CONFIG;

	//Set up the page.
	$rootScope.version = "v" + chrome.runtime.getManifest()['version'];
	favorites.retrieveFavorites();
	$scope.favorites = favorites.get(); //TODO remove favs with duplicate URLs. Tough to do since we need to pass by reference?
	$scope.alerts = [];
	$scope.firstTab = {active: true};

	//Set up the request methods.
	$scope.requestMethod = {
		selected: REQUEST_METHODS[0],
		methods: REQUEST_METHODS
	};
	$scope.changeRequestMethod = function(method) {
		if (method) {
			if ($scope.requestMethod.methods.indexOf(method) == -1) {
				//Add the custom request method to the dropdown so it can easily be re-used.
				$scope.requestMethod.methods.push(method);
			}
			$scope.requestMethod.custom = "";
			$scope.requestMethod.selected = method;
			$scope.requestMethod.isopen = false;
		}
	};

	//Submit the Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.displayResponse = false;
		$scope.processing = true;

		//Send the request.
		$scope.progress = progressbar.PROGRESS_STATES.IN_PROGRESS;
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
			$scope.addOrUpdateFavorite();
		} else {
			toaster.info("No URL", "There's no request URL to save. Please enter a Request URL and try again.");
		}
	});

	//Listen for an event indicating that the specified favorite (or a previous request) should be applied.
	$scope.$on("applyFavorite", function(event, args) {
		//Populate the form...
		if (angular.isNumber(args)) {
			var favorite = favorites.findById(args);
			$scope.appliedFavorite = favorite;
			$scope.requestUrl = favorite.url;
			$scope.requestMethod.selected = favorite.method;
			$scope.payload = favorite.payload;
			headers.set(favorite.headers);
			auth.set(favorite.auth);
			toaster.success("", "The selected favorite has been applied.");
		} else {
			$scope.appliedFavorite = null;
			$scope.requestUrl = args.url;
			$scope.requestMethod.selected = args.method;
			$scope.payload = args.payload;
			headers.set(args.headers);
			auth.set(args.auth);
			toaster.success("", "The selected request has been applied.");
		}
	});

	//Save the current request as a favorite.
	$scope.saveFavorite = function(id, name, callback) {
		var data = {
			'id': id, 'name': name, 'url': $scope.requestUrl, 'method': $scope.requestMethod.selected,
			'payload': $scope.payload, 'headers': angular.copy(headers.get()), 'auth': angular.copy(auth.get())
		};
		favorites.saveFavorite(data, function() {
			$scope.appliedFavorite = data;
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};

	//Check if a favorite was previously applied and open the appropriate modal.
	$scope.addOrUpdateFavorite = function() {
		if ($scope.appliedFavorite) {
			$scope.openUpdateFavoriteModal($scope.appliedFavorite.name);
		} else {
			$scope.openAddFavoriteModal();
		}
	};

	//Query the user on whether to update the current favorite or add a new one.
	$scope.openUpdateFavoriteModal = function(name) {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/updateFavoriteModal.html',
			controller: 'updateFavoriteModalInstanceCtrl',
			keyboard: false,
			resolve: {
				name: function() {
					return name;
				}
			}
		});

		modalInstance.result.then(function(add) {
			if (add) {
				$scope.openAddFavoriteModal();
			} else {
				//Update the last selected favorite.
				$scope.saveFavorite($scope.appliedFavorite.id, name, function() {
					toaster.success("", "Successfully Updated Favorite.");
					$analytics.eventTrack('Favorite Updated');
				});
			}
		});

		modalInstance.closed.then(function() {
			//Uncheck the checkbox indicating a favorite is being added.
			$scope.favoriteCheckbox = false;
		});
	};

	//Allow the user to enter a name for the new favorite request.
	$scope.openAddFavoriteModal = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/addFavoriteModal.html',
			controller: 'AddFavoriteModalInstanceCtrl',
			keyboard: false
		});

		//Add the details to user favorites using the specified name.
		modalInstance.result.then(function(name) {
			$scope.favoriteCheckbox = false;

			if (name) {
				$scope.saveFavorite(Date.now(), name, function() {
					toaster.success("", "Successfully added to Favorites");
					$analytics.eventTrack('Favorite Added');
				});
			}
		});
	};
});
