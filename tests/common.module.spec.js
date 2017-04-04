describe('Common Utils', function() {
  beforeEach(module('common'));

  var utils, $filter;
  beforeEach(inject(function(_utils_, _$filter_){
    utils = _utils_;
    $filter = _$filter_;
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


  describe('updateObject', function() {
    it('should update the properties of an object', function() {
      var exampleOriginalObjects = [
        {foo: 'bar'},
        {foo: 'bar', test: 'test'},
        {foo: 'bar', test: 'test', object: {foo: 'bar'}},
        {object: {foo: 'bar'}}
      ];
      var exampleReplacementObjects = [
        {},
        {bar: 'foo'},
        {foo: 'foo', test: 'test', object: {foo: 'bar', bar: 0}},
        {object: {bar: 'foo'}}
      ];

      for (var original of exampleOriginalObjects) {
        for (var replacement of exampleReplacementObjects) {
          utils.updateObject(original, replacement);
          expect(original).toEqual(replacement);
        }
      }
    });

    it('should ensure that the object reference is maintained', function() {
      var original = {foo: 'bar'};
      var replacement = {bar: 'foo'};
      var originalReference = original;
      utils.updateObject(original, replacement);
      expect(originalReference.bar).toEqual('foo');
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


  describe('estimateObjectSize', function() {
    it('should roughly estimate object size', function() {
      expect(utils.estimateObjectSize({})).toBe(0);

      var input = {
        foo: "bar",
        bar: 123,
        boolean: true,
        complex: {foo: "bar"}
      };
      expect(utils.estimateObjectSize(input)).toBe(70);
    });
    it('should return 8 for a number', function() {
      expect(utils.estimateObjectSize(0)).toBe(8);
      expect(utils.estimateObjectSize(1)).toBe(8);
      expect(utils.estimateObjectSize(100)).toBe(8);
      expect(utils.estimateObjectSize(10000000)).toBe(8);
      expect(utils.estimateObjectSize(99999999)).toBe(8);
    });
    it('should return 4 for a Boolean', function() {
      expect(utils.estimateObjectSize(true)).toBe(4);
      expect(utils.estimateObjectSize(false)).toBe(4);
    });
    it('should return twice the length for a String', function() {
      expect(utils.estimateObjectSize("")).toBe(0);
      expect(utils.estimateObjectSize(" ")).toBe(2);
      expect(utils.estimateObjectSize("Foo")).toBe(6);
      expect(utils.estimateObjectSize("Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo "
        + "Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo "
        + "Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo Foo ")).toBe(456);
    });
    it('should return 0 for an unknown input', function() {
      expect(utils.estimateObjectSize(function(){})).toBe(0);
    });
  });


  describe('asTrusted filter', function() {
    it('should return a trusted object', function() {
      var asTrusted = $filter('asTrusted');
      var input = '<!DOCTYPE html><html lang="en"><head><title>Foo</title></head><body></body></html>';
      expect(typeof input).not.toEqual('object');
      expect(typeof asTrusted(input)).toEqual('object');
    });
  });


  xdescribe('copyToClipboard', function() {
    // xit('should copy to the system clipboard', function() {
    //   //No idea how to test this.
    // });
  });


  xdescribe('download', function() {
    // xit('should trigger a download', function() {
    //   //No idea how to test this.
    // });
  });
});
