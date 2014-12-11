
var clientApp = angular.module('clientApp', []);





clientApp.controller('ClientController', function($scope, AuthService) {

  //TODO add the env + services to the dropdowns.
  console.log("envs = " + formData.environments);
  console.log("services = " + formData.services);
  console.log("services = " + formData.services[0].name);
  $scope.environments = formData.environments;
  $scope.services = formData.services;



  //TODO pass in env?
  $scope.authorise = function() {
	  AuthService.getAuthCookie().then(
		  function(payload) {
			console.log("headers = " + payload.authorization);
			$scope.authenticationCookie = payload.authorization;
		  },
		  function(error) {
			console.log("error = " + error);
		  }
	  );
  }

});




clientApp.factory('AuthService', function($http, $q) {
  var cachedAuthCookie = "";

  return {
    getAuthCookie: function() {
      var deferred = $q.defer();

	  if (cachedAuthCookie !== "") {
	    deferred.resolve({authorization: cachedAuthCookie});
	  } else {
		var AUTHENTICATION_REQUEST_CONFIG = { headers: {
			'ApplicationId': '36',
			'x-dnb-user': 'teamjoly@dnb.com',
			'x-dnb-pwd': 'password'
		}};
		var STG_AUTHENTICATION_URL = 'http://services-ext-stg.dnb.com/rest/Authentication';

		$http.get(STG_AUTHENTICATION_URL, AUTHENTICATION_REQUEST_CONFIG).
		success(function(data, status, headers, config) {
			cachedAuthCookie = headers('authorization');
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








 
 
 
 
 
 
 
 
 
 
 
 


function CallService($scope, $http) {

	//TODO consider using config() to setup the $httpProvider and include headers there.
	var requestConfig = { headers: {
			'Authorization': '5Ccr7Qs6ZkEHbAgLMlDeg0ykUF%2F1Cb%2FxIcULRaUhRnaKR%2BvInWkbuNH6kv8MOkxYMc1qdWKm1apyxiNQe7cLXuogOCM4XQTHsa7u8BugcJaW53jklD70pSdZrKfYI24%2FwlQS6nxmYVvBM%2BZPZUY2DTbV5qZuvqd3GtUsy47PZahGyIJ6JxUW39hqw5sqHvSIqxsdDNPgUzG7UWvze2uwZh%2Bn2y5YjaBNMFHt3QoPoL5At88Re3P0tNCoMZ92bUAqdkLQnG2YnnTnp6wq%2FufVF6%2BKB82Cd1mwHcb%2BFFGicxyertcPOms5DM4OI7Mz%2F%2B%2B%2F7HkbLgAyH5j%2FJLj8Ig3tbg%3D%3D',
			'ApplicationId': '36'
		}
	};

	var serviceUrl = 'http://services-ext-stg.dnb.com/rest/LinkageService/V2/OrderProduct?DUNSNumber=211528187&CountryISOAlpha2Code=GB&DNBProductID=LNK_FF_MNRT';

    $http.get(serviceUrl, requestConfig).
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






