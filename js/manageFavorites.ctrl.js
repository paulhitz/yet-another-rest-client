/**
 * A controller responsible for handling the management of favorite requests.
 */
clientApp.controller('ManageFavoritesCtrl', function($scope, $rootScope, $uibModal, $analytics, favorites, toaster,
		GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.rowCollection = favorites.get();
	$scope.displayedCollection = [].concat($scope.rowCollection);

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index > -1) {
			$scope.rowCollection.splice(index, 1);
			favorites.deleteFavorite(row.id, function() {
				toaster.success("", "The selected favorite has been deleted.");
				$scope.$apply();
			});
		}
	};

	//Delete (permanently) all favorites. The current filter is ignored.
	$scope.deleteAll = function() {
		var userConfirmed = confirm('Are you sure? This will delete ALL favorites. This action cannot be undone.\n\nThe current filter will be ignored.');
		if (userConfirmed) {
			favorites.deleteAllFavorites(function() {
				$analytics.eventTrack('Delete All Favorites');
				toaster.success("", "All favorites have been deleted.");
				$scope.$apply();
			});
		}
	};

	//Apply the selected favorite.
	$scope.apply = function(id) {
		$rootScope.$broadcast('applyFavorite', id);
		$rootScope.loadTab('main');
	};

	//Export a JSON file containing the selected favorite.
	$scope.export = function(row) {
		favorites.exportFavorites([row], row.name + GENERAL_CONSTANTS.EXPORT_FILE_TYPE);
		toaster.success("", "Export Complete.");
		$analytics.eventTrack('Export Single Favorite');
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/favoritesModal.html',
			controller: 'ManageFavoritesModalInstanceCtrl',
			resolve: {
				favorite: function() {
					return row;
				}
			}
		});

		modalInstance.result.then(function(result) {
			if (result.id) {
				$scope.apply(result.id);
			}
			if (result.export) {
				$scope.export(result.export);
			}
		});
	};
});


/**
 * Modal controller for displaying more details about a specific favorite.
 */
clientApp.controller('ManageFavoritesModalInstanceCtrl', function ($scope, $uibModalInstance, favorite, utils,
		GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.favorite = angular.copy(favorite);

	$scope.apply = function(id) {
		$uibModalInstance.close({'id': id});
	};

	$scope.export = function() {
		$uibModalInstance.close({'export': favorite});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.countHeaders = function(headers, auth) {
		var numHeaders = 0;
		if (!utils.isBlankObject(headers)) {
			numHeaders = Object.keys(headers).length;
		}
		if (!utils.isBlankObject(auth) && !utils.isBlankObject(auth.value) && auth.value) {
			numHeaders++;
		}
		return numHeaders;
	};
});
