describe('Helper Service', function() {
  beforeEach(module('clientApp'));

  var appHelper;
  beforeEach(inject(function(_appHelper_){
    appHelper = _appHelper_;
  }));

  describe('isValidResponse', function() {
    it('should check that the response is valid', function() {
      var invalidResponses = [
        "",
        {},
        {id: "foo"},
        {status: 200},
        {config: {}}
      ];
      for (var invalid of invalidResponses) {
        expect(appHelper.isValidResponse(invalid)).toBeFalsy();
      }

      var valid = {status: 200, config: {}};
      expect(appHelper.isValidResponse(valid)).toBeTruthy();
    });
  });

  describe('isHtml', function() {
    it('should not be blank', function() {
      expect(appHelper.isHtml()).toBeFalsy();
      expect(appHelper.isHtml("")).toBeFalsy();
    });

    it('should be of type HTML', function() {
      expect(appHelper.isHtml("application/json")).toBeFalsy();
      expect(appHelper.isHtml("text/html; charset=utf-8")).toBeTruthy();
      expect(appHelper.isHtml("text/html")).toBeTruthy();
    });
  });

  describe('calculateObjectSize', function() {
    it('should roughly calculate the size of the specifed object', function() {
      expect(appHelper.calculateObjectSize({})).toBe(0);

      var largeObject = {};
      for (var x = 0; x <= 100; x++) {
        largeObject[x] = new Date().toUTCString();
      }
      expect(appHelper.calculateObjectSize(largeObject)).toBeGreaterThan(1000);

      //TODO trigger an exception to test -1 is returned
      //expect(appHelper.calculateObjectSize({})).toBe(-1);
    });
  });

  describe('determineStatus', function() {
    it('should return the XMLHttpRequest value if the request failed', function() {
      expect(appHelper.determineStatus(-1, "error")).toBe("ERROR");
      expect(appHelper.determineStatus(-1, "foo")).toBe("FOO");
      expect(appHelper.determineStatus(-1, "")).toBe("");
      expect(appHelper.determineStatus(-1, undefined)).toBe("");
    });
    it('should return the status value if the request succeeded', function() {
      expect(appHelper.determineStatus(200, "foo")).toBe(200);
      expect(appHelper.determineStatus(500, undefined)).toBe(500);
      expect(appHelper.determineStatus(undefined, "foo")).toBeUndefined();
    });
  });

  describe('determineStatusText', function() {
    it('should return an unknown status text if none is available', function() {
      expect(appHelper.determineStatusText(999, undefined)).toBe("Unknown HTTP Status Code.");
      expect(appHelper.determineStatusText(999, "")).toBe("Unknown HTTP Status Code.");
      expect(appHelper.determineStatusText("", "")).toBe("Unknown HTTP Status Code.");
    });
    it('should return a description for the provided status value', function() {
      expect(appHelper.determineStatusText(200, "foo")).toBe("OK");
      expect(appHelper.determineStatusText(500, "foo")).toBe("Internal Server Error");
      expect(appHelper.determineStatusText("ABORT", "foo")).toBe("The request was cancelled.");
    });
    it('should return the status text from the response if no other status text is available', function() {
      expect(appHelper.determineStatusText(999, "foo")).toBe("foo");
      expect(appHelper.determineStatusText(undefined, "foo")).toBe("foo");
    });
  });
});
