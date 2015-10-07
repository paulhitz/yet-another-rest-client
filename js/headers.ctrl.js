/**
 * A controller responsible for handling the Request Headers.
 */
clientApp.controller('HeadersCtrl', function($scope, $modal, headersHelper) {

	//The headers that should be added to subsequent requests.
	$scope.headers = {};

	//Display example headers and any saved custom headers.
	headersHelper.displayFavoriteAndExampleHeaders($scope);

	//Add the selected header to the headers for the next request.
	$scope.addCustomHeader = function(header) {
		var headerCopy = angular.copy(header);
		var id = Date.now();
		headerCopy.id = id;
		$scope.headers[headerCopy.id] = headerCopy;
	};

	//Remove the selected from the list of headers.
	$scope.removeHeader = function(header) {
		delete $scope.headers[header.id]
	};

	//Identifies if the supplied object is empty.
	$scope.isEmptyObject = function(object){
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
				selectedHeader: function() {
					//This is used for editing an existing header.
					return angular.copy(row);
				},
				headers: function() {
					return $scope.headers;
				},
				favHeaders: function() {
					return $scope.favHeaders;
				}
			}
		});
	};
});


/**
 * Controller for ...
 */
clientApp.controller('HeaderModalInstanceCtrl', function ($scope, $modalInstance, selectedHeader, headers, favHeaders, GENERAL_CONSTANTS) {


/*
TODO
-handle persisting.
	-will we need some logic to check if the exact same entry has already been saved?


*/


	console.log("current = " + JSON.stringify(selectedHeader));
	console.log("headers = " + JSON.stringify(headers));
	//console.log("fav headers = " + JSON.stringify(favHeaders));





	//Default to not adding to favorites.
	$scope.favorite = false;

	//Check if this is an edit operation.
	if (selectedHeader) {
		//Add the existing header object to the scope so it can be used in the modal.
		$scope.header = selectedHeader;
	}

	//Add the header to the main UI and, if required, persist it.
	$scope.ok = function() {
		var id = Date.now();
		if (selectedHeader && selectedHeader.id) {
			//This must be an edit operation.
			id = selectedHeader.id;
		}
		var newHeader = {
			id: id,
			name: $scope.header.name,
			value: $scope.header.value
		};
		
		//Add to the main UI.
		headers[id] = newHeader;
		
		if ($scope.favorite) {
			//TODO also add to the dropdown list. (need to pass that in?).
			//TODO Should we check if they've changed?
		
			//Persist the custom header.
			var keyValue = {};
			keyValue[GENERAL_CONSTANTS.HEADER_KEY_FORMAT + id] = newHeader;
			chrome.storage.sync.set(keyValue);

			//Update the dropdown.
			newHeader['group'] = "Custom";
			newHeader['label'] = newHeader.name + ": " + newHeader.value;
			favHeaders.unshift(newHeader);
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
			header['group'] = group;
			header['label'] = header.name + ": " + header.value;
		}
		return headers;
	};

	/**
	 * Display a combined list of example headers and any saved custom headers.
	 */
	helper.displayFavoriteAndExampleHeaders = function($scope) {

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
			if (savedHeaders.length > 0) {
				savedHeaders = helper.prepareHeadersForDisplay(savedHeaders, "Custom");
			} else {
				savedHeaders = [ { group: 'Custom', label: 'None'} ];
			}
			var exampleHeaders = helper.prepareHeadersForDisplay(EXAMPLE_HEADERS, "Examples")

			//Merge the custom headers and example headers.
			$scope.favHeaders = savedHeaders.concat(exampleHeaders);
			$scope.selectedHeader = $scope.favHeaders[0];
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
