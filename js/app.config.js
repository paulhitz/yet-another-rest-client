
/**
 * Configuration settings.
 */
clientApp.config(function ($analyticsProvider, hljsServiceProvider) {
	$analyticsProvider.virtualPageviews(false);

	//Specifically limit the languages supported by the syntax highlighter.
	//Without limiting the supported languages, large responses will kill performance.
	hljsServiceProvider.setOptions({
		languages: ['json', 'html', 'js', 'css', 'http', 'accesslog']
	});
});
