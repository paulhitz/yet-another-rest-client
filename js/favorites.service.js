
/**
 * Handles CRUD operations for Favorites.
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
	 * TODO split this into 2 functions (create object, save) so the import can re-use the code. 
	 */
	helper.saveFavorite = function($scope, callback) {
		//Prepare the data for storage.
		var entry = {
			date: Date(),
			name: $scope.name,
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


	/**
	 * Ensure that the specified favorite contains all the required fields.
	 */
	helper.isValidFavorite = function(fav) {
		var valid = true;

		//If it's an object


		//The object contains an id element?


		//The object contains a date element?


		//The object contains a name element


		//The object contains a URL element


		//The object contains a METHOD element


		//If it contains a HEADERS element, then those are valid.


		//Do we need to check for a valid payload element?


		return valid;
	};
});


/*
  {
    "date": "Thu Dec 03 2015 12:22:02 GMT+0000 (GMT Standard Time)",
    "headers": {},
    "method": "GET",
    "name": "",
    "url": "http://www.paulhitz.com"
  }

*/