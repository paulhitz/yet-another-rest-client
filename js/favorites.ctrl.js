/**
 * A controller responsible for variious actions related to Favorites. E.g. Import, export etc.
 */
clientApp.controller('FavoritesCtrl', function($scope, $modal, favorites, utils, GENERAL_CONSTANTS) {

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
});


/**
 * Controller for managing favorites.
 */
clientApp.controller('ManageFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favoritesHelper) {

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
 * Controller for importing favorites.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favoritesHelper) {

	$scope.ok = function() {
		$scope.alerts = [{type: 'danger', msg: "Not yet implemented."}];
		console.log("import file = " + $scope.importFile);
		//$modalInstance.close(authValue);
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
