/**
 * A controller responsible for variious actions related to Favorites. E.g. Import, export etc.
 */
clientApp.controller('FavoritesCtrl', function($scope, $modal, favorites, utils, GENERAL_CONSTANTS, $rootScope) {

	$scope.favorites = favorites.get();

	//Open a modal dialog to allow the user to mange their favorites.
	$scope.openManageFavoritesModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/manageFavoritesModal.html',
			controller: 'ManageFavoritesModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});
	};

	//Open a modal dialog to allow the user to import favorites.
	$scope.openImportFavoritesModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/importFavoritesModal.html',
			controller: 'ImportFavoritesModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});
	};

	//Export a JSON file containing the current favorites.
	$scope.exportFavorites = function() {
		//Construct a Blob object from the array of favorites and download it.
		var json = utils.stringify(favorites.get());
		var blob = new Blob([json], {type: 'application/json'});
		utils.download(blob, GENERAL_CONSTANTS.EXPORT_FILE_NAME);
	};

	//Use the specified favorite to configure the tool.
	$scope.applyFavorite = function(index) {
		console.log("apply fav...", $scope.favorites[index]);
	};
});


/**
 * Simple modal controller for managing favorites.
 */
clientApp.controller('ManageFavoritesModalInstanceCtrl', function ($scope, $modalInstance) {

	$scope.alerts = [{type: 'danger', msg: "Not yet implemented."}];

	$scope.ok = function() {

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Simple modal controller for importing favorites.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favorites, fileImportHelper) {

	$scope.ok = function() {
		//Validate the File.
		if (!fileImportHelper.isValidFile($scope.uploadFile)) {
			$scope.alerts = [{type: 'danger', msg: "Import Failed. The selected file is invalid. Please try again with a valid file."}];
			return;
		}

		//Import the contents of the file.
		fileImportHelper.importFile($scope.uploadFile, function(message) {
			//TODO if it's a success, then close the modal and display global success message. Otherwise display error in modal.
			$scope.alerts = message;
			$scope.$apply();
		});
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Various helper functions for the file import functionality.
 */
clientApp.service('fileImportHelper', function(favorites, GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Check that the specified File is valid.
	 */
	helper.isValidFile = function(file) {
		//Check file object.
		if (angular.isUndefined(file) || !angular.isObject(file)) {
			return false;
		}

		//Check file size.
		if (angular.isUndefined(file.size) || file.size > GENERAL_CONSTANTS.MAX_IMPORT_FILE_SIZE) {
			return false;
		}

		//check file extension.
		if (angular.isUndefined(file.name) || file.name.indexOf('.json') == -1) {
			return false;
		}
		return true;
	};

	/**
	 * Check that the specified content matches is in the expected format.
	 */
	helper.hasValidContent = function(content) {
		var valid = true;
		if (!angular.isObject(content) || !angular.isArray(content)) {
			valid = false;
		}
		return valid;
	};

	/**
	 * Import the contents of the file. The contents will be loaded and any valid favorites will be saved.
	 */
	helper.importFile = function(file, callback) {

		var reader = new FileReader();
		reader.onload = function(evt) {
			var content;
			try {
				//Convert the file contents to a JSON object.
			  content = angular.fromJson(evt.target.result);
			} catch (e) {
				//Do nothing. The next check will find any issues with the conversion.
			}

			var message;
			if (!helper.hasValidContent(content)) {
				message = [{type: 'danger', msg: "Import Failed. The selected file is invalid. Please try again with a valid file."}];
			} else {
				//Add each valid entry from the import file to the list of favorites.
				var numValidFavorites = favorites.saveMultipleFavorites(content);
				message = [{type: 'success', msg: numValidFavorites + " favorites successfully imported from " + file.name}];
			}

			//Return a status message.
			if (typeof(callback) === "function") {
				callback(message);
			}
		};
		reader.readAsText(file);
	};
});
