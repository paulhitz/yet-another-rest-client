/**
 * A controller responsible for handling the Request Headers.
 */
clientApp.controller('HeadersCtrl', function($scope, $modal, headersHelper, EXAMPLE_HEADERS) {

	//Load the saved custom headers and generate a label to display them with.
	var savedHeaders = headersHelper.retrieveSavedHeaders();
	if (savedHeaders.length > 0) {
		savedHeaders = headersHelper.prepareHeadersForDisplay(savedHeaders, "Custom");
	} else {
		savedHeaders = [ { group: 'Custom', label: 'None'} ];
	}

	//Prepare the example headers for display and merge them with the custom headers.
	var exampleHeaders = headersHelper.prepareHeadersForDisplay(EXAMPLE_HEADERS, "Examples");
	$scope.favHeaders = savedHeaders.concat(exampleHeaders);

	//Add the selected header to the list of headers for the next request.
	$scope.headers = {};
	$scope.addCustomHeader = function(selectedHeader) {
		$scope.headers[selectedHeader.id] = (selectedHeader);
	};

	//Remove the selected from the list of headers.
	$scope.removeHeader = function(header) {
		delete $scope.headers[header.id]
	};

	//Identifies if the supplied object is empty.
	$scope.isEmptyObject = function(object){
		return angular.equals({}, object);
	}

	//Open a modal dialog to...
	$scope.openHeaderModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/historyModal.html',
			controller: 'HeaderModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				header: function() {
					return row;
				}
			}
		});
	};
});

/**
 * Various helper functions for the Headers functionality.
 */
clientApp.service('headersHelper', function(GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Add the specified group name to each header object and generate a label used to display them.
	 */
	helper.prepareHeadersForDisplay = function(headers, group) {
		for (var header of headers) {
			header['group'] = group;
			header['label'] = header.name + ": " + header.value;
		}
		return headers;
	};

	/**
	 * Load the saved custom request headers from Chrome Storage.
	 */
	helper.retrieveSavedHeaders = function() {
		var headers = [];
		chrome.storage.sync.get(null, function (headers) {
			//Add each header object to an array.
			for (var key in headers) {
				var entry = headers[key];
				if (helper.isHeaderKey(key)) {
					//Add the key to the object so we can identify it later.
					//entry['key'] = key;
					headers.push(entry);
				}
			}
		});
		return headers;
	};

	/**
	 * Ensure that the specified key is in the correct format for a key used to store header objects.
	 */
	helper.isHeaderKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.HEADER_KEY_FORMAT) > -1) {
			return true;
		}
	};
});

/**
 * Controller for ...
 */
clientApp.controller('HeaderModalInstanceCtrl', function ($scope, $modalInstance, header) {
	//history.response = JSON.stringify(history.response, null, GENERAL_CONSTANTS.INDENTATION_LEVEL);

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = header;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
