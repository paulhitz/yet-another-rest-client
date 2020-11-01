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
	MAX_NUM_DROPDOWN_FAVORITES: 20,
	HTTP_REQUEST_ERROR_STATUS: -1
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

/**
 * Human-friendly descriptions for HTTP Status Codes.
 */
clientApp.constant('HTTP_STATUS_DESCRIPTIONS', {
	ABORT: "The request was cancelled.",
	TIMEOUT: "The request timed out.",
	ERROR: "An unknown network error occurred.",
	UNKNOWN: "Unknown HTTP Status Code.",
	100: "Continue",
	101: "Switching Protocols",
	102: "Processing",
	200: "OK",
	201: "Created",
	202: "Accepted",
	203: "Non-Authoritative Information",
	204: "No Content",
	205: "Reset Content",
	206: "Partial Content",
	207: "Multi-Status",
	208: "Already Reported",
	226: "IM Used",
	300: "Multiple Choices",
	301: "Moved Permanently",
	302: "Found",
	303: "See Other",
	304: "Not Modified",
	305: "Use Proxy",
	306: "Switch Proxy",
	307: "Temporary Redirect",
	308: "Permanent Redirect",
	400: "Bad Request",
	401: "Unauthorized",
	402: "Payment Required",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	407: "Proxy Authentication Required",
	408: "Request Timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length Required",
	412: "Precondition Failed",
	413: "Payload Too Large",
	414: "URI Too Long",
	415: "Unsupported Media Type",
	416: "Range Not Satisfiable",
	417: "Expectation Failed",
	418: "I'm a teapot (short and stout)",
	421: "Misdirected Request",
	422: "Unprocessable Entity",
	423: "Locked",
	424: "Failed Dependency",
	426: "Upgrade Required",
	428: "Precondition Required",
	429: "Too Many Requests",
	431: "Request Header Fields Too Large",
	451: "Unavailable For Legal Reasons",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
	505: "HTTP Version Not Supported",
	506: "Variant Also Negotiates",
	507: "Insufficient Storage",
	508: "Loop Detected",
	510: "Not Extended",
	511: "Network Authentication Required"
});
