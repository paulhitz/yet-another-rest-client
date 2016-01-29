
/**
 * Various helper functions for the application.
 */
clientApp.service('appHelper', function(utils, progressbar, GENERAL_CONSTANTS) {
	var helper = this;

	/**
	 * Handle the service response. Update UI, store details etc.
	 */
	helper.handleResponse = function($scope, response) {
		$scope.timerEnd = Date.now();
		helper.updateView($scope, response);
		if (helper.isValidResponse(response)) {
			helper.storeResponseDetails($scope, response);
		}
	};

	/**
	 * Update the UI with the data received from the service.
	 */
	helper.updateView = function($scope, response) {
		$scope.progress = progressbar.PROGRESS_STATES.COMPLETE;
		$scope.responseRequestUrl = $scope.requestUrl;
		$scope.responseRequestMethod = $scope.requestMethod.selected;
		if (helper.isValidResponse(response)) {
			response.headers().status = response.status;
			$scope.responseBody = utils.stringify(response.data);
			$scope.responseHeaders = utils.stringify(response.headers());
			$scope.requestHeaders = utils.stringify(response.config);
			$scope.responsePreviewFlag = helper.isHtml(response.headers()['content-type']);
		} else {
			$scope.responseBody = "'Invalid Request/Response'";
			$scope.responseHeaders = "";
			$scope.requestHeaders = "";
		}

		//Show the view.
		$scope.displayResponse = true;
		$scope.processing = false;
	};

	/**
	 * Persist the request/response so we have a history of them. Uses Chrome Storage.
	 */
	helper.storeResponseDetails = function($scope, response) {
		var entry = {
			date: Date(),
			request: $scope.requestUrl,
			method: $scope.requestMethod.selected,
			payload: $scope.payload,
			timer: $scope.timerEnd - $scope.timerStart,
			headers: response.config.headers
		};

		//Don't save overly large responses.
		var responseSize = helper.calculateObjectSize(response.data);
		if (responseSize > GENERAL_CONSTANTS.MAX_OBJECT_SIZE) {
			entry['size'] = responseSize;
		} else{
			entry['response'] = utils.stringify(response.data);
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
	 * Check that the response is a valid object.
	 */
	helper.isValidResponse = function(response) {
		return angular.isObject(response) && response.status && response.config;
	};

	/**
	 * Check that the response is a valid object.
	 */
	helper.isHtml = function(type) {
		return type && type.indexOf(GENERAL_CONSTANTS.HTML_CONTENT_TYPE) > -1;
	};
});
