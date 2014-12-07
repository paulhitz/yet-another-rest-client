

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


function CallService($scope, $http) {

//see cookiemanager.java
/*
        headers.set("x-dnb-user", username);
        headers.set("x-dnb-pwd", password);
        headers.set("ApplicationId", "36");

*/




	var config = {headers: {
				'Authorization': 'M3b6kAJNEJWf3%2Frb4O8nie%2BW9s6uWoxvrwL3bY95BZloEykgWLzW9ZtPnwR%2BQNccsOlDBWx2UIrndD8NKmyaFqbntsazFDXm5MWNDmtZUE%2BDu9H45KVIHnKhbEPfxjH0b34fvf7MwVLjMuVdq0c5gphFC5v5SPNgfbDwxvAUkUWIdLBRHzmFQN9KM2hvWXethIfTeIIDZynl9YhDt3SrSHFvpr34i96wAWga3Imct23JU7tOQZ2vdJziL5lsfhH9lQJfyLrXlZ7pb7z493PE3BErQnzPgSzbmVUmtSKOgkm8AFweKDTX2HVv1SeYm6hUBVipMYgHZYZOn0oBd070AA%3D%3D'
				
			}
		};
		
		//'ApplicationId': '36'
		//'Access-Control-Expose-Headers': 'X-Foo'
		//'Accept': 'application/json;odata=verbose'
		//Request header field X-Foo is not allowed by Access-Control-Allow-Headers.

    $http.get('http://rest-service.guides.spring.io/greeting', config).
        success(function(data, status, headers, config) {
            $scope.response = data;
			//alert("headers = " + headers);
			//alert("config = " + config);
			//alert("status = " + status);
			$scope.headers = headers();
			//$scope.headers = headers('Content-Type');
			console.log(headers());
			console.log(JSON.stringify(data));
			console.log(data);
            console.log(JSON.stringify(status));
        });
}







