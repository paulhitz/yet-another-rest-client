/**
 * Various helper functions for the History functionality.
 */
clientApp.service('history', function(GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Retrieve all stored history requests from Chrome Storage.
	 */
	helper.get = function(callback) {
		chrome.storage.local.get(null, function (history) {
			//Add each history object to an array.
			var values = [];
			for (var key in history) {
				var entry = history[key];
				if (helper.isHistoryKey(key)) {
					//Add the key to the object so we can identify it later.
					entry['key'] = key;

					//Fix up the date format to enable simpler sorting and formatting.
					entry['date'] = new Date(entry['date']);
					values.push(entry);
				}
			}

			if (typeof(callback) === "function") {
				callback(values);
			}
		});
	};

	/**
	 * Save the provided data using Chrome Storage. Supports objects.
	 */
	helper.set = function(data) {
		var key = GENERAL_CONSTANTS.HISTORY_KEY_FORMAT + Date.now();
		var keyValue = {};
		keyValue[key] = data;
		chrome.storage.local.set(keyValue);
	};

	/**
	 * Delete request history from Chrome Storage based on ID.
	 */
	helper.delete = function(id, callback) {
		chrome.storage.local.remove(id, function() {
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};

	/**
	 * Delete all request history. Since Chrome LOCAL Storage is only used for the request history,
	 * we can simply clear it rather than specifying individual entries.
	 */
	helper.deleteAll = function(callback) {
		chrome.storage.local.clear(function() {
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};

	/**
	 * Ensure that the specified key is in the correct format for a key used to store history objects.
	 */
	helper.isHistoryKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.HISTORY_KEY_FORMAT) > -1) {
			return true;
		}
	};

	/**
	 * Convert the Request Headers into a format that the tool can use.
	 */
	helper.convertRequestHeaders = function(requestHeaders) {
		var headers = {};
		var id = Date.now();
		for (var name in requestHeaders) {
			id++;
			headers[id] = {'id': id, 'name': name, 'value': requestHeaders[name]};
		}
		return headers;
	};
});
