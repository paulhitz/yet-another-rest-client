var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs']);

/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientController', function($scope, $http, $location, $anchorScroll, AuthService) {

	//Populate the form.
	$scope.environments = servicesConfig.environments;
	$scope.environmentSelected = servicesConfig.environments[0].id;
	$scope.services = servicesConfig.services;
	$scope.serviceSelected = servicesConfig.services[0].id;

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.displayResponse = false;

		//Update Progress Bar.
		updateProgressbar($scope, 10, 'Authenticating... ');

		//Retrieve an Authorisation Token based on the selected environment.
		var authEndpoint = configureServiceUrl($scope.environmentSelected, "auth");
		AuthService.getAuthCookie(authEndpoint).then(
			function(payload) {
				$scope.authenticationToken = payload.authorization;

				//Determine the configured service endpoint.
				$scope.requestUrl = configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.duns);

				//Call the endpoint.
				updateProgressbar($scope, 50, 'Making Service Request... ');
				callService($scope, $http, $location, $anchorScroll);
			},
			function(error) {
				var errorMessage = "An error occurred while authenticating... " + error.msg + ". Error Code: " + error.code;
				$scope.alerts.push({type: 'danger', msg: errorMessage});
			}
		);
	}

	//Remove the selected alert/error.
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});


/**
 * Simple controller for toggling a value.
 */
clientApp.controller('ToggleController', function($scope) {
	$scope.toggle = function(status) {
		$scope.status = !status;
	}
});


/**
 * Based on the selected environment and service, determine the correct URL to use.
 */
function configureServiceUrl(environmentSelected, serviceSelected, dunsSelected) {
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
}


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
					'ApplicationId': '36',
					'x-dnb-user': 'teamjoly@dnb.com',
					'x-dnb-pwd': 'password'
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
 * Call the specified endpoint and update the UI.
 *
 * TODO:
 * -consider using config() to setup the $httpProvider and include headers there.
 * -remove magic number. e.g. the app id.
 * -can we reuse the auth service method?
 */
function callService($scope, $http, $location, $anchorScroll) {

	var requestConfig = { headers: {
		'Authorization': $scope.authenticationToken,
		'ApplicationId': '36'
	}};

	$http.get($scope.requestUrl, requestConfig).
		success(function(data, status, headers, config) {
			populateView($scope, data, headers(), config, status);
			displayView($scope, $location, $anchorScroll);
		}).
		error(function(data, status, headers, config) {
			populateView($scope, data, headers(), config, status);
			displayView($scope, $location, $anchorScroll);
		}
	);
}


 /**
  * Replace all occurrences of the target value with the replacement value.
  */
function replaceAll(input, target, replacement) {
	return input.split(target).join(replacement);
}


/**
 * Update the UI with the data received form the service.
 */
function populateView($scope, data, headers, config, status) {
	updateProgressbar($scope, 100, 'Response Received');
	headers['status'] = status;
	$scope.responseBody = JSON.stringify(data, null, 2);
	$scope.responseHeaders = JSON.stringify(headers, null, 2);
	$scope.requestHeaders = JSON.stringify(config, null, 2);
}


/**
 * Show the view and automatically scroll down to it. (scrolling is currently ineffective)
 */
function displayView($scope, $location, $anchorScroll) {
	$scope.displayResponse = true;
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






