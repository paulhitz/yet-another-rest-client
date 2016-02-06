describe('Requests Service', function() {
  beforeEach(module('clientApp'));

  var requests, headers, auth;
  beforeEach(inject(function(_requests_, _headers_, _auth_){
    requests = _requests_;
    headers = _headers_;
    auth = _auth_;
  }));

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
