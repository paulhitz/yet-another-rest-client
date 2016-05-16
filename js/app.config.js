
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, $uibModalProvider, hljsServiceProvider) {
	$analyticsProvider.virtualPageviews(false);

	//Specifically limit the languages supported by the syntax highlighter.
	//Without limiting the supported languages, large responses will kill performance.
	hljsServiceProvider.setOptions({
		languages: ['json', 'html', 'js', 'css', 'http', 'accesslog']
	});

	//Defaults for the application modals.
	$uibModalProvider.options = { backdrop: 'static', backdropClass: 'modalBackdrop' };
});
