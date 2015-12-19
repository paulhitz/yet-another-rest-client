/**
 * Constructs the HTTP request and allows cancellation of requests.
 */
clientApp.service('requests', function($http, $q, appHelper, auth, headerService) {
	var helper = this;
	var canceller;

	/**
	 * Cancel the current request.
	 */
	helper.cancel = function() {
		if (canceller) {
			canceller.resolve("cancel");
		}
	};

	/**
	 * Configure the HTTP call and return the promise.
	 */
	helper.call = function($scope) {
		var headers = helper.addHeaders($scope.payload);
		canceller = $q.defer();
		$scope.timerStart = Date.now();
		var promise = $http({
			method: $scope.requestMethod,
			url: $scope.requestUrl,
			headers: headers,
			data: $scope.payload,
			timeout: canceller.promise
		});
		return promise;
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
		return headers;
	};
});
