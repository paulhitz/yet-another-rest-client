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
	 * Add the specified favorite. If it's a duplicate, it should replace the existing entry.
	 */
	helper.add = function(input) {
		//Replace...
		for (var i = 0; i < favorites.length; i++) {
			if (favorites[i].id == input.id) {
				favorites[i] = input;
				return;
			}
		}
		//or add a new one...
		favorites.push(input);
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
		favorite['date'] = Date.now();

		//Add to Chrome (Sync) Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + favorite.id;
		var keyValue = {};
		keyValue[key] = favorite;
		chrome.storage.sync.set(keyValue, function() {
			helper.add(favorite);
			if (typeof(callback) === "function") {
				callback();
			}
		});
	};


	/**
	 * Save multiple favorites. This is used for imports.
	 *
	 * TODO can chrome storage take a list of objects? So we don't have to import favorites individually?
	 */
	helper.saveMultipleFavorites = function(content) {
		var numValidFavorites = 0;
		for (var fav of content) {
			if (helper.isValidFavorite(fav)) {
				numValidFavorites++;
				helper.saveFavorite(fav);
			}
		}
		return numValidFavorites;
	};


	/**
	 * Delete a favorite based on ID.
	 */
	helper.deleteFavorite = function(id) {

		//Delete the entry from Chrome Storage.
		var key = GENERAL_CONSTANTS.FAVORITE_KEY_FORMAT + id;
		chrome.storage.sync.remove(key, function() {
			//Remove it from the local array which updates the UI.
			for (var i = favorites.length - 1; i >= 0; i--) {
				if (favorites[i].id === id) {
					favorites.splice(i, 1);
					break;
				}
			}
		});
	};


	/**
	 * Find the favorite with the matching ID.
	 */
	helper.findById = function(id) {
		for (var i = 0; i < favorites.length; i++) {
			if (favorites[i].id == id) {
				return favorites[i];
			}
		}
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

		//If it contains a HEADERS field, then check it's valid.
		if (angular.isDefined(fav.headers) && !angular.isObject(fav.headers)) {
			return false;
		}

		//If it contains an AUTH field, then check it's valid.
		if (angular.isDefined(fav.auth) && !angular.isObject(fav.auth)) {
			return false;
		}

		return true;
	};
});
