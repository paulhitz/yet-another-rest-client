/**
 * A controller responsible for handling the Request Headers.
 *
 * TODO This entire controller is a complete mess. It needs to be refactored.
 */
clientApp.controller('HeadersCtrl', function($scope, $modal, headerService, utils, GENERAL_CONSTANTS) {

	//The headers that should be added to subsequent requests.
	$scope.headers = headerService.get();

	//Display example headers and any saved custom headers.
	headerService.displayCustomAndExampleHeaders($scope);

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
		delete $scope.headers[header.id];
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
		return utils.isEmptyObject(object);
	};

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
		customHeaders, selectedHeader, headerService, GENERAL_CONSTANTS) {

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
				id = currentHeader.id;
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
			saveCopy = headerService.prepareHeaderForDisplay(saveCopy, "Custom");
			var keyValue = {};
			keyValue[GENERAL_CONSTANTS.HEADER_KEY_FORMAT + saveCopy.id] = saveCopy;
			chrome.storage.sync.set(keyValue);

			//Update the dropdown.
			//TODO Some issues here. E.g. When editing a custom header, we'll get an empty selection in the dropdown.
			customHeaders.unshift(saveCopy);
			selectedHeader = customHeaders[0];
		}
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
