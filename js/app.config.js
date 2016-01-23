
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, $provide) {
	$analyticsProvider.virtualPageviews(false);

	//Prevent Angular from sniffing for the history API since it's not supported in packaged apps.
	$provide.decorator('$window', function($delegate) {
		$delegate.history = null;
		return $delegate;
	});
});
