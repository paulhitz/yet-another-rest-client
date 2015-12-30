
/**
 * Service for managing the progress bar.
 */
clientApp.service('ProgressbarService', function() {

	//The available states and details about them (percentage and a status label).
	this.PROGRESS_STATES = {
		NONE: { value: 0, label: '' },
		IN_PROGRESS: { value: 50, label: 'Request In Progress... ' },
		COMPLETE: { value: 100, label: 'Response Received' }
	};
});
