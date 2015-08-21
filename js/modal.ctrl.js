
/**
 * Open an AngularJS-powered custom modal window. Use a partial view and a controller for the modal instance.
 */
clientApp.controller('AddServiceModalCtrl', function($scope, $modal) {
	$scope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: 'partials/customServicesModal.html',
			controller: 'ModalInstanceCtrl',
			backdropClass: 'modalBackdrop',
			backdrop: 'static'
		});
	};
});

/**
 * Controller for the Custom Service functionality. Allows a user to add or delete a custom service.
 */
clientApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, clientAppHelper, SERVICES_CONFIG) {
	$scope.alerts = [];

	//Enable or disable the Add/Delete buttons.
	$scope.showAddButton = false;
	$scope.toggleButtons = function(current) {
		$scope.showAddButton = !current;
	};

	//Populate the dropdown with the list of custom services.
	if (!$scope.customServices) {
		$scope.customServices = clientAppHelper.getCustomServices();
		$scope.customServices.unshift({"id" : 0, "label" : "Please select a service..."});
	}
	$scope.selectedCustomService = $scope.customServices[0].id;

	//Add the new service to Chrome storage and the application dropdowns.
	$scope.ok = function() {
		//Prepare the data for storage.
		var timestamp = Date.now();
		var newServiceName = {id : timestamp, label : $scope.newServiceName, group : "Custom"};
		var newEndpoint = {env : "", service : timestamp, url : $scope.newServiceUrl};

		//Update the UI.
		$scope.newServiceName = "";
		$scope.newServiceUrl = "";
		$scope.customServices.push(newServiceName);
		SERVICES_CONFIG.services.unshift(newServiceName);
		SERVICES_CONFIG.endpoints.unshift(newEndpoint);

		//Add the new service to Chrome (Sync) Storage.
		var key = "restclient.service." + timestamp;
		var keyValue = {};
		keyValue[key] = {serviceName : newServiceName, endpoint : newEndpoint};
		chrome.storage.sync.set(keyValue, function() {
			$scope.alerts = [{type: 'success', msg: "The service (" + newServiceName.label + ") has been added. It will now appear in the Service dropdown."}];
			$scope.$apply();
		});
	};

	//Delete the specified custom service from Chrome storage and the application dropdowns.
	$scope.delete = function(selectedCustomService) {
		//Identify and remove the service from the application dropdowns.
		var serviceToDelete = clientAppHelper.findServiceById(selectedCustomService, $scope.customServices);
		$scope.customServices.splice($scope.customServices.indexOf(serviceToDelete), 1);
		SERVICES_CONFIG.services.splice(SERVICES_CONFIG.services.indexOf(serviceToDelete), 1);
		$scope.selectedCustomService = $scope.customServices[0].id;

		//Remove it from Chrome storage.
		var key = "restclient.service." + selectedCustomService;
		chrome.storage.sync.remove(key, function() {
			$scope.alerts = [{type: 'success', msg: "The selected service has been deleted."}];
			$scope.$apply();
		});
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
