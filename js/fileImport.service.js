/**
 * Various helper functions for the file import functionality.
 */
clientApp.service('fileImport', function(favorites, GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Check that the specified File is valid.
	 */
	helper.isValidFile = function(file) {
		//Check file object.
		if (angular.isUndefined(file) || !angular.isObject(file)) {
			return false;
		}

		//Check file size.
		if (angular.isUndefined(file.size) || file.size > GENERAL_CONSTANTS.MAX_IMPORT_FILE_SIZE) {
			return false;
		}

		//check file extension.
		if (angular.isUndefined(file.name) || file.name.indexOf('.json') == -1) {
			return false;
		}
		return true;
	};

	/**
	 * Check that the specified content is in the expected format.
	 */
	helper.hasValidContent = function(content) {
		return angular.isObject(content) && angular.isArray(content);
	};

	/**
	 * Import the contents of the file. The contents will be loaded and any valid favorites will be saved.
	 */
	helper.importFile = function(file, callback) {

		var reader = new FileReader();
		reader.onload = function(evt) {
			var content;
			try {
				//Convert the file contents to a JSON object.
			  content = angular.fromJson(evt.target.result);
			} catch (e) {
				//Do nothing. The next check will find any issues with the conversion.
			}

			var message;
			if (!helper.hasValidContent(content)) {
				message = [{type: 'danger', msg: "Import Failed. The selected file is invalid. Please try again with a valid file."}];
			} else {
				//Add each valid entry from the import file to the list of favorites.
				var numValidFavorites = favorites.saveMultipleFavorites(content);
				message = [{type: 'success', msg: numValidFavorites + " favorites successfully imported from " + file.name}];
			}

			//Return a status message.
			if (typeof(callback) === "function") {
				callback(message);
			}
		};
		reader.readAsText(file);
	};
});
