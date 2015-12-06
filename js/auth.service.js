/**
 * Authorization service. Contains business logic to aid in generating the Auth Header.
 */
clientApp.service('auth', function() {
	var helper = this;
	var authToken = {};

	helper.get = function() {
		return authToken;
	};

	helper.set = function(value) {
		authToken['value'] = value;
	};

	/**
	 * Generates a 'Basic Authorization' value.
	 */
	helper.generateBasicAuthHeader = function(name, password) {
		var unencoded = name + ":" + password;
		var encoded = btoa(unencoded);
		return "Basic " + encoded;
	};
});
