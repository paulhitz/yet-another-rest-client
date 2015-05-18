
/**
 * Simple controller for toggling a value.
 */
clientApp.controller('ToggleCtrl', function($scope) {
	$scope.toggle = function(status) {
		$scope.status = !status;
	};
});
