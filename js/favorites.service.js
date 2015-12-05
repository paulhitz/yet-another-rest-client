
/**
 * Handles CRUD operations for Favorites.
 */
clientApp.service('favorites', function(GENERAL_CONSTANTS) {
	var helper = this;

	//The list of user favorites.
	var favorites = [];

	/**
	 * Return the list of favorites.
	 */
	helper.get = function() {
		return favorites;
	};


	/**
	 * Retrieve the saved list of favorites from Chrome Storage.
	 */
	helper.retrieveFavorites = function() {
		chrome.storage.sync.get(null, function (savedFavorites) {
			for (var key in savedFavorites) {
				var favorite = savedFavorites[key];
				if (helper.isValidKey(key)) {
					favorites.push(favorite);
				}
			}
		});
	};


	/**
	 * Save the provided data as a favorite. It will now appear in the favorites section.
	 *
	 * Note: Imported favorites will replace existing favorites with the same ID.
	 */
	helper.saveFavorite = function(favorite, callback) {
		favorite['date'] = Date();

		//Add to Chrome (Sync) Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + favorite.id;
		var keyValue = {};
		keyValue[key] = favorite;
		chrome.storage.sync.set(keyValue, function() {
			console.log("Test Chrome Storage error: ", chrome.runtime.lastError);
			favorites.push(favorite);
			if (typeof(callback) === "function") { //TODO is the callback still needed?
				callback(favorites.length);
			}
		});
	};


	/**
	 * Delete a favorite based on ID.
	 */
	helper.deleteFavorite = function(id) {

		//Delete the entry from Chrome Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + id;
		chrome.storage.sync.remove(key, function() {
			console.log("Test Chrome Storage error: ", chrome.runtime.lastError);
			//Remove it from the local array which updates the UI. TODO confirm this works correctly.
			for (var i = favorites.length - 1; i >= 0; i--) {
				if (favorites[i].id === id) {
					favorites.splice(i, 1);
					break;
				}
			}
		});
	};


	/**
	 * Ensure that the specified key is in the correct format.
	 */
	helper.isValidKey = function(key) {
		if (key.indexOf(GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT) > -1) {
			return true;
		}
	};


	/**
	 * Ensure that the specified favorite contains all the required fields.
	 *
	 * Mandatory: id, name, url, request method.
	 * Optional: payload, headers.
	 */
	helper.isValidFavorite = function(fav) {

		//Check it's an object.
		if (angular.isUndefined(fav) || !angular.isObject(fav)) {
			return false;
		}

		//Check it contains all manadatory fields.
		if (angular.isUndefined(fav.id)
				|| angular.isUndefined(fav.name)
				|| angular.isUndefined(fav.url)
				|| angular.isUndefined(fav.method)) {
			return false;
		}

		//If it contains a HEADERS field, then check those are valid.
		if (angular.isDefined(fav.headers)) {
			//TODO check the headers are in the correct format. An array?
		}

		//TODO Do we need to check for a valid payload field?

		return true;
	};
});
