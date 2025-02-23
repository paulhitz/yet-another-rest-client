/**
 * A controller responsible for handling the settings page.
 */
clientApp.controller('SettingsCtrl', function($scope, $rootScope, settings, toaster) {
	$scope.settings = settings.get();

	//Update the UI and persist the value.
	$scope.save = function() {
		$rootScope.settings.darkMode = $scope.settings.darkMode;
		settings.save($scope.settings);
		toaster.success("", "Settings Updated.");
	};

});
