describe('Authentication', function() {
  beforeEach(module('clientApp'));

  var auth;
  beforeEach(inject(function(_auth_){
    auth = _auth_;
  }));

  describe('generateBasicAuthHeader', function() {
    it('should generate correct auth values', function() {
      var exampleAuthValues = [
        {name: "foo", password: "bar", value: "Basic Zm9vOmJhcg=="},
        {name: "Aladdin", password: "OpenSesame", value: "Basic QWxhZGRpbjpPcGVuU2VzYW1l"},
        {name: "", password: "", value: "Basic Og=="},
        {name: "someone@example.com", password: "password1", value: "Basic c29tZW9uZUBleGFtcGxlLmNvbTpwYXNzd29yZDE="},
        {name: "L160000003", password: "10:aa835a32d3:cb0fded500", value: "Basic TDE2MDAwMDAwMzoxMDphYTgzNWEzMmQzOmNiMGZkZWQ1MDA="},
        {name: "name", value: "Basic bmFtZTp1bmRlZmluZWQ="},
        {password: "password", value: "Basic dW5kZWZpbmVkOnBhc3N3b3Jk"},
        {value: "Basic dW5kZWZpbmVkOnVuZGVmaW5lZA=="}
      ];

      for (var obj of exampleAuthValues) {
        expect(auth.generateBasicAuthHeader(obj.name, obj.password)).toBe(obj.value);
      }
    });
  });

  describe('set', function() {
    it('should use the value property of an object', function() {
      auth.set({value: 'foo'});
      expect(auth.get().value).toBe("foo");
    });

    it('should set the value', function() {
      auth.set("foo");
      expect(auth.get().value).toBe("foo");
    });
  });
});
