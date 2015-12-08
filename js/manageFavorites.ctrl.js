/**
 * A controller responsible for handling the management of favorite requests.
 */
clientApp.controller('ManageFavoritesCtrl', function($scope, $rootScope, $modal, favorites, GENERAL_CONSTANTS) {
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
		$rootScope.$broadcast('applyFavorite', id);
		$rootScope.loadTab('main');
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

	$scope.countHeaders = function(headers) {
		var numHeaders = 0;
		if (angular.isObject(headers)) {
			numHeaders = Object.keys(headers).length;
		}
		return numHeaders;
	};
});
