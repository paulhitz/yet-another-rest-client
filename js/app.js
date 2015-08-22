var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table']);

/**
 * Main application controller. Populates the form and submits the Service Request.
 */
clientApp.controller('ClientAppCtrl', function($scope, $log, AuthService, clientAppHelper, utils,
		ProgressbarService, advancedSettings, SERVICES_CONFIG, credentials) {
	//Populate the form.
	$scope.settings = advancedSettings;
	$scope.environments = SERVICES_CONFIG.environments;
	$scope.selectedEnvironment = SERVICES_CONFIG.environments[1].id;
	$scope.services = SERVICES_CONFIG.services;
	$scope.selectedService = SERVICES_CONFIG.services[0].id;
	$scope.serviceDescription = SERVICES_CONFIG.services[0].description;
	$scope.placeholder = SERVICES_CONFIG.placeholder;
	$scope.alerts = [];

	//Chrome specific operations. E.g. Chrome Storage related functionality.
	clientAppHelper.performChromeOperations($scope);

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
			//Check that they've supplied credentials. If so, persist them.
			if (!clientAppHelper.areCredentialsPresent()) {
				$scope.alerts.push({type: 'danger', msg: "You need to enter an application ID, user ID and a password for automatic authentication. See 'Advanced Settings'."});
				$scope.processing = false;
				return;
			}
			clientAppHelper.persistCredentials($scope.selectedEnvironment);

			//Delete cookies that can interfere with authentication.
			clientAppHelper.deleteCookies();

			//Retrieve an Authentication Token based on the selected environment.
			var authEndpoint = clientAppHelper.configureServiceUrl($scope.selectedEnvironment, "auth");
			AuthService.getAuthCookie(authEndpoint).then(
				function(success) {
					clientAppHelper.configureAndCallService($scope, success.authorization, advancedSettings.requestUrl);
				},
				function(error) {
					$log.error(error);
					$scope.alerts.push({type: 'danger', msg: "An error occurred while authenticating. Please check the Application ID, User ID and Password."});
					$scope.alerts.push({type: 'info', msg: "If the problem persists, you may want to try Incognito Mode or try clearing your cache. If the issue is solely with a particular environment, then the Authentication Service for that environment may be down."});
					$scope.processing = false;
				}
			);
		} else {
			clientAppHelper.configureAndCallService($scope, "(Automatic Authentication Disabled)", advancedSettings.requestUrl);
		}
	};

	//Copy the request or response to the clipboard.
	$scope.copy = function(text) {
		$scope.copyMessage = "Successfully copied to the Clipboard.";
		utils.copyToClipboard(text);
	};

	$scope.changeEnvironment = function(env) {
		//Change the credentials to match the environment.
		if (credentials[env]) {
			advancedSettings.credentials = JSON.parse(JSON.stringify(credentials[env]));
		} else {
			advancedSettings.credentials = {};
		}

		//Display a warning if the production environment is selected.
		if (env === SERVICES_CONFIG.environments[2].id) {
			$scope.alerts.push({type: 'warning', msg: "Please be careful using the PRODUCTION environment. A valid application ID, production user and password need to be specified."});
		} else {
			$scope.alerts = [];
		}
	};

	//Update the service description to match the selected service.
	$scope.changeService = function(id) {
		for (var service of SERVICES_CONFIG.services) {
			if (service.id === id) {
				$scope.serviceDescription = service.description;
				break;
			}
		}
	};
});
