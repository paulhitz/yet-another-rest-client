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
});
