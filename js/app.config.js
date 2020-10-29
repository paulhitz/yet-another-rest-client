
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, $uibModalProvider, hljsServiceProvider, $qProvider) {
	$analyticsProvider.virtualPageviews(false);

	//Specifically limit the languages supported by the syntax highlighter.
	//Without limiting the supported languages, large responses will kill performance.
	hljsServiceProvider.setOptions({
		languages: ['json', 'html', 'js', 'css', 'http', 'accesslog']
	});

	//Defaults for the application modals.
	$uibModalProvider.options = { backdrop: 'static', backdropClass: 'modalBackdrop' };

	//Suppress "Possibly unhandled rejection" Angular error messages. Breaks tests and pollutes the browser console.
	$qProvider.errorOnUnhandledRejections(false);
});
