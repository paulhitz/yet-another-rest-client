/**
 * Common utility functions not tied to any particular application.
 */
var common = angular.module('common', []);

common.service('utils', function() {
	var utils = this;

	/**
	 * Replace all occurrences of the target value with the replacement value.
	 */
	utils.replaceAll = function(input, target, replacement) {
		return input.split(target).join(replacement);
	};

	/**
	 * Copies the specified text to the clipboard.
	 */
	utils.copyToClipboard = function(text) {
		var copyFrom = $('<textarea/>');
		copyFrom.text(text);
		$('body').append(copyFrom);
		copyFrom.select();
		document.execCommand('copy', true);
		copyFrom.remove();
	};

	/**
	 * Identifies if the supplied object is empty.
	 */
	utils.isEmptyObject = function(object) {
		return angular.equals({}, object);
	};

	/**
	 * Stringify the input using standard spacing. Handles different input types
	 * such as Objects (JSON), Strings (HTML/XML) and Numbers.
	 */
	utils.stringify = function(input) {
		var returnValue = input;
		if (angular.isNumber(input)) {
			returnValue = "" + input;
		} else if (angular.isObject(input)) {
			returnValue = angular.toJson(input, true);
		}
		return returnValue;
	};

	/**
	 * Trigger a download of the specifed data.
	 */
	utils.download = function(blob, fileName) {
		var downloadLink = angular.element('<a></a>');
		downloadLink.attr('href', window.URL.createObjectURL(blob));
		downloadLink.attr('download', fileName);
		downloadLink[0].click();
	};

	/**
	 * Empties the supplied object without destroying the object so references will still work.
	 */
	utils.emptyObject = function(obj) {
		for (var property in obj) {
			delete obj[property];
		}
	};

	/**
	 * Update object properties without modifying the object reference.
	 */
	utils.updateObject = function(original, replacement) {
		utils.emptyObject(original);
		for (var property in replacement) {
			original[property] = replacement[property];
		}
	};

	/**
	 * Determine if a value is an object with a null prototype.
	 */
	utils.isBlankObject = function(obj) {
		return typeof obj === 'undefined'
				|| (obj !== null && typeof obj === 'object' && Object.getOwnPropertyNames(obj).length === 0);
	};

	/**
	 * Roughly calculates the size of the specified object using ECMA specified byte sizes.
	 *
	 * Note: This sacrifices accuracy for speed. It will typically over-estimate object size.
	 */
	utils.estimateObjectSize = function(object) {
		const ECMA_SIZE_CHAR = 2;
		const ECMA_SIZE_BOOLEAN = 4;
		const ECMA_SIZE_NUMBER = 8;

		if (angular.isObject(object)) {
			var bytes = 0;
			for (var key in object) {
				bytes += utils.estimateObjectSize(key);
				bytes += utils.estimateObjectSize(object[key]);
			}
			return bytes;

		} else if (angular.isString(object)) {
				return ECMA_SIZE_CHAR * object.length;

		} else if (angular.isNumber(object)) {
				return ECMA_SIZE_NUMBER;

		} else if (typeof object === 'boolean') {
				return ECMA_SIZE_BOOLEAN;
		}
		return 0;
	};
});


/**
 * Returns an object that is trusted by Angular for injecting into a page.
 */
common.filter('asTrusted', function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	};
});
