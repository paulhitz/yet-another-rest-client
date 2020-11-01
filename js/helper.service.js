
/**
 * Various helper functions for the application.
 */
clientApp.service('appHelper', function(utils, progressbar, history, auth, GENERAL_CONSTANTS, HTTP_STATUS_DESCRIPTIONS) {
	var helper = this;

	/**
	 * Handle the service response. Check it's valid, update UI, store details etc.
	 */
	helper.handleResponse = function($scope, response) {
		$scope.timerEnd = Date.now();

		$scope.response = {};
		$scope.response.valid = helper.isValidResponse(response);
		helper.updateView($scope, response);
		if ($scope.response.valid) {
			helper.storeResponseDetails($scope, response);
		}
	};

	/**
	 * Update the UI with the data received from the service.
	 */
	helper.updateView = function($scope, response) {
		$scope.progress = progressbar.PROGRESS_STATES.COMPLETE;
		$scope.response.requestUrl = $scope.requestUrl;
		$scope.response.requestMethod = $scope.requestMethod.selected;

		if ($scope.response.valid) {
			//Prepare the response data so it can be shown in the UI.
			angular.extend($scope.response, {
				'body': utils.stringify(response.data),
				'headers': utils.stringify(response.headers()),
				'status': helper.determineStatus(response.status, response.xhrStatus),
				'requestHeaders': utils.stringify(response.config),
				'previewFlag': helper.isHtml(response.headers()['content-type'])
			});
			$scope.response.statusText = helper.determineStatusText($scope.response.status, response.statusText);
		} else {
			angular.extend($scope.response, {
				'body': "",
				'headers': "",
				'requestHeaders': ""
			});
		}

		//Show the view.
		$scope.firstTab = {active: true};
		$scope.displayResponse = true;
		$scope.processing = false;
	};

	/**
	 * Determine the status value. Replace the generic XMLHttpRequest error value (-1) with
	 * something more descriptive.
	 */
	helper.determineStatus = function(status, xhrStatus) {
		if (status == GENERAL_CONSTANTS.HTTP_REQUEST_ERROR_STATUS) {
			return angular.isString(xhrStatus) ? xhrStatus.toUpperCase() : "";
		}
		return status;
	};

	/**
	 * Determine the best description for the HTTP status value.
	 */
	helper.determineStatusText = function(status, responseStatusText) {
		var statusText = HTTP_STATUS_DESCRIPTIONS[status];
		if (!statusText) {
			if (responseStatusText) {
				statusText = responseStatusText;
			} else {
				statusText = HTTP_STATUS_DESCRIPTIONS.UNKNOWN;
			}
		}
		return statusText;
	};

	/**
	 * Persist the request/response so we have a history of them.
	 */
	helper.storeResponseDetails = function($scope, response) {
		var entry = {
			'date': Date(),
			'request': $scope.requestUrl,
			'method': $scope.requestMethod.selected,
			'payload': $scope.payload,
			'timer': $scope.timerEnd - $scope.timerStart,
			'headers': response.config.headers,
			'status': $scope.response.status,
			'statusText': $scope.response.statusText,
			'auth': auth.get()
		};

		//Don't save overly large responses.
		var responseSize = helper.calculateObjectSize(response.data);
		if (responseSize === -1 || responseSize > GENERAL_CONSTANTS.MAX_OBJECT_SIZE) {
			entry['size'] = responseSize;
		} else{
			entry['response'] = utils.stringify(response.data);
		}

		//Persist it using Chrome Storage.
		history.set(entry);
	};

	/**
	 * Return an approximation of the object size. Storing large responses (e.g. base64 encoded PDFs)
	 * can lead to performance issues so we need to be able to identify large objects.
	 */
	helper.calculateObjectSize = function(response) {
		var size;
		try {
			size = utils.estimateObjectSize(response);
		} catch (e) {
			//Play it safe in case there are edge cases that cause the funtion to misbehave.
			size = -1;
		}
		return size;
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
