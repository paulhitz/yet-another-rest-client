/**
 * A controller responsible for handling Basic Authorization.
 */
clientApp.controller('AuthCtrl', function($scope, $modal) {

	//
	$scope.authValue = "foo";
	$scope.test = "bar";

	//Open a modal dialog to allow 
	$scope.openAuthModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/authModal.html',
			controller: 'AuthModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static',
			resolve: {
				authValue: function() {
					return $scope.authValue;
				},
				test: function() {
					return $scope.test;
				}
			}
		});
	};
});


/**
 * Controller for handling the username and password used for Basic Authorization.
 */
clientApp.controller('AuthModalInstanceCtrl', function ($scope, $modalInstance, authValue, authHelper, test) {
test = "sdfsdfsdafasdf*******************************************";
	//Update the UI with the generated Authorization Value.
	$scope.ok = function() {
		authValue = authHelper.generateBasicAuthHeader($scope.auth.name, $scope.auth.password);
		$modalInstance.dismiss('cancel');
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
		console.log("encoded = " + encoded);
		return "Basic " + encoded;
	};
});
