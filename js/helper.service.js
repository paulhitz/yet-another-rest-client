
/**
 * Various helper functions for the application.
 */
clientApp.service('clientAppHelper', function($http, utils, ProgressbarService, favorites, GENERAL_CONSTANTS,
			$rootScope, auth, headerService) {
	var helper = this;

	/**
	 * Call the specified endpoint and update the UI.
	 */
	helper.callService = function($scope) {
		$scope.progress = ProgressbarService.PROGRESS_STATES.IN_PROGRESS;

		//Configure the HTTP call and send the request.
		var headers = helper.addHeaders($scope.payload);
		var promise;
		$scope.timerStart = Date.now();
		promise = $http({
			method: $scope.requestMethod,
			url: $scope.requestUrl,
			headers: headers,
			data: $scope.payload
		});

		//Handle the service response.
		promise.then(function(success) {
			helper.handleResponse($scope, success);
		}, function(error) {
			helper.handleResponse($scope, error);
		});
	};

	/**
	 * Add custom headers, auth header and payload headers.
	 */
	helper.addHeaders = function(payload) {
		var headers = {};

		//Add custom headers.
		var customHeaders = headerService.get();
		for (var key in customHeaders) {
			var customHeader = customHeaders[key];
			headers[customHeader.name] = customHeader.value;
		}

		//Add Auth header (if available).
		if (auth.get().value) {
			headers['Authorization'] = auth.get().value;
		}

		//Add specific payload headers if a payload exists.
		if (payload) {
			headers = helper.addPayloadHeaders(headers);
		}
		return headers;
	};

	/**
	 * Add request headers indicating the type of payload. Used by POST/PUT/PATCH operations.
	 */
	helper.addPayloadHeaders = function(headers) {

		//Only add them automatically if the user hasn't manually specified them already.
		if (!headers['Accept']) {
			headers['Accept'] = "application/json";
		}
		if (!headers['Content-Type']) {
			headers['Content-Type'] = "application/json";
		}
		return headers;
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
	 * Update the UI with the data received from the service.
	 */
	helper.populateView = function($scope, response) {
		$scope.timerEnd = Date.now();
		$scope.progress = ProgressbarService.PROGRESS_STATES.COMPLETE;
		$scope.responseRequestUrl = $scope.requestUrl;
		$scope.responseRequestMethod = $scope.requestMethod;
		response.headers().status = response.status;
		$scope.responseBody = utils.stringify(response.data);
		$scope.responseHeaders = utils.stringify(response.headers());
		$scope.requestHeaders = utils.stringify(response.config);
	};

	/**
	 * Show the view.
	 */
	helper.displayView = function($scope) {
		$scope.displayResponse = true;
		$scope.processing = false;
	};

	/**
	 * Persist the request/response so we have a history of them. Uses Chrome Storage.
	 */
	helper.storeResponseDetails = function($scope, response) {
		//Construct the new entry.
		var entry = {
			date: Date(),
			request: $scope.requestUrl,
			method: $scope.requestMethod,
			payload: $scope.payload,
			timer: $scope.timerEnd - $scope.timerStart,
			headers: helper.addHeaders($scope.payload) //TODO should we cache this?
		};

		//Don't save overly large responses.
		var responseSize = helper.calculateObjectSize(response);
		if (responseSize > GENERAL_CONSTANTS.MAX_OBJECT_SIZE) {
			entry['size'] = responseSize;
		} else{
			entry['response'] = response;
		}

		//Persist it using Chrome Storage. Supports objects.
		var key = GENERAL_CONSTANTS.HISTORY_KEY_FORMAT + Date.now();
		if (typeof chrome !== 'undefined') {
			var keyValue = {};
			keyValue[key] = entry;
			chrome.storage.local.set(keyValue);
		}
	};

	/**
	 * Return an approximation of the object size. Storing large responses (e.g. base64 encoded PDFs)
	 * can lead to performance issues.
	 */
	helper.calculateObjectSize = function(response) {
		return sizeof(response);
	};

	/**
	 * Perform some Chrome specific operations that will only work in Chrome.
	 *
	 * TODO Does this make sense? It's a Chrome extension. Do we need to call out Chrome operations?
	 */
	helper.performChromeOperations = function($scope) {
		if (typeof chrome !== 'undefined') {
			$scope.chromeSupport = true;
			$rootScope.version = "v" + chrome.runtime.getManifest()['version'];
			favorites.retrieveFavorites();
		}
	};
});
