/**
 * A controller responsible for various actions related to Favorites. E.g. Import, export etc.
 */
clientApp.controller('FavoritesCtrl', function($scope, $uibModal, favorites, GENERAL_CONSTANTS, $rootScope, toaster) {

	$scope.favorites = favorites.get();
	$scope.dropdown = {
		open: false,
		numFavorites: GENERAL_CONSTANTS.MAX_NUM_DROPDOWN_FAVORITES
	};

	//Open a modal dialog to allow the user to import favorites.
	$scope.openImportFavoritesModal = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/importFavoritesModal.html',
			controller: 'ImportFavoritesModalInstanceCtrl'
		});
	};

	//Broadcast an event to indicate that the current request should be saved.
	$scope.addFavorite = function() {
		$rootScope.$broadcast('addFavorite');
		$rootScope.loadTab('main');
	};

	//Export a JSON file containing the current favorites.
	$scope.exportFavorites = function() {
		favorites.exportFavorites(favorites.get(), GENERAL_CONSTANTS.EXPORT_FILE_NAME);
		toaster.success("", "Export Complete. File Name: " + GENERAL_CONSTANTS.EXPORT_FILE_NAME);
	};

	//Use the specified favorite to configure the tool.
	$scope.applyFavorite = function(id) {
		$rootScope.$broadcast('applyFavorite', id);
		$rootScope.loadTab('main');
	};

	//Show all favorites in the dropdown. No limit is set.
	$scope.showAll = function(id) {
		$scope.dropdown.numFavorites = undefined;
	};

	//Close the favorites dropdown.
	$scope.close = function(id) {
		$scope.dropdown.open = false;
	};
});


/**
 * Simple modal controller for importing favorites.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $uibModalInstance, $analytics, fileImport, toaster) {

	$scope.ok = function() {
		//Validate the File.
		if (!fileImport.isValidFile($scope.uploadFile)) {
			$scope.alerts = [{type: 'danger', msg: "Import Failed. The selected file is invalid. Please try again with a valid file."}];
			$analytics.eventTrack('Import Favorites Failed', {category: 'Exception', label: 'Invalid Import File'});
			return;
		}

		//Import the contents of the file.
		fileImport.importFile($scope.uploadFile, function(message) {
			if (message[0].type == "success") {
				toaster.success("", message[0].msg);
				$analytics.eventTrack('Import Favorites');
				$uibModalInstance.close();
			} else {
				$scope.alerts = message;
				$scope.$apply();
				$analytics.eventTrack('Import Favorites Failed', {category: 'Exception', label: 'Invalid Import File Content'});
			}
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});


/**
 * Simple modal controller for adding a favorite.
 */
clientApp.controller('AddFavoriteModalInstanceCtrl', function ($scope, $uibModalInstance, favorites) {

	//Use existing favorites as typeahead suggestions when naming new favorites.
	$scope.favorites = favorites.get();

	$scope.ok = function(name) {
		$uibModalInstance.close(name);
	};
});


/**
 * Simple modal controller to determine whether to add or update a favorite.
 */
clientApp.controller('updateFavoriteModalInstanceCtrl', function ($scope, $uibModalInstance, name) {
	$scope.name = name;

	$scope.add = function(status) {
		$uibModalInstance.close(status);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
