/**
 * A controller responsible for handling the settings page.
 */
clientApp.controller('SettingsCtrl', function($scope, $rootScope, settings, toaster, utils) {

	//hard-coded for now
	//$scope.settings = $rootScope.settings;

	//TODO load this in the app ctrl?
	//Load any saved settings.
	settings.load(function(savedSettings) {
		console.log("settingCtrl loaded settings = " + utils.stringify(savedSettings));
		$scope.settings = savedSettings;
	});

	//TODO check for null. default to false. How will the UI handle an empty object?


	$scope.save = function() {
		//TODO prevent saving the same value over and over.
		console.log("Saved value = " + $scope.settings.darkMode);
		settings.save($scope.settings);
		$rootScope.settings.darkMode = $scope.settings.darkMode; //TODO guard against null setting object.
		toaster.success("", "Settings Updated.");
	};


});
