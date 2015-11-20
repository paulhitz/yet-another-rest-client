/**
 * Common utility functions not tied to any particular application.
 */
var common = angular.module('common', []);

common.service('utils', function() {
	var utils = this;

	/**
	 * Replace all occurrences of the target value with the replacement value.
	 */
	utils.replaceAll = function (input, target, replacement) {
		return input.split(target).join(replacement);
	};

	/**
	 * Copies the specified text to the clipboard.
	 */
	utils.copyToClipboard = function (text) {
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
	 * such as Objects (JSON) and Strings (HTML/XML).
	 */
	utils.stringify = function (input) {
		var returnValue = input
		if (angular.isObject(input)) {
			returnValue = angular.toJson(input, true);
		}
		return returnValue;
	};
});

/**
 * A custom filter to convert a date to a format that Angular recognises.
 */
common.filter("asDate", function () {
	return function (input) {
		return new Date(input);
	};
});
