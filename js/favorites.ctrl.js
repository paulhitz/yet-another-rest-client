/**
 * A controller responsible for variious actions related to Favorites. E.g. Import, export etc.
 */
clientApp.controller('FavoritesCtrl', function($scope, $modal, favorites, utils, GENERAL_CONSTANTS, $rootScope, toaster) {

	$scope.favorites = favorites.get();

	//Open a modal dialog to allow the user to import favorites.
	$scope.openImportFavoritesModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/importFavoritesModal.html',
			controller: 'ImportFavoritesModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});
	};

	//Broadcast an event to indicate that the current request should be saved.
	$scope.addFavorite = function() {
		$rootScope.$broadcast('addFavorite');
		$rootScope.loadTab('main');
	};

	//Export a JSON file containing the current favorites.
	$scope.exportFavorites = function() {
		//Construct a Blob object from the array of favorites and download it.
		var json = utils.stringify(favorites.get());
		var blob = new Blob([json], {type: 'application/json'});
		utils.download(blob, GENERAL_CONSTANTS.EXPORT_FILE_NAME);
		toaster.success("", "Export Complete. File Name: " + GENERAL_CONSTANTS.EXPORT_FILE_NAME);
	};

	//Use the specified favorite to configure the tool.
	$scope.applyFavorite = function(id) {
		$rootScope.$broadcast('applyFavorite', id);
		$rootScope.loadTab('main');
	};
});


/**
 * Simple modal controller for importing favorites.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $modalInstance, $analytics, favorites, fileImport, toaster) {

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
				$modalInstance.close();
			} else {
				$scope.alerts = message;
				$scope.$apply();
				$analytics.eventTrack('Import Favorites Failed', {category: 'Exception', label: 'Invalid Import File Content'});
			}
		});
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
