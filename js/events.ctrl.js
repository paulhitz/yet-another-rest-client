/**
 * A controller responsible for broadcasting events.
 */
clientApp.controller('EventsCtrl', function($scope, $rootScope) {

	//Broadcast an event to indicate that the request history should be loaded.
	$scope.loadHistory = function(value) {
		$rootScope.displayHistory = value;
		if (value) {
			$rootScope.$broadcast('loadHistory');
		}
	};
});
