/**
 *
 */
clientApp.controller('HistoryCtrl', function($scope, $modal, historyHelper, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.numberOfEntries = 0;

	//Get the data from chrome storage.
	chrome.storage.local.get(null, function (history) {
		//Add each history object to an array.
		var values = [];
		for (var key in history) {
			var entry = history[key];
			if (historyHelper.isHistoryKey(key)) {
				//Add the key to the object so we can identify it later.
				entry['key'] = key;

				//Fix up the date format to enable simpler sorting and formatting.
				entry['date'] = new Date(entry['date']);
				values.push(entry);
			}
		}

		//Update the UI.
		$scope.numberOfEntries = values.length;
		$scope.rowCollection = values;
		$scope.displayedCollection = [].concat($scope.rowCollection);
		$scope.$apply();
	});

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index !== -1) {
			//Remove it from the UI.
			$scope.rowCollection.splice(index, 1);
			$scope.numberOfEntries = $scope.rowCollection.length;

			//Delete the entry from Chrome Storage.
			if (typeof chrome !== 'undefined') {
				//chrome.storage.local.remove(row.key); //TOOD enable this when complete.
				//alert("Entry Deleted.");
			}
		}
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/historyModal.html',
			controller: 'HistoryModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				history: function() {
					return row;
				}
			}
		});
	};
});


clientApp.service('historyHelper', function(GENERAL_CONSTANTS) {
	var history = this;

	/**
	 *  TODO check key is in correct format
	 */
	history.isHistoryKey = function(key) {
		//use constants file for "restclient.history"
		return true;
	};
});


/**
 *
 */
clientApp.controller('HistoryModalInstanceCtrl', function ($scope, $modalInstance, history, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = history;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
