var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs']);

/* The default settings to use. */
var ADVANCED_SETTINGS = {
	"requestUrl" : "",
	"appId" : "36",
	"userId" : "teamjoly@dnb.com",
	"password" : "password",
	"payload" : ""
};

/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientController', function($scope, $http, $location, $anchorScroll, AuthService) {

	//Populate the form.
	$scope.service = ADVANCED_SETTINGS;
	$scope.environments = servicesConfig.environments;
	$scope.environmentSelected = servicesConfig.environments[0].id;
	$scope.services = servicesConfig.services;
	$scope.serviceSelected = servicesConfig.services[0].id;

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.displayResponse = false;
		$scope.processing = true;

		//Update Progress Bar.
		updateProgressbar($scope, 10, 'Authenticating... ');

		//Retrieve an Authorisation Token based on the selected environment.
		var authEndpoint = clientApp.configureServiceUrl($scope.environmentSelected, "auth");
		AuthService.getAuthCookie(authEndpoint).then(
			function(payload) {
				$scope.authenticationToken = payload.authorization;

				//Determine the configured service endpoint.
				if (ADVANCED_SETTINGS.requestUrl) {
					//If the user has entered a specific endpoint, just use that.
					$scope.requestUrl =  ADVANCED_SETTINGS.requestUrl;
				} else {
					$scope.requestUrl = clientApp.configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.duns);
				}

				//Call the endpoint.
				updateProgressbar($scope, 50, 'Making Service Request... ');
				clientApp.callService($scope, $http, $location, $anchorScroll);
			},
			function(error) {
				var errorMessage = "An error occurred while authenticating... " + error.msg + ". Error Code: " + error.code;
				$scope.alerts.push({type: 'danger', msg: errorMessage});
				$scope.processing = false;
			}
		);
	}

	//Remove the selected alert/error.
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});


/**
 * Retrieves an Authentication Token for a specified environment.
 */
clientApp.factory('AuthService', function($http, $q) {
	var cachedAuthTokens = [];

	return {
		getAuthCookie: function(authEndpoint) {
			var deferred = $q.defer();

			if (typeof cachedAuthTokens[authEndpoint] !== 'undefined') {
				deferred.resolve({authorization: cachedAuthTokens[authEndpoint]});
			} else {
				var AUTHENTICATION_REQUEST_CONFIG = { headers: {
					'ApplicationId': ADVANCED_SETTINGS.appId,
					'x-dnb-user': ADVANCED_SETTINGS.userId,
					'x-dnb-pwd': ADVANCED_SETTINGS.password
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
		}
	}
});


/**
 * Based on the selected environment and service, determine the correct URL to use.
 */
clientApp.configureServiceUrl = function (environmentSelected, serviceSelected, dunsSelected) {
	var url = "";
	var duns = servicesConfig.placeholderDuns;

	//Determine the endpoint based on selected Environment and Service.
	for (var i in servicesConfig.endpoints) {
		var endpoint = servicesConfig.endpoints[i];
		if (endpoint.env === environmentSelected && endpoint.service === serviceSelected) {
			url = endpoint.url;
			break;
		}
	}

	//Replace the DUNS placeholder.
	if (dunsSelected) {
		duns = replaceAll(dunsSelected, "-", "");
	}
	if (url) {
		url = url.replace("{duns}", duns);
	}
	return url;
};


/**
 * Call the specified endpoint and update the UI.
 */
clientApp.callService = function ($scope, $http, $location, $anchorScroll) {
	var requestConfig = { headers: {
		'Authorization': $scope.authenticationToken,
		'ApplicationId': ADVANCED_SETTINGS.appId
	}};

	//Determine if this should be a GET or POST request.
	var promise;
	if (ADVANCED_SETTINGS.payload) {
		requestConfig.headers['Accept'] = "application/json";
		requestConfig.headers['Content-Type'] = "application/json";
		promise = $http.post($scope.requestUrl, ADVANCED_SETTINGS.payload, requestConfig);
	} else {
		promise = $http.get($scope.requestUrl, requestConfig);
	}

	promise.then(function(success) {
		populateView($scope, success.data, success.headers(), success.config, success.status);
		displayView($scope, $location, $anchorScroll);
	}, function(error) {
		populateView($scope, error.data, error.headers(), error.config, error.status);
		displayView($scope, $location, $anchorScroll);
	});
};


/**
 * Simple controller for toggling a value.
 */
clientApp.controller('ToggleController', function($scope) {
	$scope.toggle = function(status) {
		$scope.status = !status;
	}
});


 /**
  * Replace all occurrences of the target value with the replacement value.
  */
function replaceAll(input, target, replacement) {
	return input.split(target).join(replacement);
}


/**
 * Update the UI with the data received from the service.
 */
function populateView($scope, data, headers, config, status) {
	updateProgressbar($scope, 100, 'Response Received');
	headers['status'] = status;
	$scope.responseBody = JSON.stringify(data, null, 2);
	$scope.responseHeaders = JSON.stringify(headers, null, 2);
	$scope.requestHeaders = JSON.stringify(config, null, 2);
}


/**
 * Show the view and automatically scroll down to it.
 */
function displayView($scope, $location, $anchorScroll) {
	$scope.displayResponse = true;
	$scope.processing = false;

	//Attempt to scroll to the response. This has issues.
	var old = $location.hash();
	$location.hash('response');
	$anchorScroll();
	$location.hash(old);
}


/**
 * Update the progress bar with a percentage and a current status label.
 */
function updateProgressbar($scope, value, label) {
	$scope.progressValue = value;
	$scope.progressLabel = label;
}






