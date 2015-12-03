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
 * Controller for importing favorites.
 *
 * TODO this isn't the best place for all this logic. Need to be refactored.
 */
clientApp.controller('ImportFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favorites, $rootScope) {

	$scope.ok = function() {
		$scope.alerts = [{type: 'danger', msg: "Not yet implemented."}];
		console.log("import file = ", $scope.uploadFile);

		//TODO
		//Read the file and transform it into a JSON object
		//iterate through each array element and add to favs. or just add the enrite array to favs.
		//should prob perform some validation on the inputted array

		//Read the file
		//var test = angular.toJson($scope.uploadFile);


		var reader = new FileReader();
		reader.onload = function (evt) { 
			//Convert the file to a JSON object. TODO Need to handle errors. Invalid files etc. ****IMPORTANT****
			var content = angular.fromJson(evt.target.result);
			//var fav = favorites.get();

			//iterate over each array element. confirm it;s valid. confirm it's not a dup. add to chrome storage (which adds to favs).
			for (var fav of content) {
				console.log("fav", fav);
				if (favorites.isValidFavorite(fav)) {
					console.log("valid fav!");
					//TODO do we care about duplicates? And what is a duplicate?
					//favorites.saveFavorite(fav);

					//TODO this is all temp code. We need a cleaner solution.
					favorites.saveFavorite(fav, function(count){
						//Update the number of favorites count in the UI.
						//$rootScope.numFavorites = count;
						//$scope.alerts = [{type: 'success', msg: "Successfully added to Favorites"}];
						//$scope.$apply();
					});
				}
			}



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
