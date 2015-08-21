/**
 * 
 */
clientApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'partials/main.html',
			controller  : 'ClientAppCtrl'
		})
		.when('/history', {
			templateUrl : 'partials/history.html',
			controller  : 'HistoryCtrl'
		})
		.otherwise( { 
			redirectTo: '/' 
		});
});
