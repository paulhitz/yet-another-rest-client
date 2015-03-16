var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common']);


/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, $log, AuthService, clientAppHelper, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	if (typeof chrome != 'undefined') {
		$scope.version = "v" + chrome.runtime.getManifest()['version'];
		clientAppHelper.addUserDefinedServices($scope);
	}

	//Populate the form.
	$scope.service = advancedSettings;
	$scope.environments = SERVICES_CONFIG.environments;
	$scope.environmentSelected = SERVICES_CONFIG.environments[1].id;
	$scope.services = SERVICES_CONFIG.services;
	$scope.serviceSelected = SERVICES_CONFIG.services[0].id;
	$scope.placeholder = SERVICES_CONFIG.placeholder;
	$scope.alerts = [];

	//Submit the configured Service Request.
	$scope.submit = function() {
		//Remove any previous errors/alerts and hide the previous response.
		$scope.alerts = [];
		$scope.copyMessage = "";
		$scope.displayResponse = false;
		$scope.processing = true;

		//Update Progress Bar.
		$scope.progress = ProgressbarService.getProgressState('START');

		if (advancedSettings.autoAuthenticate) {
			//Delete cookies that can interfere with authentication.
			clientAppHelper.deleteCookies();

			//Retrieve an Authentication Token based on the selected environment.
			var authEndpoint = clientAppHelper.configureServiceUrl($scope.environmentSelected, "auth");
			AuthService.getAuthCookie(authEndpoint).then(
				function(success) {
					clientAppHelper.configureAndCallService($scope, success.authorization, advancedSettings.requestUrl);
				},
				function(error) {
					$log.error(error);
					$scope.alerts.push({type: 'danger', msg: "An error occurred while authenticating."});
					$scope.alerts.push({type: 'info', msg: "Please check the user ID and password. If the problem persists, you may want to try Incognito Mode or clear your cache. If the issue is solely with a particular environment, then the Authentication Service for that environment may be down."});
					$scope.processing = false;
				}
			);
		} else {
			clientAppHelper.configureAndCallService($scope, "<Auto-Authentication Disabled>", advancedSettings.requestUrl);
		}
	}

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};

	//Display a warning if the production environment is selected and remove credentials.
	$scope.changeEnvironment = function(env) {
		if (env === SERVICES_CONFIG.environments[2].id) {
			$scope.alerts.push({type: 'warning', msg: "Please be careful using the PRODUCTION environment. A valid production user and password need to be specified. To avoid locking the account, the STG/QA credentials have been removed."});
			$scope.service.userId = "";
			$scope.service.password = "";
		} else {
			$scope.alerts = [];
		}
	};
});


/**
 * Retrieves an Authentication Token for a specified environment.
 */
clientApp.service('AuthService', function($http, $q, advancedSettings) {
	var cachedAuthTokens = [];

	this.getAuthCookie = function(authEndpoint) {
		var deferred = $q.defer();

		if (typeof cachedAuthTokens[authEndpoint] !== 'undefined') {
			deferred.resolve({authorization: cachedAuthTokens[authEndpoint]});
		} else {
			var AUTHENTICATION_REQUEST_CONFIG = { headers: {
				'ApplicationId': advancedSettings.appId,
				'x-dnb-user': advancedSettings.userId,
				'x-dnb-pwd': advancedSettings.password
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
	};
});


/**
 * Simple controller for toggling a value.
 */
clientApp.controller('ToggleCtrl', function($scope) {
	$scope.toggle = function(status) {
		$scope.status = !status;
	}
});


/**
 * Various helper functions for the application.
 */
clientApp.service('clientAppHelper', function($http, $location, $anchorScroll, utils, ProgressbarService, advancedSettings, SERVICES_CONFIG) {
	var helper = this;

	/**
	 * Based on the selected environment and service, determine the correct URL to use.
	 */
	helper.configureServiceUrl = function(environmentSelected, serviceSelected, parameter) {
		var url = "";

		//Determine the endpoint based on selected Environment and Service.
		for (var endpoint of SERVICES_CONFIG.endpoints) {
			if (endpoint.service === serviceSelected && (endpoint.env === "" || endpoint.env === environmentSelected)) {
				url = endpoint.url;
				break;
			}
		}

		//Remove dashes from the optional parameter and add it to the URL.
		var placeholder = SERVICES_CONFIG.placeholder;
		if (parameter) {
			placeholder = utils.replaceAll(parameter, "-", "");
		}
		if (url) {
			url = url.replace("{placeholder}", placeholder);
		}
		return url;
	};

	/**
	 * Determine the service endpoint to use and call the service.
	 */
	helper.configureAndCallService = function($scope, token) {
		$scope.authenticationToken = token;

		//Determine the configured service endpoint.
		if (advancedSettings.requestUrl) {
			//If the user has entered a specific endpoint, just use that.
			$scope.requestUrl = advancedSettings.requestUrl;
		} else {
			$scope.requestUrl = helper.configureServiceUrl($scope.environmentSelected, $scope.serviceSelected, $scope.parameter);
		}

		//Call the endpoint.
		$scope.progress = ProgressbarService.getProgressState('IN_PROGRESS');
		helper.callService($scope);
	};

	/**
	 * Call the specified endpoint and update the UI.
	 */
	helper.callService = function($scope) {
		var requestConfig = { headers: {} };
		if (advancedSettings.autoAuthenticate) {
			requestConfig = { headers: {
				'Authorization': $scope.authenticationToken,
				'ApplicationId': advancedSettings.appId
			}};
		}

		//Determine the request method to use (GET/POST/PUT/DELETE).
		var promise;
		switch (advancedSettings.requestMethod) {
			case "post":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.post($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "put":
				helper.addPayloadHeaders(requestConfig.headers);
				promise = $http.put($scope.requestUrl, advancedSettings.payload, requestConfig);
				break;
			case "delete":
				promise = $http.delete($scope.requestUrl, requestConfig);
				break;
			case "get":
			default:
				promise = $http.get($scope.requestUrl, requestConfig);
		}

		//Handle the response.
		promise.then(function(success) {
			helper.populateView($scope, success);
			helper.displayView($scope);
			helper.storeResponseDetails($scope.requestUrl, success.data, advancedSettings.requestMethod);
		}, function(error) {
			helper.populateView($scope, error);
			helper.displayView($scope);
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
	 * Persist the request/response so we have a history of them.
	 */
	helper.storeResponseDetails = function(requestUrl, response, requestMethod) {
		//Construct the new entry and save it.
		var entry = {
			'date': Date(),
			'request': requestUrl,
			'response': response,
			'method': requestMethod
		};
		var key = "restclient.history." + Date.now();
		localStorage[key] = JSON.stringify(entry);

		//Also use Chrome Storage to persist it.
		if (typeof chrome != 'undefined') {
			var keyValue = {};
			keyValue[key] = entry;
			chrome.storage.local.set(keyValue);
		}
	};

	/**
	 * Update the UI with the data received from the service.
	 */
	helper.populateView = function($scope, response) {
		$scope.progress = ProgressbarService.getProgressState('COMPLETE');
		response.headers().status = response.status;
		$scope.responseBody = JSON.stringify(response.data, null, 2);
		$scope.responseHeaders = JSON.stringify(response.headers(), null, 2);
		$scope.requestHeaders = JSON.stringify(response.config, null, 2);
	};

	/**
	 * Show the view and automatically scroll down to it.
	 */
	helper.displayView = function($scope) {
		$scope.displayResponse = true;
		$scope.processing = false;

		//Attempt to scroll to the response. This has issues.
		var old = $location.hash();
		$location.hash('response');
		$anchorScroll();
		$location.hash(old);
	};

	/**
	 * Delete cookies that can interfere with authentication.
	 */
	helper.deleteCookies = function() {
		if (typeof chrome != 'undefined') {
			chrome.cookies.remove({"url": "http://dnb.com", "name": "userid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "dnb_loginid"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "redirect"});
			chrome.cookies.remove({"url": "http://dnb.com", "name": "ObSSOCookie"});
		}
	};

	/**
	 * Add custom services that the user has previously saved.
	 */
	helper.addUserDefinedServices = function($scope) {
		chrome.storage.sync.get(null, function (services) {
			for (key in services) {
				var service = services[key];
				SERVICES_CONFIG.services.unshift(service.serviceName);
				SERVICES_CONFIG.endpoints.unshift(service.endpoint);
			}
			$scope.$apply();
		});
	};

	/**
	 * Retrieve the Custom Services. Avoids going to Chrome Storage again.
	 */
	helper.getCustomServices = function() {
		var customServices = [];
		for (var service of SERVICES_CONFIG.services) {
			if (service.group === "User Entered") {
				customServices.push(service);
			}
		}
		return customServices;
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


/**
 * Service for managing the progress bar.
 */
clientApp.service('ProgressbarService', function() {
	var PROGRESS_STATES = {
		START: { value: 10, label: 'Authenticating... ' },
		IN_PROGRESS: { value: 50, label: 'Making Service Request... ' },
		COMPLETE: { value: 100, label: 'Response Received' }
	};

	/**
	 * Return details about the specified state (percentage and a status label).
	 */
	this.getProgressState = function(progress) {
		return PROGRESS_STATES[progress];
	};
});





/*
TODO Still to do...
-handle scenarios where there are no services or they're all deleted.
-tidy the code.
-what to initially select in the dropdown? and after a deletion?
-improve the ui.


*/





/**
 * 
 */
clientApp.controller('AddServiceModalCtrl', function($scope, $modal) {
	$scope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			backdropClass: 'newServiceModal',
			backdrop: 'static'
		});
	};
});

/**
 *
 */
clientApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, clientAppHelper, SERVICES_CONFIG) {
	$scope.alerts = [];

	//
	$scope.showAddButton = false;
	$scope.toggleButtons = function (current) {
		$scope.showAddButton = !current;
	};

	//Populate the dropdown with the list of custom services.
	if (!$scope.customServices) {
		$scope.customServices = clientAppHelper.getCustomServices();
	}
	$scope.customServiceSelected = $scope.customServices[0].id;

	//Add the new service to Chrome storage and the application dropdowns.
	$scope.ok = function () {
		if (typeof chrome != 'undefined') {

			//Prepare the data for storage.
			var timestamp = Date.now();
			var newServiceName = {id : timestamp, label : $scope.newServiceName, group : "User Entered"};
			var newEndpoint = {env : "", service : timestamp, url : $scope.newServiceUrl};

			//Update the UI.
			$scope.newServiceName = "";
			$scope.newServiceUrl = "";
			$scope.customServices.unshift(newServiceName);
			SERVICES_CONFIG.services.unshift(newServiceName);
			SERVICES_CONFIG.endpoints.unshift(newEndpoint);

			//Add the new service to Chrome (Sync) Storage.
			var key = "restclient.service." + timestamp;
			var keyValue = {};
			keyValue[key] = { serviceName : newServiceName, endpoint : newEndpoint };
			chrome.storage.sync.set(keyValue, function() {
				console.log('Settings saved');
				$scope.alerts = [{type: 'success', msg: "The service (" + newServiceName.label + ") has been added. It will now appear in the Service dropdown."}];
				$scope.$apply();
			});
		} else {
			$scope.alerts = [{type: 'danger', msg: "This operation isn't supported in this browser."}];
		}
	};

	//Delete the specified custom service from Chrome storage and the application dropdowns.
	$scope.delete = function (customServiceSelected) {
console.log("customServiceSelected = " + customServiceSelected);
		//Identify and remove the service from the application dropdowns.
		var serviceToDelete = clientAppHelper.findServiceById(customServiceSelected, $scope.customServices);
		$scope.customServices.splice($scope.customServices.indexOf(serviceToDelete), 1);
		SERVICES_CONFIG.services.splice(SERVICES_CONFIG.services.indexOf(serviceToDelete), 1);
		//TODO handle deleting all services or having no services.

		//Remove it from Chrome storage.
		var key = "restclient.service." + customServiceSelected;
		chrome.storage.sync.remove(key, function() {
			$scope.alerts = [{type: 'success', msg: "The selected service has been deleted."}];
			$scope.$apply();
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

