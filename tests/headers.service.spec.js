describe('Headers Service', function() {
  beforeEach(module('clientApp'));

  var headers, utils;
  beforeEach(inject(function(_headers_, _utils_){
    headers = _headers_;
    utils = _utils_;
  }));

  describe('set', function() {
    it('should set headers and maintain object reference', function() {
      var headersReference = headers.get();
      expect(utils.isEmptyObject(headersReference)).toBeTruthy();

      headers.set({id: 0, name: "", value: ""});
      expect(utils.isEmptyObject(headersReference)).toBeFalsy();
      expect(headersReference.id).toBe(0);

      headers.set({id: 1, name: "", value: ""});
      expect(headersReference.id).toBe(1);
    });
  });

  describe('prepareHeadersForDisplay', function() {
    it('should generate a label', function() {
      var before = [
        {name: "foo", value: "bar"},
        {name: "Accept", value: "application/json"},
        {name: "", value: ""},
        {}
      ];
      var after = headers.prepareHeadersForDisplay(before, "test");
      expect(after[0].label).toEqual("foo: bar");
      expect(after[1].label).toEqual("Accept: application/json");
      expect(after[2].label).toEqual(": ");
      expect(after[3].label).toEqual("undefined: undefined");
    });

    it('should add the specified group name', function() {
      var input = [{name: "foo", value: "bar"}];
      var output = headers.prepareHeadersForDisplay(input, "test");
      expect(output[0].group).toBe("test");
    });
  });

  describe('isHeaderKey', function() {
    it('should check that the specifed key is in the correct format', function() {
      var invalidKeys = ["", "favorite", "header", "yarc.*", "*"];
      for (var key of invalidKeys) {
        expect(headers.isHeaderKey(key)).toBeFalsy();
      }

      var validKey = "yarc.header.";
      expect(headers.isHeaderKey(validKey)).toBeTruthy();
    });
  });
});
