/**
 *
 */
clientApp.controller('EventsCtrl', function($scope, $rootScope) {

	$scope.loadHistory = function(value) {
		$rootScope.displayHistory = value;
		if (value) {
			$rootScope.$broadcast('loadHistory');
		}
	};
});
