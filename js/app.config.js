
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, $provide) {
	$analyticsProvider.virtualPageviews(false);

	//Prevent Angular from sniffing for the history API since it's not supported in packaged apps.
	//@see https://github.com/angular/angular.js/issues/11932
	$provide.decorator('$window', function($delegate) {
		Object.defineProperty($delegate, 'history', {get: function(){ return null; }});
		return $delegate;
	});
});
