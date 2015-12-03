
/**
 * Handles CRUD operations for Favorites.
 *
 * TODO handle import/export
 */
clientApp.service('favorites', function(GENERAL_CONSTANTS) {
	var helper = this;

	//
	var favorites = [];

	/**
	 * Return the list of favorites.
	 */
	helper.get = function() {
		return favorites;
	};

	/**
	 * Retrieve the saved list of favorites.
	 */
	helper.retrieveFavorites = function(callback) {
		chrome.storage.sync.get(null, function (savedFavorites) {
			for (var key in savedFavorites) {
				var favorite = savedFavorites[key];
				if (helper.isValidKey(key)) {
					favorites.push(favorite);
				}
			}
			if (typeof(callback) === "function") {
				callback(favorites.length);
			}
		});
	};

	/**
	 * Save the selected request details. It will now appear in favorites.
	 *
	 * TODO don't allow duplicates to be saved.
	 */
	helper.saveFavorite = function($scope, callback) {
		//Prepare the data for storage.
		var entry = {
			date: Date(),
			name: "",
			url: $scope.requestUrl,
			method: $scope.requestMethod,
			payload: $scope.payload,
			headers: []
		};

		//Add to Chrome (Sync) Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + Date.now();
		var keyValue = {};
		keyValue[key] = entry;
		chrome.storage.sync.set(keyValue, function() {
			favorites.push(entry);
			if (typeof(callback) === "function") {
				callback(favorites.length);
			}
		});
	};

	/**
	 * 
	 */
	helper.deleteFavorite = function(id) {
		console.log("Deleting");

		//Delete the entry from Chrome Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + header.id;
		chrome.storage.sync.remove(key);
	}

	/**
	 * Ensure that the specified key is in the correct format.
	 */
	helper.isValidKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT) > -1) {
			return true;
		}
	};
});
