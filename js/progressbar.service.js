
/**
 * Service for managing the progress bar.
 */
clientApp.service('ProgressbarService', function() {
	var PROGRESS_STATES = {
		NONE: { value: 0, label: '' },
		START: { value: 10, label: 'Authenticating... ' },
		IN_PROGRESS: { value: 50, label: 'Making Service Request... ' },
		COMPLETE: { value: 100, label: 'Response Received' }
	};

	/**
	 * Return details about the specified state (percentage and a status label).
	 */
	this.getProgressState = function(progress) {
		return PROGRESS_STATES[progress];
	};
});
