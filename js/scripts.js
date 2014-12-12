var clientApp = angular.module('clientApp', ['hljs']);

//TODO is this used?
clientApp.config(function (hljsServiceProvider) {
  hljsServiceProvider.setOptions({
    // replace tab with 2 spaces
    tabReplace: '  '
  });
});


/**
 *
 */
clientApp.controller('ClientController', function($scope, $http, AuthService) {

	//Populate the form.
	$scope.environments = servicesConfig.environments;
	$scope.environmentSelected = servicesConfig.environments[0].id;
	$scope.services = servicesConfig.services;
	$scope.serviceSelected = servicesConfig.services[0].id;

	//
	$scope.submit = function() {
		var authEndpoint = configureServiceUrl($scope.environmentSelected, "auth");

		//Retrieve an Authorisation Token based on the selected environment.
		AuthService.getAuthCookie(authEndpoint).then(
			function(payload) {
				$scope.authenticationCookie = payload.authorization;

				//Determine the configured endpoint.
				$scope.requestUrl = configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.duns);

				//Call the endpoint.
				callService($scope, $http);
			},
			function(error) {
				console.log("error = " + error); //TODO handle this with error in the UI.
			}
		);
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
 * Retrieves an Authentication Cookie for a specified environment.
 */
clientApp.factory('AuthService', function($http, $q) {
	var cachedAuthCookies = [];

	return {
		getAuthCookie: function(authEndpoint) {
			var deferred = $q.defer();

			if (typeof cachedAuthCookies[authEndpoint] !== 'undefined') {
				deferred.resolve({authorization: cachedAuthCookies[authEndpoint]});
			} else {
				var AUTHENTICATION_REQUEST_CONFIG = { headers: {
					'ApplicationId': '36',
					'x-dnb-user': 'teamjoly@dnb.com',
					'x-dnb-pwd': 'password'
				}};

				$http.get(authEndpoint, AUTHENTICATION_REQUEST_CONFIG).
					success(function(data, status, headers, config) {
						cachedAuthCookies[authEndpoint] = headers('authorization');
						deferred.resolve({authorization: headers('authorization')});
					}).
					error(function(msg, code) {
						deferred.reject("Error Code: " + code);
						//$log.error(msg, code);
					});
			}
			return deferred.promise;
		}
	}
});


/**
 * Call the specified endpoint and update the UI.
 *
 * TODO:
 * -the auth service requires different params
 * -consider using config() to setup the $httpProvider and include headers there.
 * -remove magic number. e.g. the app id.
 * -can we reuse the auth service method?
 */
function callService($scope, $http) {

	var requestConfig = { headers: {
			'Authorization': $scope.authenticationCookie,
			'ApplicationId': '36'
		}
	};

	$http.get($scope.requestUrl, requestConfig).
		success(function(data, status, headers, config) {
			populateView($scope, data, headers(), config, status);
		}).
		error(function(data, status, headers, config) {
			populateView($scope, data, headers(), config, status);
		});
}


 /**
  * The name says it all.
  */
function replaceAll(input, target, replacement) {
	return input.split(target).join(replacement);
}


/**
 *
 */
function populateView($scope, data, headers, config, status) {
	headers['status'] = status;
	$scope.responseBody = JSON.stringify(data, null, 2);
	$scope.responseHeaders = JSON.stringify(headers, null, 2);
	$scope.requestHeaders = JSON.stringify(config, null, 2);
}




















function Authenticate3($http) {

	var AUTHENTICATION_REQUEST_CONFIG = { headers: {
			'ApplicationId': '36',
			'x-dnb-user': 'teamjoly@dnb.com',
			'x-dnb-pwd': 'password'
		}
	};
	var STG_AUTHENTICATION_URL = 'http://services-ext-stg.dnb.com/rest/Authentication';

    var promise = $http.get(STG_AUTHENTICATION_URL, AUTHENTICATION_REQUEST_CONFIG);

	promise.then(
	  function(payload) {
		console.log("headers = " + payload.headers('authorization'));
		return payload.headers('authorization');
	  },
	  function(errorPayload) {
		//TODO handle this
	  });
}






