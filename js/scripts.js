
var clientApp = angular.module('clientApp', []);





clientApp.controller('ClientController', function($scope, $http, AuthService) {

  //Populate the form.
  $scope.environments = servicesConfig.environments;
  $scope.environmentSelected = servicesConfig.environments[0].id;
  $scope.services = servicesConfig.services;
  $scope.serviceSelected = servicesConfig.services[0].id;

  

  

  $scope.submit = function() {

    //Retrieve an Authorisation Token based on the selected environment.
    $scope.authorise();

	//Determine the configured endpoint.
    var endpoint = configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.duns);
	$scope.requestUrl = endpoint;
	console.log("configured endpoint to call = " + endpoint);

	//Call the endpoint.
	//TODO this is being called before the auth promise is executed. move this below.
	callService($scope, $http, endpoint);
  }
  
  $scope.authorise = function() {
      var authEndpoint = configureServiceUrl($scope.environmentSelected, "auth");
  
	  AuthService.getAuthCookie(authEndpoint).then(
		  function(payload) {
			console.log("headers = " + payload.authorization);
			$scope.authenticationCookie = payload.authorization;
		  },
		  function(error) {
			console.log("error = " + error); //TODO handle this with error in the UI also.
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

		console.log("authEndpoint = " + authEndpoint);
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
function callService($scope, $http, endpoint) {
	console.log("Calling service using auth token: " + $scope.authenticationCookie);

	var requestConfig = { headers: {
			'Authorization': $scope.authenticationCookie,
			'ApplicationId': '36'
		}
	};

    $http.get(endpoint, requestConfig).
		success(function(data, status, headers, config) {
            $scope.responseBody = data;
			$scope.responseHeaders = headers();
            console.log(status);
            console.log(JSON.stringify(config));
        }).
		error(function(data, status, headers, config) {
			$scope.responseBody = data;
			$scope.responseHeaders = headers();
            console.log(status);
            console.log(JSON.stringify(config));
		});
}


 /**
  * The name says it all.
  */
function replaceAll(input, target, replacement) {
	return input.split(target).join(replacement);
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






