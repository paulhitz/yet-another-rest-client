/**
 * A controller responsible for broadcasting events and setting the current tab.
 */
clientApp.controller('EventsCtrl', function($scope, $rootScope, $analytics) {

	$rootScope.loadTab = function(tab) {
		//Load the content for the specified tab.
		$rootScope.currentTab = tab;

		if (tab === "history") {
			//Broadcast an event to indicate that the request history should be loaded.
			$rootScope.$broadcast("loadHistory");
		}

		//Track the parts of the tool that the user accesses.
		$analytics.pageTrack('/' + tab);
	};
});
