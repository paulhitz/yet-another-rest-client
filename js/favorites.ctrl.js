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
		$scope.alerts = [{type: 'danger', msg: "Not yet implemented."}];
		//$modalInstance.close(authValue);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Simple modal controller for importing favorites.
 *
 * TODO this isn't the best place for all this logic. Needs to be refactored.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favorites, $rootScope) {

	$scope.ok = function() {
		//TODO perform some validation on the input.

		//Load the file.
		var reader = new FileReader();
		reader.onload = function(evt) {
			//Convert the file to a JSON object.
			//TODO Need to handle errors. Invalid files etc. ****IMPORTANT****
			//TODO + check it's an array
			var content = angular.fromJson(evt.target.result);

			//Add each valid entry from the import file to the favorites.
			var numValidFavorites = 0;
			for (var fav of content) {
				if (favorites.isValidFavorite(fav)) {
					numValidFavorites++;
					console.log("valid fav!");

					//TODO can chrome storage take a list of objects? So we don't have to import favorites individually?
					favorites.saveFavorite(fav);
				}
			}
			$scope.alerts = [{type: 'success', msg: numValidFavorites + " favorites successfully imported."}];
			$scope.$apply();
		};
		reader.readAsText($scope.uploadFile);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Various helper functions for the Favorites functionality.
 */
clientApp.service('favoritesHelper', function() {
	var helper = this;

});
