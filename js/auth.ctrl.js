/**
 * A controller responsible for handling Basic Authorization.
 */
clientApp.controller('AuthCtrl', function($scope, $uibModal, auth) {

	//The Basic Authorization value to use in requests.
	$scope.authToken = auth.get();

	//Open a modal dialog to allow the user to enter credentials.
	$scope.openAuthModal = function() {
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/authModal.html',
			controller: 'AuthModalInstanceCtrl'
		});

		//Update the authorization value.
		modalInstance.result.then(function(value) {
			auth.set(value);
		});
	};
});

/**
 * Simple modal controller for handling the username and password used for Basic Authorization.
 */
clientApp.controller('AuthModalInstanceCtrl', function ($scope, $uibModalInstance, auth) {
	$scope.auth = auth.decodeAuthValue();

	$scope.ok = function() {
		var authValue = auth.generateBasicAuthHeader($scope.auth.name, $scope.auth.password);
		$uibModalInstance.close(authValue);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});
