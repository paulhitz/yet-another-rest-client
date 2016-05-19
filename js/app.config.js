
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, $provide, $uibModalProvider, hljsServiceProvider) {
	$analyticsProvider.virtualPageviews(false);

	//Prevent Angular from sniffing for the history API since it's not supported in packaged apps.
	//@see https://github.com/angular/angular.js/issues/11932
	$provide.decorator('$window', function($delegate) {
		Object.defineProperty($delegate, 'history', {get: function(){ return null; }});
		return $delegate;
	});

	//Specifically limit the languages supported by the Syntax highlighter.
	//Without limiting the supported languages, large responses will kill performance.
	hljsServiceProvider.setOptions({
		languages: ['json', 'html', 'js', 'css', 'http', 'accesslog']
	});

	//Defaults for the application modals.
	$uibModalProvider.options = { backdrop: 'static', backdropClass: 'modalBackdrop' };
});
