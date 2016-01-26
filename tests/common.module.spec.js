describe('common utility functions', function() {
  beforeEach(module('common'));

  var utils;
  beforeEach(inject(function(_utils_){
    utils = _utils_;
  }));


  describe('replaceAll', function() {
    it('should replace all occurrences of the target value with the replacement value', function() {
      expect(utils.replaceAll("22-222-8632", "-", "")).toEqual("222228632");
      expect(utils.replaceAll("-22----222-8632-", "-", "")).toEqual("222228632");
      expect(utils.replaceAll("222228632", "-", "")).toEqual("222228632");
      expect(utils.replaceAll("Did this work? No", "No", "Yes")).toEqual("Did this work? Yes");
      expect(utils.replaceAll("The rain in Spain stays mainly in the plain", "ain", "ail"))
          .toEqual("The rail in Spail stays mailly in the plail");
    });

    it('should handle empty strings', function() {
      expect(utils.replaceAll("22-222-8632", "", "")).toBe("22-222-8632");
      expect(utils.replaceAll("12345", "", "0, ")).toBe("10, 20, 30, 40, 5");
      expect(utils.replaceAll("12345-", "-", "")).toBe("12345");
      expect(utils.replaceAll("", "target", "replacement")).toBe("");
    });
  });


  describe('isEmptyObject', function() {
    it('should identify empty objects', function() {
      expect(utils.isEmptyObject({})).toEqual(true);
      expect(utils.isEmptyObject({foo: 'bar'})).toEqual(false);
      expect(utils.isEmptyObject([])).toEqual(false);
    });
  });


  describe('emptyObject', function() {
    it('should remove the properties from an object', function() {
      var exampleObjects = [
        {foo: 'bar'},
        {foo: 'bar', test: 'test'},
        {foo: 'bar', test: 'test', object: {foo: 'bar'}},
        {object: {foo: 'bar'}}
      ];

      for (var obj of exampleObjects) {
        utils.emptyObject(obj);
        expect(obj).toEqual({});
      }
    });

    it('should ensure that the object reference is maintained', function() {
      var obj = {foo: 'bar'};
      var obj2 = obj;
      utils.emptyObject(obj);
      expect(obj2).toEqual({});
    });
  });


  describe('isBlankObject', function() {
    it('should fail on objects with properties', function() {
      expect(utils.isBlankObject({foo: 'bar'})).not.toEqual(true);
    });

    it('should handle empty objects', function() {
      expect(utils.isBlankObject({})).toEqual(true);
    });

    it('should handle undefined inputs', function() {
      var x;
      expect(utils.isBlankObject(x)).toEqual(true);
    });
  });


  describe('stringify', function() {
    it('should change numbers to strings', function() {
      expect(utils.stringify(123456789)).toBe("123456789");
    });
    it('should ignore strings', function() {
      expect(utils.stringify("lorem ipsum dolar sumit")).toBe("lorem ipsum dolar sumit");
    });
    it('should change objects to strings', function() {
      expect(utils.stringify({foo: "lorem ipsum dolar sumit"})).toBe('{\n  "foo": "lorem ipsum dolar sumit"\n}');
    });
    //This is an issue with AngularJS 1.2.8 Stringify function.
    it('should not remove object properties named $t', function() {
      expect(utils.stringify({"FilingDate": {"$t": "2015-12-10"}})).toBe('{\n  "FilingDate": {\n    "$t": "2015-12-10"\n  }\n}');
      expect(utils.stringify({"FilingDate": {"$t": "2015-12-10"}})).not.toBe('{\n  "FilingDate": {}\n}');
    });
  });


  xdescribe('copyToClipboard', function() {
    //No idea how to test this.
  });


  xdescribe('download', function() {
    //No idea how to test this.
  });
});
