/**
 * Various helper functions for the custom request headers functionality.
 */
clientApp.service('headers', function(GENERAL_CONSTANTS, utils) {
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
	 * Retrieve the saved custom request headers from Chrome Storage.
	 */
	helper.retrieve = function(callback) {
		chrome.storage.sync.get(null, function(objects) {
			var savedHeaders = [];

			//Add each valid custom header object to the array.
			for (var key in objects) {
				if (helper.isHeaderKey(key)) {
					savedHeaders.push(objects[key]);
				}
			}
			if (typeof(callback) === "function") {
				callback(savedHeaders);
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
	 * Ensure that the specified key is in the correct format for a key used to store header objects.
	 */
	helper.isHeaderKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.HEADER_KEY_FORMAT) > -1) {
			return true;
		}
	};
});
