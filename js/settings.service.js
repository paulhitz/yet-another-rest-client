/**
 * Various helper functions for...
 */
clientApp.service('settings', function(GENERAL_CONSTANTS, utils) {
	var helper = this;
	var key = GENERAL_CONSTANTS.SETTINGS_KEY;

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
		chrome.storage.local.get(key, function(settings) {
			if (typeof(callback) === "function") {
				console.log(utils.stringify(settings));
				console.log(utils.stringify(settings[key]));
				callback(settings[key]);
			}
		});
	};

});
