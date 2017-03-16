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
			//TODO Consider the scenario where a user has exported a file greater than max import size.
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
				callback([{type: 'danger', msg: "Import Failed. The selected file is invalid. Please try again with a valid file."}]);
			} else {
				//Add each valid entry from the import file to the list of favorites.
				// var result = favorites.saveMultipleFavorites(content);
				// console.log("results returned", result);
				// if (result.errorMessage) {
				// 	message = [{type: 'danger', msg: "Error Importing Favorites. " + result.errorMessage}];
				// } else {
				// 	message = [{type: 'success', msg: result.numValidFavorites + " favorites successfully imported from " + file.name}];
				// }

				favorites.foo(content, 0, function(data) {
					if (angular.isNumber(data.result)) {
						message = [{type: 'success', msg: data.result + " favorites successfully imported."}];
					} else {
						message = [{type: 'danger', msg: "An Error Occurred: " + data.result}];
					}
					if (typeof(callback) === "function") {
						callback(message);
					}
				});



			}

			//Return a status message.
			if (typeof(callback) === "function") {
				callback([{type: 'success', msg: "Test early callback + late calback."}]);
			}
		};
		reader.readAsText(file);
	};
});
