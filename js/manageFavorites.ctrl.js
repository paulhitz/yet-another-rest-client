/**
 * A controller responsible for handling the management of favorite requests.
 */
clientApp.controller('ManageFavoritesCtrl', function($scope, $modal, favorites, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.rowCollection = favorites.get();
	$scope.displayedCollection = [].concat($scope.rowCollection);

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index > -1) {
			$scope.rowCollection.splice(index, 1);
			favorites.deleteFavorite(row.id);
		}
	};

	//Apply the selected favorite.
	$scope.apply = function(id) {
		console.log("apply fav: ", id);
		$scope.alerts = [{type: 'warning', msg: "Not yet implemented."}];
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/favoritesModal.html',
			controller: 'ManageFavoritesModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				favorite: function() {
					return row;
				}
			}
		});

		modalInstance.result.then(function(id) {
			$scope.apply(id);
		});
	};
});


/**
 * Modal controller for displaying more details about a specific favorite.
 */
clientApp.controller('ManageFavoritesModalInstanceCtrl', function ($scope, $modalInstance, favorite, utils, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.favorite = angular.copy(favorite);

	$scope.apply = function(id) {
		$modalInstance.close(id);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	//Only show the headers tab if the content is a non-empty object.
	$scope.showHeaders = function() {
		return angular.isObject(favorite.headers) && !angular.equals({}, favorite.headers);
	};
});
