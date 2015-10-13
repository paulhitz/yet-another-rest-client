/**
 * A controller responsible for handling Basic Authorization.
 */
clientApp.controller('AuthCtrl', function($scope, $modal) {

	//The Basic Authorization value to use in requests.
	$scope.authValue = "";

	//Open a modal dialog to allow the user to enter credentials.
	$scope.openAuthModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/authModal.html',
			controller: 'AuthModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});

		//Update the authorization value.
		modalInstance.result.then(function (value) {
			$scope.authValue = value;
		});
	};
});


/**
 * Controller for handling the username and password used for Basic Authorization.
 */
clientApp.controller('AuthModalInstanceCtrl', function ($scope, $modalInstance, authHelper) {

	$scope.ok = function() {
		var authValue = authHelper.generateBasicAuthHeader($scope.auth.name, $scope.auth.password);
		$modalInstance.close(authValue);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


/**
 * Various helper functions for the Authorization functionality.
 */
clientApp.service('authHelper', function() {
	var helper = this;

	/**
	 * Generates a 'Basic Authorization' value.
	 */
	helper.generateBasicAuthHeader = function(name, password) {
		var unencoded = name + ":" + password;
		var encoded = btoa(unencoded);
		return "Basic " + encoded;
	};
});
