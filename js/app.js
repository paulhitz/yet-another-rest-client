var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common']);


/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, $log, AuthService, clientAppHelper, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	if (typeof chrome != 'undefined') {
		$scope.version = "v" + chrome.runtime.getManifest()['version'];
	}

	//Populate the form.
	$scope.service = advancedSettings;
	$scope.environments = SERVICES_CONFIG.environments;
	$scope.environmentSelected = SERVICES_CONFIG.environments[1].id;
	$scope.services = SERVICES_CONFIG.services;
	$scope.serviceSelected = SERVICES_CONFIG.services[0].id;
	$scope.placeholder = SERVICES_CONFIG.placeholder;
	$scope.alerts = [];

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.copyMessage = "";
		$scope.displayResponse = false;
		$scope.processing = true;

		//Update Progress Bar.
		$scope.progress = ProgressbarService.getProgressState('START');

		if (advancedSettings.autoAuthenticate) {
			//Delete cookies that can interfere with authentication.
			clientAppHelper.deleteCookies();

			//Retrieve an Authentication Token based on the selected environment.
			var authEndpoint = clientAppHelper.configureServiceUrl($scope.environmentSelected, "auth");
			AuthService.getAuthCookie(authEndpoint).then(
				function(success) {
					clientAppHelper.configureAndCallService($scope, success.authorization, advancedSettings.requestUrl);
				},
				function(error) {
					$log.error(error);
					$scope.alerts.push({type: 'danger', msg: "An error occurred while authenticating."});
					$scope.alerts.push({type: 'info', msg: "Please check the user ID and password. If the problem persists, you may want to try Incognito Mode or clear your cache. If the issue is solely with a particular environment, then the Authentication Service for that environment may be down."});
					$scope.processing = false;
				}
			);
		} else {
			clientAppHelper.configureAndCallService($scope, "<Auto-Authentication Disabled>", advancedSettings.requestUrl);
		}
	}

	//Remove the selected alert/error.
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};

	//Display a warning if the production environment is selected and remove credentials.
	$scope.changeEnvironment = function(env) {
		if (env === SERVICES_CONFIG.environments[2].id) {
			$scope.alerts.push({type: 'warning', msg: "Please be careful using the PRODUCTION environment. A valid production user and password need to be specified. To avoid locking the account, the STG/QA credentials have been removed."});
			$scope.service.userId = "";
			$scope.service.password = "";
		} else {
			$scope.alerts = [];
		}
	};
});


/**
 * Retrieves an Authentication Token for a specified environment.
 */
clientApp.service('AuthService', function($http, $q, advancedSettings) {
	var cachedAuthTokens = [];

	this.getAuthCookie = function(authEndpoint) {
		var deferred = $q.defer();

		if (typeof cachedAuthTokens[authEndpoint] !== 'undefined') {
			deferred.resolve({authorization: cachedAuthTokens[authEndpoint]});
		} else {
			var AUTHENTICATION_REQUEST_CONFIG = { headers: {
				'ApplicationId': advancedSettings.appId,
				'x-dnb-user': advancedSettings.userId,
				'x-dnb-pwd': advancedSettings.password
			}};

			$http.get(authEndpoint, AUTHENTICATION_REQUEST_CONFIG).
				success(function(data, status, headers, config) {
					cachedAuthTokens[authEndpoint] = headers('authorization');
					deferred.resolve({authorization: headers('authorization')});
				}).
				error(function(msg, code) {
					deferred.reject({msg: msg, code: code});
				}
			);
		}
		return deferred.promise;
	};
});


/**
 * Simple controller for toggling a value.
 */
clientApp.controller('ToggleCtrl', function($scope) {
	$scope.toggle = function(status) {
		$scope.status = !status;
	}
});


/**
 * Various helper functions for the application.
 */
clientApp.service('clientAppHelper', function($http, $location, $anchorScroll, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	var helper = this;

	/**
	 * Based on the selected environment and service, determine the correct URL to use.
	 */
	helper.configureServiceUrl = function(environmentSelected, serviceSelected, parameter) {
		var url = "";

		//Determine the endpoint based on selected Environment and Service.
		for (var i in SERVICES_CONFIG.endpoints) {
			var endpoint = SERVICES_CONFIG.endpoints[i];
			if (endpoint.service === serviceSelected && (endpoint.env === "" || endpoint.env === environmentSelected)) {
				url = endpoint.url;
				break;
			}
		}

		//Remove dashes from the optional parameter and add it to the URL.
		var placeholder = SERVICES_CONFIG.placeholder;
		if (parameter) {
			placeholder = utils.replaceAll(parameter, "-", "");
		}
		if (url) {
			url = url.replace("{placeholder}", placeholder);
		}
		return url;
	};

	/**
	 * Determine the service endpoint to use and call the service.
	 */
	helper.configureAndCallService = function($scope, token) {
		$scope.authenticationToken = token;

		//Determine the configured service endpoint.
		if (advancedSettings.requestUrl) {
			//If the user has entered a specific endpoint, just use that.
			$scope.requestUrl = advancedSettings.requestUrl;
		} else {
			$scope.requestUrl = helper.configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.parameter);
		}

		//Call the endpoint.
		$scope.progress = ProgressbarService.getProgressState('IN_PROGRESS');
		helper.callService($scope);
	};

	/**
	 * Call the specified endpoint and update the UI.
	 */
	helper.callService = function($scope) {
		var requestConfig = { headers: {} };
		if (advancedSettings.autoAuthenticate) {
			requestConfig = { headers: {
				'Authorization': $scope.authenticationToken,
				'ApplicationId': advancedSettings.appId
			}};
		}

		//Determine the request method to use (GET/POST/PUT/DELETE).
		var promise;
		switch (advancedSettings.requestMethod) {
			case "post":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.post($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "put":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.put($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "delete":
				promise = $http.delete($scope.requestUrl, requestConfig);
				break;
			case "get":
			default:
				promise = $http.get($scope.requestUrl, requestConfig);
		}

		//Handle the response.
		promise.then(function(success) {
			helper.populateView($scope, success);
			helper.displayView($scope);
			helper.storeResponseDetails($scope.requestUrl, success.data, advancedSettings.requestMethod);
		}, function(error) {
			helper.populateView($scope, error);
			helper.displayView($scope);
		});
	};

	/**
	 * Add request headers indicating the type of payload. Used by POST/PUT operations.
	 */
	helper.addPayloadHeaders = function(headers) {
		headers['Accept'] = "application/json";
		headers['Content-Type'] = "application/json";
	};

	/**
	 * Persist the request/response so we have a history of them.
	 */
	helper.storeResponseDetails = function(requestUrl, response, requestMethod) {
		//Construct the new entry and save it.
		var entry = {
			'date': Date(),
			'request': requestUrl,
			'response': response,
			'method': requestMethod
		};
		var key = "restclient.history." + Date.now();
		localStorage[key] = JSON.stringify(entry);

		//Also use Chrome Storage to persist it.
		if (typeof chrome != 'undefined') {
			var keyValue = {};
			keyValue[key] = entry;
			chrome.storage.local.set(keyValue);
		}
	};

	/**
	 * Update the UI with the data received from the service.
	 */
	helper.populateView = function($scope, response) {
		$scope.progress = ProgressbarService.getProgressState('COMPLETE');
		response.headers().status = response.status;
		$scope.responseBody = JSON.stringify(response.data, null, 2);
		$scope.responseHeaders = JSON.stringify(response.headers(), null, 2);
		$scope.requestHeaders = JSON.stringify(response.config, null, 2);
	};

	/**
	 * Show the view and automatically scroll down to it.
	 */
	helper.displayView = function($scope) {
		$scope.displayResponse = true;
		$scope.processing = false;

		//Attempt to scroll to the response. This has issues.
		var old = $location.hash();
		$location.hash('response');
		$anchorScroll();
		$location.hash(old);
	};

	/**
	 * Delete cookies that can interfere with authentication.
	 */
	helper.deleteCookies = function() {
		if (typeof chrome != 'undefined') {
			chrome.cookies.remove({"url": "http://dnb.com", "name": "userid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "dnb_loginid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "redirect"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "ObSSOCookie"});
		}
	};
});


/**
 * Service for managing the progress bar.
 */
clientApp.service('ProgressbarService', function() {
	var PROGRESS_STATES = {
		START: { value: 10, label: 'Authenticating... ' },
		IN_PROGRESS: { value: 50, label: 'Making Service Request... ' },
		COMPLETE: { value: 100, label: 'Response Received' }
	};

	/**
	 * Return details about the specified state (percentage and a status label).
	 */
	this.getProgressState = function(progress) {
		return PROGRESS_STATES[progress];
	};
});

