/**
 * General constants used within the application.
 */
clientApp.constant('GENERAL_CONSTANTS', {
	MAX_OBJECT_SIZE: 128000,
	INDENTATION_LEVEL: 2,
	DATE_FORMAT: 'MMM dd, yyyy HH:mm',
	HISTORY_KEY_FORMAT: 'yarc.history.',
	HEADER_KEY_FORMAT: 'yarc.header.',
	FAVORITE_KEY_FORMAT: 'yarc.favorite.',
	EXPORT_FILE_NAME: 'yarc_favorites.json',
	EXPORT_FILE_TYPE: '.json',
	MAX_IMPORT_FILE_SIZE: 250000,
	HTML_CONTENT_TYPE: 'text/html',
	MAX_NUM_DROPDOWN_FAVORITES: 20
});

/**
 * URLs for the Chrome Web Store. These are different for the Extension and Chrome App.
 */
clientApp.constant('YARC_CONFIG', {
	CHROME_STORE: "https://chrome.google.com/webstore/detail/yarc-yet-another-rest-cli/ehafadccdcdedbhcbddihehiodgcddpl",
	CHROME_STORE_REVIEWS: "https://chrome.google.com/webstore/detail/yarc-yet-another-rest-cli/ehafadccdcdedbhcbddihehiodgcddpl/reviews",
	CHROME_STORE_SUPPORT: "https://chrome.google.com/webstore/detail/yarc-yet-another-rest-cli/ehafadccdcdedbhcbddihehiodgcddpl/support"
});

/**
 * Request Methods.
 */
clientApp.constant('REQUEST_METHODS', ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]);

/**
 * Common headers used to assist the user when entering request headers.
 */
clientApp.constant('COMMON_HEADERS', {

	//Some example request headers.
	EXAMPLES: [ {
		id : "accept",
		name : "Accept",
		value : "application/json"
	}, {
		id : "auth",
		name : "Authorization",
		value : "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="
	}, {
		id : "cache",
		name : "Cache-Control",
		value : "no-cache"
	}, {
		id : "content",
		name : "Content-Type",
		value : "application/json"
	} ],

	//Common header names.
	NAMES: [
		"Accept",
	  "Accept-Language",
	  "Authorization",
	  "Cache-Control",
	  "Content-Type",
	  "From",
	  "Max-Forwards",
	  "Pragma",
	  "Proxy-Authorization",
	  "Warning"
	]
});
