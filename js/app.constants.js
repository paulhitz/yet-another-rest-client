/**
 * General constants used within the application.
 */
clientApp.constant('GENERAL_CONSTANTS', {
	MAX_OBJECT_SIZE: 100000,
	INDENTATION_LEVEL: 2,
	DATE_FORMAT: 'MMM dd, yyyy HH:mm',
	HISTORY_KEY_FORMAT: 'yarc.history.',
	HEADER_KEY_FORMAT: 'yarc.header.'
});


/**
 * Common request headers. 
 */
clientApp.constant('EXAMPLE_HEADERS', [ 
	{
		id : "accept",
		name : "Accept",
		value : "application/json"
	}, {
		id : "accept_charset",
		name : "Accept-Charset",
		value : "utf-8"
	}, {
		id : "app_id",
		name : "ApplicationId",
		value : "36"
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
	}, {
		id : "user_agent",
		name : "User-Agent",
		value : "Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0"
	} ]
);