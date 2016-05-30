describe('Headers Service', function() {
  beforeEach(module('clientApp'));

  var headers, utils, mockChromeLocalStorage;

  beforeEach(function() {
    var storage = {
      "yarc.favorite.1": {id: 1},
      "yarc.history.2": {id: 2},
    };
    mockChromeLocalStorage = {
      storage: {
        sync: {
          get: function(foo, callback) {
            callback(storage);
          },
          set: function(data, callback) {
            Object.assign(storage, data);
            callback();
          },
          remove: function(key, callback) {
            delete storage[key];
            callback();
          }
        }
      }
    };
    module(function ($provide) {
      $provide.decorator('$window', function ($delegate) {
        $delegate.chrome = mockChromeLocalStorage;
        return $delegate;
      });
    });
  });

  beforeEach(inject(function(_headers_, _utils_){
    headers = _headers_;
    utils = _utils_;
  }));


  describe('retrieve', function() {
    it('should retrieve saved header objects', function() {
      headers.save({id: 100});
      headers.retrieve(function(values) {
        expect(values.length).toBe(1);
      });
    });
    it('should only execute the callback if provided', function() {
      var called = false;
      headers.save({id: 101});

      headers.retrieve();
      expect(called).toBe(false);

      headers.retrieve(function(values) {
        called = true;
      });
      expect(called).toBe(true);
    });
  });

  describe('save', function() {
    it('should save the data', function() {
      headers.retrieve(function(values) {
        expect(values.length).toBe(0);
      });
      headers.save({id: 200});
      headers.retrieve(function(values) {
        expect(values.length).toBe(1);
      });
    });
    it('should only execute the callback if provided', function() {
      var called = false;

      headers.save({id: 201});
      expect(called).toBe(false);

      headers.save({id: 202}, function() {
        called = true;
      });
      expect(called).toBe(true);
    });
  });

  describe('delete', function() {
    it('should remove the header object with the specified ID', function() {
      var id = 300;
      headers.save({'id': id});
      headers.retrieve(function(values) {
        expect(values[0].id).toBe(id);
      });

      headers.delete(id);
      headers.retrieve(function(values) {
        expect(values.length).toBe(0);
      });
    });
    it('should only execute the callback if provided', function() {
      var id = 1;
      var called = false;

      headers.delete(id);
      expect(called).toBe(false);

      headers.delete(id, function() {
        called = true;
      });
      expect(called).toBe(true);
    });
  });

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
