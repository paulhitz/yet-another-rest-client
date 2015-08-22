
/**
 * Various helper functions for the application.
 */
clientApp.service('clientAppHelper', function($http, utils, ProgressbarService, advancedSettings,
		SERVICES_CONFIG, credentials, GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Based on the selected environment and service, determine the correct URL to use.
	 */
	helper.configureServiceUrl = function(selectedEnvironment, selectedService, parameter) {
		var url = "";

		//Determine the endpoint based on selected Environment and Service.
		for (var endpoint of SERVICES_CONFIG.endpoints) {
			if (endpoint.service === selectedService && (endpoint.env === "" || endpoint.env === selectedEnvironment)) {
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
			$scope.requestUrl = helper.configureServiceUrl($scope.selectedEnvironment, $scope.selectedService, $scope.parameter);
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
				'ApplicationId': advancedSettings.credentials.appId
			}};
		}

		//Determine the request method to use (GET/POST/PUT/DELETE/HEAD/PATCH).
		var promise;
		$scope.timerStart = Date.now();
		switch (advancedSettings.requestMethod) {
			case "post":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.post($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "put":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.put($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "patch":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.patch($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "delete":
				promise = $http.delete($scope.requestUrl, requestConfig);
				break;
			case "head":
				promise = $http.head($scope.requestUrl, requestConfig);
				break;
			case "get":
				/* falls through */
			default:
				promise = $http.get($scope.requestUrl, requestConfig);
		}

		//Handle the service response.
		promise.then(function(success) {
			helper.handleResponse($scope, success);
		}, function(error) {
			helper.handleResponse($scope, error);
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
	 * Handle the service response. Update UI, store details etc.
	 */
	helper.handleResponse = function($scope, response) {
		helper.populateView($scope, response);
		helper.displayView($scope);
		helper.storeResponseDetails($scope, response.data);
	};

	/**
	 * Persist the request/response so we have a history of them. Uses Chrome Storage.
	 */
	helper.storeResponseDetails = function($scope, response) {
		//Construct the new entry.
		var entry = {
			date: Date(),
			request: $scope.requestUrl,
			response: helper.excludeLargeObjects(response),
			method: advancedSettings.requestMethod,
			timer: $scope.timerEnd - $scope.timerStart
		};
		if (advancedSettings.requestMethod === 'post' || advancedSettings.requestMethod === 'put') {
			entry['payload'] = advancedSettings.payload;
		}

		//Persist it using Chrome Storage. Supports objects.
		var key = "restclient.history." + Date.now();
		if (typeof chrome !== 'undefined') {
			var keyValue = {};
			keyValue[key] = entry;
			chrome.storage.local.set(keyValue);
		}
	};

	/**
	 * Storing large responses (e.g. base64 encoded PDFs) can lead to performance issues
	 * so we explicitly exclude them.
	 */
	helper.excludeLargeObjects = function(response) {
		var responseSize = sizeof(response);
		if (responseSize > GENERAL_CONSTANTS.MAX_OBJECT_SIZE) {
			return "The response was too large to store. Only responses less than "
				+ GENERAL_CONSTANTS.MAX_OBJECT_SIZE + " bytes in size will be stored. This response was approx "
				+ responseSize + " bytes.";
		}
		return response;
	};

	/**
	 * Update the UI with the data received from the service.
	 */
	helper.populateView = function($scope, response) {
		$scope.timerEnd = Date.now();
		$scope.progress = ProgressbarService.getProgressState('COMPLETE');
		response.headers().status = response.status;
		$scope.responseBody = JSON.stringify(response.data, null, GENERAL_CONSTANTS.INDENTATION_LEVEL);
		$scope.responseHeaders = JSON.stringify(response.headers(), null, GENERAL_CONSTANTS.INDENTATION_LEVEL);
		$scope.requestHeaders = JSON.stringify(response.config, null, GENERAL_CONSTANTS.INDENTATION_LEVEL);
	};

	/**
	 * Show the view.
	 */
	helper.displayView = function($scope) {
		$scope.displayResponse = true;
		$scope.processing = false;
	};

	/**
	 * Delete cookies that can interfere with authentication.
	 * NOTE: This will likely mess up any open OAM application sessions.
	 */
	helper.deleteCookies = function() {
		if (typeof chrome !== 'undefined') {
			chrome.cookies.remove({"url": "http://dnb.com", "name": "userid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "dnb_loginid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "redirect"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "ObSSOCookie"});
		}
	};

	/**
	 * Perform some Chrome specific operations that will only work in Chrome.
	 */
	helper.performChromeOperations = function($scope) {
		if (typeof chrome !== 'undefined') {
			$scope.chromeSupport = true;
			$scope.version = "v" + chrome.runtime.getManifest()['version'];
			helper.addUserDefinedServices($scope);
			helper.retrieveAndSetCredentials($scope.selectedEnvironment);
		}
	};

	/**
	 * Check if the necessary credentials have been provided.
	 */
	helper.areCredentialsPresent = function() {
		return advancedSettings.credentials
			&& advancedSettings.credentials.appId
			&& advancedSettings.credentials.userId
			&& advancedSettings.credentials.password;
	};

	/**
	 * Persist the credentials if they've changed.
	 */
	helper.persistCredentials = function(env) {
		//Check if the credentials have changed.
		var initialCredentials = credentials[env];
		var currentCredentials = advancedSettings.credentials;
		if (typeof initialCredentials === 'undefined'
				|| initialCredentials.appId !== currentCredentials.appId
				|| initialCredentials.userId !== currentCredentials.userId
				|| initialCredentials.password !== currentCredentials.password) {
			//Persist the updated credentials (include some other relevant data).
			currentCredentials.date = Date();
			currentCredentials.env = env;
			var keyValue = {};
			keyValue["restclient.credentials." + env] = currentCredentials;
			chrome.storage.sync.set(keyValue);
			credentials[env] = currentCredentials;
		}
	};

	/**
	 * Retrieve the stored credentials and set them for the current environment.
	 */
	helper.retrieveAndSetCredentials = function(selectedEnvironment) {
		var keys = ["restclient.credentials.qa", "restclient.credentials.stg", "restclient.credentials.prod"];
		chrome.storage.sync.get(keys, function (environments) {
			for (var key in environments) {
				//Use the stored credentials object to set the credentials for each environment.
				var currentCredentials = environments[key];
				credentials[currentCredentials.env] = currentCredentials;
			}

			//Set the initial credential in the UI.
			//Clone rather than pass by reference so we can determine later if the credentials have been modified.
			if (credentials[selectedEnvironment]) {
				advancedSettings.credentials = JSON.parse(JSON.stringify(credentials[selectedEnvironment]));
			}
		});
	};

	/**
	 * Add custom services that the user has previously saved.
	 */
	helper.addUserDefinedServices = function($scope) {
		chrome.storage.sync.get(null, function (services) {
			for (var key in services) {
				var service = services[key];
				if (service.serviceName && service.endpoint) {
					SERVICES_CONFIG.services.unshift(service.serviceName);
					SERVICES_CONFIG.endpoints.unshift(service.endpoint);
				}
			}
			$scope.$apply();
		});
	};

	/**
	 * Retrieve the Custom Services. Avoids going to Chrome Storage again.
	 */
	helper.getCustomServices = function() {
		var customServices = [];
		for (var service of SERVICES_CONFIG.services) {
			if (service.group === "Custom") {
				customServices.push(service);
			}
		}
		return customServices;
	};

	/**
	 * Return the service object with the specified id from the array.
	 */
	helper.findServiceById = function(id, services) {
		var serviceToDelete = {};
		for (var service of services) {
			if (service.id === id) {
				serviceToDelete = service;
				break;
			}
		}
		return serviceToDelete;
	};
});
