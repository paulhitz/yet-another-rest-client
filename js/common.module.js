/**
 * Common utility functions not tied to any particular application.
 */
angular.module('common', []).service('utils', function() {
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
});
