/**
 * User settings service. Persists and loads user settings (e.g. dark mode).
 */
clientApp.service('settings', function(GENERAL_CONSTANTS, utils) {
	var helper = this;
	var key = GENERAL_CONSTANTS.SETTINGS_KEY;
	var settings = {};

	helper.get = function() {
		return settings;
	};

	/**
	 * Updates the object used by the current scope for updating the UI. (pass by reference)
	 */
	helper.set = function(input) {
		if (angular.isUndefined(input) || utils.isEmptyObject(input) || angular.isUndefined(input["darkMode"])) {
			input = {"darkMode" : false}; //Default to false.
		}
		if (utils.isEmptyObject(settings)) {
			utils.updateObject(settings, input);
		}
	};

	/**
	 * Persist the settings using Chrome (local) Storage.
	 */
	helper.save = function(settings) {
		var keyValue = {};
		keyValue[key] = settings;
		chrome.storage.local.set(keyValue);
	};

	/**
	 * Retrieve the saved settings from Chrome Storage.
	 */
	helper.load = function(callback) {
		chrome.storage.local.get(key, function(object) {
			var settings = object[key];
			helper.set(settings);
			if (typeof(callback) === "function") {
				callback(settings);
			}
		});
	};

});
