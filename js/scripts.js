

var clientApp = angular.module('clientApp', []);

clientApp.factory('Data', function () {
  return { message: "test" };
});




function ClientController($scope, Data) {

  //$scope.authenticationCookie = "safdsfs";
  //$scope.requestUrl = "dsfdsf";

  //$scope.data = Data;
  
  $scope.test = function() {
    //alert("testing");
	$scope.data = Data;
  }
}












