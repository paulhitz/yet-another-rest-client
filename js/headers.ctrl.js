/**
 * A controller responsible for handling the Request Headers.
 */
clientApp.controller('HeadersCtrl', function($scope, $modal, headersHelper, GENERAL_CONSTANTS) {

	//The headers that should be added to subsequent requests.
	$scope.headers = {};

	//Display example headers and any saved custom headers.
	headersHelper.displayCustomAndExampleHeaders($scope);

	//Add the selected custom header to the headers for the next request.
	$scope.useCustomHeader = function(header) {
		//TODO possible issue with header value being the wrong selection.
		//Copy the header and change the ID so it can be manipulated independently.
		var headerCopy = angular.copy(header);
		var id = Date.now();
		headerCopy.id = id;
		delete headerCopy.group;
		$scope.headers[headerCopy.id] = headerCopy;
	};

	//Remove the selected header from the list of headers.
	$scope.removeHeader = function(header) {
		delete $scope.headers[header.id]
	};

	//Delete the selected custom header.
	$scope.deleteCustomHeader = function(header) {
		var index = $scope.customHeaders.indexOf(header);
		if (index > -1) {
			//Remove it from the UI.
			$scope.customHeaders.splice(index, 1);
			$scope.selectedHeader = $scope.customHeaders[0];

			//Delete the entry from Chrome Storage.
			var key = GENERAL_CONSTANTS.HEADER_KEY_FORMAT + header.id;
			chrome.storage.sync.remove(key);
		}
	};

	//Identifies if the supplied object is empty.
	$scope.isEmptyObject = function(object) {
		return angular.equals({}, object);
	}

	//Open a modal dialog to allow a new header to be entered or an existing header to be edited.
	$scope.openHeaderModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/headersModal.html',
			controller: 'HeaderModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				//Used for editing an existing header.
				currentHeader: function() {
					if (typeof row !== 'undefined' && !row.group) {
						//Not a custom header so use a copy.
						row = angular.copy(row);
					}
					return row;
				},
				headers: function() {
					return $scope.headers;
				},
				customHeaders: function() {
					return $scope.customHeaders;
				},
				selectedHeader: function() {
					return $scope.selectedHeader;
				}
			}
		});
	};
});


/**
 * Controller for Adding or Editing a Request Header.
 */
clientApp.controller('HeaderModalInstanceCtrl', function ($scope, $modalInstance, currentHeader, headers, 
		customHeaders, selectedHeader, headersHelper, GENERAL_CONSTANTS) {

	//Default to not adding to favorites.
	$scope.favorite = false;

	//Check if this is an edit operation.
	if (currentHeader) {
		//Add the existing header object to the scope so it can be used in the modal.
		$scope.header = currentHeader;
	}

	//Add the header to the main UI and, if required, persist it.
	$scope.ok = function() {

		//The object that will contain the new or updated header.
		var newHeader = {};

		//Editing a custom header.
		if (currentHeader && currentHeader.group) {
			//Ensure the updated custom header is persisted.
			$scope.favorite = true;
			newHeader = currentHeader;

			//Remove the older version from the UI.
			var index = customHeaders.indexOf(currentHeader);
			customHeaders.splice(index, 1);
		} else {
			var id = Date.now();
			if (currentHeader && currentHeader.id) {
				//Editing a standard header.
				id = currentHeader.id
			}
			newHeader = {
				id: id,
				name: $scope.header.name,
				value: $scope.header.value
			};

			//Add to the main UI.
			headers[id] = newHeader;
		}

		if ($scope.favorite) {
			var saveCopy = angular.copy(newHeader);
			saveCopy.id = Date.now();

			//Persist the custom header.
			saveCopy = headersHelper.prepareHeaderForDisplay(saveCopy, "Custom");
			var keyValue = {};
			keyValue[GENERAL_CONSTANTS.HEADER_KEY_FORMAT + saveCopy.id] = saveCopy;
			chrome.storage.sync.set(keyValue);

			//Update the dropdown.
			//TODO Some issues here. E.g. When editing a custom header, we'll get an empty selection in the dropdown.
			customHeaders.unshift(saveCopy);
			selectedHeader = customHeaders[0];
		}
		$modalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Various helper functions for the Headers functionality.
 */
clientApp.service('headersHelper', function(GENERAL_CONSTANTS, EXAMPLE_HEADERS) {
	var helper = this;

	/**
	 * Add the specified group name to each header object and generate a label used to display them.
	 */
	helper.prepareHeadersForDisplay = function(headers, group) {
		for (var header of headers) {
			helper.prepareHeaderForDisplay(header, group);
		}
		return headers;
	};

	/**
	 * Add the specified group name to the specified header object and generate a label used to display them.
	 */
	helper.prepareHeaderForDisplay = function(header, group) {
		header['group'] = group;
		header['label'] = header.name + ": " + header.value;
		return header;
	};

	/**
	 * Display a combined list of example headers and any saved custom headers.
	 */
	helper.displayCustomAndExampleHeaders = function($scope) {

		//Load the saved custom request headers from Chrome Storage.
		chrome.storage.sync.get(null, function (objects) {
			//Add each valid custom header object to the array.
			var savedHeaders = [];
			for (var key in objects) {
				if (helper.isHeaderKey(key)) {
					savedHeaders.push(objects[key]);
				}
			}

			//Prepare the headers for display.
			savedHeaders = helper.prepareHeadersForDisplay(savedHeaders, "Custom");
			var exampleHeaders = helper.prepareHeadersForDisplay(EXAMPLE_HEADERS, "Examples")

			//Merge the custom headers and example headers.
			$scope.customHeaders = savedHeaders.concat(exampleHeaders);
			$scope.selectedHeader = $scope.customHeaders[0];
		});
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
