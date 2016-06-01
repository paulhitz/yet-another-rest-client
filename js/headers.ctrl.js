/**
 * A controller responsible for handling CRUD operations on custom request headers.
 */
clientApp.controller('HeadersCtrl', function($scope, $uibModal, headers, utils, toaster, GENERAL_CONSTANTS,
		COMMON_HEADERS) {

	//The headers that should be added to subsequent requests.
	$scope.headers = headers.get();

	//Load the saved custom request headers.
	headers.retrieve(function(savedHeaders) {

		//Prepare the headers for display.
		savedHeaders = headers.prepareHeadersForDisplay(savedHeaders, "Custom");
		var exampleHeaders = headers.prepareHeadersForDisplay(COMMON_HEADERS.EXAMPLES, "Examples");

		//Display a combined list of example headers and any saved custom headers.
		$scope.customHeaders = savedHeaders.concat(exampleHeaders);
		$scope.selectedHeader = $scope.customHeaders[0];
	});

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

			//Delete the entry from Chrome Storage.
			headers.delete(header.id, function() {
				toaster.success("", "The selected custom header has been deleted.");
				$scope.$apply();
			});
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
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/headersModal.html',
			controller: 'HeaderModalInstanceCtrl',
			resolve: {
				//Used when editing an existing header.
				currentHeader: currentHeader
			}
		});

		//Add the new/updated header to the UI and, if required, persist it.
		modalInstance.result.then(function(arr) {
			var name = arr[0];
			var value = arr[1];
			var persist = arr[2];
			var newHeader = {name: name, value: value};

			//Editing a persisted custom header.
			if (currentHeader && currentHeader.group) {
				//Ensure the updated custom header is persisted.
				persist = true;
				newHeader['id'] = currentHeader.id;

				//Remove the older version from the dropdown.
				var index = $scope.customHeaders.indexOf(currentHeader);
				$scope.customHeaders.splice(index, 1);
			} else {
				//Adding a new custom header or editing an existing (non-persisted) header.
				var id = Date.now();
				if (currentHeader && currentHeader.id) {
					id = currentHeader.id;
				}
				newHeader['id'] = id;

				//Update the main UI.
				$scope.headers[id] = newHeader;
			}

			if (persist) {
				//Persist the custom header.
				var copy = headers.prepareHeaderForDisplay(angular.copy(newHeader), "Custom");
				headers.save(copy);

				//Update the dropdown.
				$scope.customHeaders.unshift(copy);
				$scope.selectedHeader = $scope.customHeaders[0];
			}
		});
	};
});


/**
 * Simple modal controller for Adding or Editing a custom request Header.
 */
clientApp.controller('HeaderModalInstanceCtrl', function ($scope, $uibModalInstance, currentHeader, COMMON_HEADERS) {

	//Default to not persisting.
	$scope.persist = false;

	//Provide some common header names to help the user.
	$scope.commonHeaderNames = COMMON_HEADERS.NAMES;

	//Check if this is an edit operation. Add the current values to the modal if it is.
	if (currentHeader) {
		//Use a copy to break the data binding. Otherwise the UI is updated as the user types.
		$scope.header = angular.copy(currentHeader);
	}

	//Return the header name, header value and persist flag.
	$scope.ok = function() {
		$uibModalInstance.close([$scope.header.name, $scope.header.value, $scope.persist]);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
