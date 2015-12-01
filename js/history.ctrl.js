/**
 * A controller responsible for handling the Request History.
 */
clientApp.controller('HistoryCtrl', function($scope, $modal, historyHelper, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.numberOfEntries = 0;

	//Listen for an event indicating that the history should be loaded.
	$scope.$on("loadHistory", function(event, args) {
		$scope.displayedCollection = null;
		$scope.loadData();
	});

	//Get the data from chrome storage.
	$scope.loadData = function() {
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
	};

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index > -1) {
			//Remove it from the UI.
			$scope.rowCollection.splice(index, 1);
			$scope.numberOfEntries = $scope.rowCollection.length;

			//Delete the entry from Chrome Storage.
			if (typeof chrome !== 'undefined') {
				chrome.storage.local.remove(row.key);
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

/**
 * Various helper functions for the History functionality.
 */
clientApp.service('historyHelper', function(GENERAL_CONSTANTS) {
	var helper = this;

	//Ensure that the specified key is in the correct format for a key used to store history objects.
	helper.isHistoryKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.HISTORY_KEY_FORMAT) > -1) {
			return true;
		}
	};
});

/**
 * Controller for displaying more details about a specific history record.
 */
clientApp.controller('HistoryModalInstanceCtrl', function ($scope, $modalInstance, history, utils, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = angular.copy(history);
	$scope.history.response = utils.stringify($scope.history.response);

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.alerts = [{type: 'success', msg: "Successfully copied to the Clipboard."}];
		utils.copyToClipboard(text);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
