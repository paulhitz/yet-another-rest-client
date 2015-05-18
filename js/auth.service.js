
/**
 * Retrieves an Authentication Token for a specified environment.
 */
clientApp.service('AuthService', function($http, $q, advancedSettings) {
	var cachedAuthTokens = [];
	var VALIDITY_PERIOD = 28800000; //8 hours.

	this.getAuthCookie = function(authEndpoint) {
		var deferred = $q.defer();

		if (this.isValidAuthTokenCached(cachedAuthTokens[authEndpoint])) {
			deferred.resolve({authorization: cachedAuthTokens[authEndpoint]['authToken']});
		} else {
			var AUTHENTICATION_REQUEST_CONFIG = { headers: {
				'ApplicationId': advancedSettings.credentials.appId,
				'x-dnb-user': advancedSettings.credentials.userId,
				'x-dnb-pwd': advancedSettings.credentials.password
			}};

			$http.get(authEndpoint, AUTHENTICATION_REQUEST_CONFIG).
				success(function(data, status, headers) {
					//Cache the result.
					var authenticatedCredentials = AUTHENTICATION_REQUEST_CONFIG.headers;
					authenticatedCredentials['authToken'] = headers('authorization');
					authenticatedCredentials['timestamp'] = Date.now();
					cachedAuthTokens[authEndpoint] = authenticatedCredentials;

					deferred.resolve({authorization: headers('authorization')});
				}).
				error(function(msg, code) {
					deferred.reject({msg: msg, code: code});
				}
			);
		}
		return deferred.promise;
	};

	/**
	 * Check if we have a previously cached authentication token. 
	 * This saves time and reduces dependency on the authentication server.
	 */
	this.isValidAuthTokenCached = function(authenticatedCredentials) {
		//Check if we have something cached for this environment
		if (typeof authenticatedCredentials !== 'undefined') {

			//Confirm it has an authentication token and it was for the same user, password and application.
			if (typeof authenticatedCredentials['authToken'] !== 'undefined'
					&& authenticatedCredentials['ApplicationId'] === advancedSettings.credentials.appId
					&& authenticatedCredentials['x-dnb-user'] === advancedSettings.credentials.userId
					&& authenticatedCredentials['x-dnb-pwd'] === advancedSettings.credentials.password) {

				//Check that the authentication token hasn't expired.
				if (authenticatedCredentials['timestamp'] + VALIDITY_PERIOD > Date.now()) {
					return true;
				}
			}
		}
		return false;
	};
});
