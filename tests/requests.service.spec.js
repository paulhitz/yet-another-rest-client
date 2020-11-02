describe('Requests Service', function() {
  beforeEach(module('clientApp'));

  var requests, headers, auth, httpBackend, exampleRequest;
  beforeEach(inject(function(_requests_, _headers_, _auth_, $httpBackend){
    requests = _requests_;
    headers = _headers_;
    auth = _auth_;
    httpBackend = $httpBackend;
    httpBackend.whenGET("http://yet-another-rest-client.com/").respond("YARC!");

    exampleRequest = {
      requestMethod: {selected: "GET"},
      requestUrl: "http://yet-another-rest-client.com/",
      payload: ""
    };
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  //Disabled. Broken ("$digest already in progress") in newer versions of angular. 
  xdescribe('cancel', function() {
    it('should cancel a request', function() {
      requests.call(exampleRequest);
      requests.cancel();

      //There should be no requests outstanding.
      httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('call', function() {
    it('should send the specified request', function() {
      requests.call(exampleRequest).then(function(response) {
        expect(response.status).toBe(200);
        expect(response.data).toBe("YARC!");
      });
      httpBackend.flush();
    });

    it('should send a Content-Type header even with no request payload', function() {
      //Add a Content-Type request header.
      headers.set({key: {id: 0, name: "Content-Type", value: "application/json"}});
      requests.call(exampleRequest).then(function(response) {
        expect(response.status).toBe(200);
        expect(response.config.headers['Content-Type']).toBeDefined();
      });

      //Remove the payload field.
      delete exampleRequest['payload'];
      requests.call(exampleRequest).then(function(response) {
        expect(response.status).toBe(200);

        //The request header should still be present.
        expect(response.config.headers['Content-Type']).toBeDefined();
      });
      httpBackend.flush();
    });
  });

  describe('addHeaders', function() {
    it('should combine custom and auth headers in a specific format', function() {
      headers.set({key: {id: 0, name: "Accept", value: "text/plain"}});
      auth.set({value: 'Basic ZHVuczRsZWk6c3R1ZGlv'});

      var output = requests.addHeaders();
      expect(output['Accept']).toBe("text/plain");
      expect(output['Authorization']).toBe("Basic ZHVuczRsZWk6c3R1ZGlv");
    });
  });
});
