/**
 * A controller responsible for handling CRUD operations on custom request headers.
 */
clientApp.controller('HeadersCtrl', function($scope, $modal, headerService, utils, toaster, GENERAL_CONSTANTS) {

	//The headers that should be added to subsequent requests.
	$scope.headers = headerService.get();

	//Display example headers and any saved custom headers.
	headerService.displayCustomAndExampleHeaders($scope);

	//Add the selected custom header to the headers for the next request.
	$scope.useCustomHeader = function(header) {
		//Don't use the custom header directly so it can still be manipulated independently.
		var headerCopy = {id: Date.now(), name: header.name, value: header.value};
		$scope.headers[headerCopy.id] = headerCopy;
	};

	//Delete the selected custom header.
	$scope.deleteCustomHeader = function(header) {
		var index = $scope.customHeaders.indexOf(header);
		if (index > -1) {
			//Remove it from the UI.
			$scope.customHeaders.splice(index, 1);
			$scope.selectedHeader = $scope.customHeaders[0];
			toaster.success("", "The selected custom header has been deleted.");

			//Delete the entry from Chrome Storage. //TODO this should be in the service.
			var key = GENERAL_CONSTANTS.HEADER_KEY_FORMAT + header.id;
			chrome.storage.sync.remove(key);
		}
	};

	//Remove the selected header from the list of headers.
	$scope.removeCustomHeader = function(header) {
		delete $scope.headers[header.id];
	};

	//Identifies if the supplied object is empty.
	$scope.isEmptyObject = function(object) {
		return utils.isEmptyObject(object);
	};

	//Open a modal dialog to allow a new header to be entered or an existing header to be edited.
	$scope.openHeaderModal = function(currentHeader) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/headersModal.html',
			controller: 'HeaderModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				//Used for editing an existing header.
				currentHeader: function() {
					return currentHeader;
				}
			}
		});

		//Add the new/updated header to the UI and, if required, persist it.
		//TODO change 'favorite' to 'persist' everywhere.
		modalInstance.result.then(function(arr) {
			var name = arr[0];
			var value = arr[1];
			var favorite = arr[2];
			var newHeader = {name: name, value: value};

			//Editing a persisted custom header.
			if (currentHeader && currentHeader.group) {
				//Ensure the updated custom header is persisted.
				favorite = true;
				newHeader[id] = currentHeader.id;

				//Remove the older version from the UI.
				var index = $scope.customHeaders.indexOf(currentHeader);
				$scope.customHeaders.splice(index, 1);
			} else {
				//Adding a new custom header or editing an existing (non-persisted) header.
				var id = Date.now();
				if (currentHeader && currentHeader.id) {
					//This is an edit operation.
					id = currentHeader.id;
				}
				newHeader[id] = id;

				//Update the main UI.
				$scope.headers[id] = newHeader;
			}

			if (favorite) {
				var saveCopy = angular.copy(newHeader);
				saveCopy.id = Date.now(); //TODO what if it's an existing persisted header? BUG

				//Persist the custom header. TODO add to service.
				saveCopy = headerService.prepareHeaderForDisplay(saveCopy, "Custom");
				var keyValue = {};
				keyValue[GENERAL_CONSTANTS.HEADER_KEY_FORMAT + saveCopy.id] = saveCopy;
				chrome.storage.sync.set(keyValue);

				//Update the dropdown.
				$scope.customHeaders.unshift(saveCopy);
				$scope.selectedHeader = $scope.customHeaders[0];
			}
		});
	};
});


/**
 * Simple modal controller for Adding or Editing a custom request Header.
 */
clientApp.controller('HeaderModalInstanceCtrl', function ($scope, $modalInstance, currentHeader) {

	//Default to not adding to favorites.
	$scope.favorite = false;

	//Check if this is an edit operation. Add the current values to the modal if it is.
	if (currentHeader) {
		//Use a copy to break the data binding. Otherwise the UI is updated as the user types.
		$scope.header = angular.copy(currentHeader);
	}

	//Return the header name, header value and favorite flag.
	$scope.ok = function() {
		$modalInstance.close([$scope.header.name, $scope.header.value, $scope.favorite]);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
