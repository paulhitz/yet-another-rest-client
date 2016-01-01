/**
 * Various helper functions for the custom request headers functionality.
 */
clientApp.service('headers', function(GENERAL_CONSTANTS, EXAMPLE_HEADERS, utils) {
	var helper = this;
	var headers = {};

	helper.get = function() {
		return headers;
	};

	helper.set = function(value) {
		utils.emptyObject(headers);
		angular.extend(headers, value);
	};

	/**
	 * Add the custom header to Chrome (Sync) Storage.
	 */
	helper.save = function(header, callback) {
		var keyValue = {};
		keyValue[GENERAL_CONSTANTS.HEADER_KEY_FORMAT + header.id] = header;
		chrome.storage.sync.set(keyValue, function() {
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};

	/**
	 * Delete a custom header from Chrome Storage based on ID.
	 */
	helper.delete = function(id, callback) {
		var key = GENERAL_CONSTANTS.HEADER_KEY_FORMAT + id;
		chrome.storage.sync.remove(key, function() {
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};

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
			var exampleHeaders = helper.prepareHeadersForDisplay(EXAMPLE_HEADERS, "Examples");

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
