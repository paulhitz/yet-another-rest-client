/**
 * A controller responsible for handling the Request History.
 */
clientApp.controller('HistoryCtrl', function($scope, $rootScope, $uibModal, $analytics, history, toaster,
		GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.numberOfEntries = 0;

	//Listen for an event indicating that the history should be loaded.
	$scope.$on("loadHistory", function(event, args) {
		$scope.displayedCollection = null;
		$scope.loadData();
	});

	//Retrieve all previous requests.
	$scope.loadData = function() {
		history.get(function(values) {
			//Update the UI.
			$scope.numberOfEntries = values.length;
			$scope.rowCollection = values;
			$scope.displayedCollection = [].concat($scope.rowCollection);
			$scope.$apply();
		});
	};

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index > -1) {
			//Remove it from the UI.
			$scope.rowCollection.splice(index, 1);
			$scope.numberOfEntries = $scope.rowCollection.length;

			//Delete the entry.
			history.delete(row.key, function() {
				toaster.success("", "The selected request has been deleted.");
				$scope.$apply();
			});
		}
	};

	//Delete all request history. The current filter is ignored.
	$scope.deleteAll = function() {
		var userConfirmed = confirm('Are you sure? This action cannot be undone.\n\nThe current filter will be ignored.\n\nTHIS WILL DELETE ALL PREVIOUS REQUESTS.');
		if (userConfirmed) {
			history.deleteAll(function() {
				$analytics.eventTrack('Delete All History');
				toaster.success("", "All previous requests have been deleted.");
				$scope.loadData();
			});
		}
	};

	//Populate the request settings with the details of the specified row.
	$scope.apply = function(row) {
		$rootScope.$broadcast('applyFavorite', {
			'url': row.request,
			'method': row.method,
			'payload': row.payload,
			'headers': history.convertRequestHeaders(row.headers),
			'auth': row.auth
		});
		$rootScope.loadTab('main');
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/historyModal.html',
			controller: 'HistoryModalInstanceCtrl',
			resolve: {
				record: row
			}
		});

		//Apply the selected request.
		modalInstance.result.then(function() {
			$scope.apply(row);
		});
	};
});


/**
 * Simple modal controller for displaying more details about a specific history record.
 */
clientApp.controller('HistoryModalInstanceCtrl', function ($scope, $uibModalInstance, record, utils, toaster,
		GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = angular.copy(record);
	$scope.history.response = utils.stringify($scope.history.response);
	$scope.history.maxSize = GENERAL_CONSTANTS.MAX_OBJECT_SIZE;

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		utils.copyToClipboard(text);
		toaster.success("", "Successfully copied to the Clipboard.");
	};

	$scope.apply = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.countHeaders = function(headers) {
		var numHeaders = 0;
		if (angular.isObject(headers)) {
			numHeaders = Object.keys(headers).length;
		}
		return numHeaders;
	};
});
