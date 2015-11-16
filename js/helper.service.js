
/**
 * Various helper functions for the application.
 */
clientApp.service('clientAppHelper', function($http, utils, ProgressbarService, advancedSettings,
		SERVICES_CONFIG, credentials, GENERAL_CONSTANTS, $rootScope) {
	var helper = this;

	/**
	 * Call the specified endpoint and update the UI.
	 */
	helper.callService = function($scope) {
		$scope.progress = ProgressbarService.getProgressState('IN_PROGRESS');

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
		switch ($scope.requestMethod) {
			case "POST":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.post($scope.requestUrl, $scope.payload, requestConfig);
				break;
			case "PUT":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.put($scope.requestUrl, $scope.payload, requestConfig);
				break;
			case "PATCH":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.patch($scope.requestUrl, $scope.payload, requestConfig);
				break;
			case "DELETE":
				promise = $http.delete($scope.requestUrl, requestConfig);
				break;
			case "HEAD":
				promise = $http.head($scope.requestUrl, requestConfig);
				break;
			case "GET":
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
			method: $scope.requestMethod,
			payload: $scope.payload,
			timer: $scope.timerEnd - $scope.timerStart
		};

		//Persist it using Chrome Storage. Supports objects.
		var key = GENERAL_CONSTANTS.HISTORY_KEY_FORMAT + Date.now();
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
			$rootScope.version = "v" + chrome.runtime.getManifest()['version'];
			helper.addUserDefinedServices($scope);
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
	 * Add custom services that the user has previously saved.
	 */
	helper.addUserDefinedServices = function($scope) {
		chrome.storage.sync.get(null, function (services) {
			for (var key in services) {
				var service = services[key];
				if (service.serviceName && service.endpoint) {
					SERVICES_CONFIG.typeahead.unshift(service.endpoint);
				}
			}
			$scope.$apply();
		});
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
