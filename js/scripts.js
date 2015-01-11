var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common']);


/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, AuthService, clientAppHelper, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	if (typeof chrome != 'undefined') {
		$scope.version = "v" + chrome.runtime.getManifest()['version'];
	}

	//Populate the form.
	$scope.service = advancedSettings;
	$scope.environments = SERVICES_CONFIG.environments;
	$scope.environmentSelected = SERVICES_CONFIG.environments[0].id;
	$scope.services = SERVICES_CONFIG.services;
	$scope.serviceSelected = SERVICES_CONFIG.services[0].id;
	$scope.placeholderDuns = SERVICES_CONFIG.placeholderDuns;

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.copyMessage = "";
		$scope.displayResponse = false;
		$scope.processing = true;

		//Update Progress Bar.
		$scope.progress = ProgressbarService.getProgressState('START');

		//Delete cookies that can interfere with authentication.
		clientAppHelper.deleteCookies();

		//Retrieve an Authorisation Token based on the selected environment.
		//TODO Consider using an interceptor for authentication and handling the callService success/failure here. 
		var authEndpoint = clientAppHelper.configureServiceUrl($scope.environmentSelected, "auth");
		AuthService.getAuthCookie(authEndpoint).then(
			function(success) {
				$scope.authenticationToken = success.authorization;

				//Determine the configured service endpoint.
				if (advancedSettings.requestUrl) {
					//If the user has entered a specific endpoint, just use that.
					$scope.requestUrl = advancedSettings.requestUrl;
				} else {
					$scope.requestUrl = clientAppHelper.configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.duns);
				}

				//Call the endpoint.
				$scope.progress = ProgressbarService.getProgressState('IN_PROGRESS');
				clientAppHelper.callService($scope);
			},
			function(error) {
				$scope.alerts.push({type: 'danger', msg: "An error occurred while authenticating."});
				$scope.alerts.push({type: 'info', msg: "You may want to try Incognito Mode or clear your cache. An existing application session can break authentication."});
				$scope.processing = false;
			}
		);
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
 * Various helper functions for the application. TODO move this to it's own js file for easy testing. What naming convention is used?
 */
clientApp.service('clientAppHelper', function($http, $location, $anchorScroll, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	var helper = this;

	/**
	 * Based on the selected environment and service, determine the correct URL to use.
	 */
	helper.configureServiceUrl = function(environmentSelected, serviceSelected, dunsSelected) {
		var url = "";
		var duns = SERVICES_CONFIG.placeholderDuns;

		//Determine the endpoint based on selected Environment and Service.
		for (var i in SERVICES_CONFIG.endpoints) {
			var endpoint = SERVICES_CONFIG.endpoints[i];
			if (endpoint.env === environmentSelected && endpoint.service === serviceSelected) {
				url = endpoint.url;
				break;
			}
		}

		//Replace the DUNS placeholder.
		if (dunsSelected) {
			duns = utils.replaceAll(dunsSelected, "-", "");
		}
		if (url) {
			url = url.replace("{duns}", duns);
		}
		return url;
	};

	/**
	 * Call the specified endpoint and update the UI.
	 */
	helper.callService = function($scope) {
		var requestConfig = { headers: {
			'Authorization': $scope.authenticationToken,
			'ApplicationId': advancedSettings.appId
		}};

		//Determine if this should be a GET or POST request.
		var promise;
		if (advancedSettings.payload) {
			requestConfig.headers['Accept'] = "application/json";
			requestConfig.headers['Content-Type'] = "application/json";
			promise = $http.post($scope.requestUrl, advancedSettings.payload, requestConfig);
		} else {
			promise = $http.get($scope.requestUrl, requestConfig);
		}

		promise.then(function(success) {
			helper.populateView($scope, success);
			helper.displayView($scope);
		}, function(error) {
			helper.populateView($scope, error);
			helper.displayView($scope);
		});
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

