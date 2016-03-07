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
	MAX_IMPORT_FILE_SIZE: 50000,
	HTML_CONTENT_TYPE: 'text/html'
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
	  "Accept-Encoding",
	  "Accept-Language",
	  "Authorization",
	  "Cache-Control",
	  "Connection",
	  "Cookie",
	  "Content-Length",
	  "Content-Type",
	  "Date",
	  "From",
	  "Host",
	  "Max-Forwards",
	  "Origin",
	  "Pragma",
	  "Proxy-Authorization",
	  "Referer",
	  "TE",
	  "Upgrade",
	  "Via",
	  "Warning"
	]
});
