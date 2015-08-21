var clientApp = angular.module('clientApp', ['ui.bootstrap', 'hljs', 'common', 'smart-table', 'ngRoute']);


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
});



/*
TODO:
-tidy up the code
-test test test

BUGS
-the advanced settings panel doesn't work
-the non angular tabs don't work
-the main page is doing a full refresh
-sometimes the custom services are duplicating in the dropdown
-back to top link doesn't work
-the version isn't displayed

*/


/**
 *
 */
clientApp.controller('HistoryCtrl', function($scope, $modal, historyHelper, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;
	$scope.numberOfEntries = 0;

	//Get the data from chrome storage.
	chrome.storage.local.get(null, function (history) {
		//Add each history object to an array.
		var values = [];
		for (var key in history) {
			var entry = history[key];
			if (historyHelper.isHistoryKey(key)) {
				//Add the key to the object so we can identify it later.
				entry['key'] = key;

				//Fix up the date format to enable simpler sorting and formatting.
				entry['date'] = new Date(entry['date']);
				values.push(entry);
			}
		}

		//Update the UI.
		$scope.numberOfEntries = values.length;
		$scope.rowCollection = values;
		$scope.displayedCollection = [].concat($scope.rowCollection);
		$scope.$apply();
	});

	//Delete (permanently) the selected item.
	$scope.removeItem = function(row) {
		var index = $scope.rowCollection.indexOf(row);
		if (index !== -1) {
			//Remove it from the UI.
			$scope.rowCollection.splice(index, 1);
			$scope.numberOfEntries = $scope.rowCollection.length;

			//Delete the entry from Chrome Storage.
			if (typeof chrome !== 'undefined') {
				//chrome.storage.local.remove(row.key); //TOOD enable this when complete.
				//alert("Entry Deleted.");
			}
		}
	};

	//Open a modal dialog to view more details about the selected item.
	$scope.openRowModal = function(row) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/historyModal.html',
			controller: 'HistoryModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				history: function() {
					return row;
				}
			}
		});
	};
});


clientApp.service('historyHelper', function(GENERAL_CONSTANTS) {
	var history = this;

	/**
	 *  TODO check key is in correct format
	 */
	history.isHistoryKey = function(key) {
		//use constants file for "restclient.history"
		return true;
	};
});


/**
 *
 */
clientApp.controller('HistoryModalInstanceCtrl', function ($scope, $modalInstance, history, GENERAL_CONSTANTS) {
	$scope.dateFormat = GENERAL_CONSTANTS.DATE_FORMAT;

	//Add the history object to the scope so it can be used in the modal.
	$scope.history = history;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

