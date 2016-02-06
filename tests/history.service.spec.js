describe('History Service', function() {
  beforeEach(module('clientApp'));

  var history;
  beforeEach(inject(function(_history_){
    history = _history_;
  }));

  describe('isHistoryKey', function() {
    it('should check that the specifed key is in the correct format', function() {
      var invalidKeys = ["", "favorite", "history", "yarc.*", "*"];
      for (var key of invalidKeys) {
        expect(history.isHistoryKey(key)).toBeFalsy();
      }

      var validKey = "yarc.history.";
      expect(history.isHistoryKey(validKey)).toBeTruthy();
    });
  });

  describe('convertRequestHeaders', function() {
    it('should convert the input to a specific format', function() {
      var input = {
        Accept: "application/json, text/plain, */*"
      };

      var output = history.convertRequestHeaders(input);
      //The object has an unknown key.
      var property;
      for (var name in output) {
        property = output[name];
      }

      expect(property.name).toBe("Accept");
      expect(property.value).toBe("application/json, text/plain, */*");
      expect(property.id).not.toBe(undefined);
    });
  });
});
