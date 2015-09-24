/**
 * A controller responsible for broadcasting events and setting the current tab.
 */
clientApp.controller('EventsCtrl', function($scope, $rootScope) {

	$scope.loadTab = function(tab) {
		$rootScope.currentTab = tab;

		if (tab === "history") {
			//Broadcast an event to indicate that the request history should be loaded.
			$rootScope.$broadcast("loadHistory");
		}
	};
});
