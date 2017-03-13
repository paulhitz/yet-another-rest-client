describe('History Service', function() {
  beforeEach(module('clientApp'));

  var history, mockChromeLocalStorage;

  beforeEach(function() {
    var storage = {
      "yarc.favorite.1": {id: 1},
      "yarc.header.2": {id: 2},
    };
    mockChromeLocalStorage = {
      storage: {
        local: {
          get: function(foo, callback) {
            callback(storage);
          },
          set: function(data) {
            //Note: When running the tests, watch out for the generation of identical IDs (based on millisecs).
            Object.assign(storage, data);
          },
          remove: function(key, callback) {
            delete storage[key];
            callback();
          },
          clear: function(callback) {
            storage = {};
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

  beforeEach(inject(function(_history_){
    history = _history_;
  }));



  describe('get', function() {
    it('should only retrieve history objects', function() {
      history.set({});
      history.get(function(values) {
        expect(values.length).toBe(1);
      });
    });
    it('should update the date format', function() {
      history.set({date: "Wed Oct 07 2015 17:02:44 GMT+0100 (GMT Daylight Time)"});
      history.get(function(values) {
        expect(typeof values[0].date === 'object').toBe(true);
      });
    });
    it('should add the key to each returned object', function() {
      history.set({});
      history.get(function(values) {
        expect(values[0].key).not.toBeUndefined();
      });
    });
    it('should execute the callback and return the values', function() {
      var called = false;

      history.get();
      expect(called).toBe(false);

      history.get(function(values) {
        called = true;
      });
      expect(called).toBe(true);
    });
  });


  describe('set', function() {
    it('should save the data', function() {
      history.get(function(values) {
        expect(values.length).toBe(0);
      });
      history.set({});
      history.get(function(values) {
        expect(values.length).toBe(1);
      });
    });
  });


  describe('delete', function() {
    it('should remove the history object with the specified ID', function() {
      var id;
      history.set({});
      history.get(function(values) {
        expect(values.length).toBe(1);
        id = values[0].key;
      });

      history.delete(id);
      history.get(function(values) {
        expect(values.length).toBe(0);
      });
    });
    it('should execute the callback', function() {
      var id = 1;
      var called = false;

      history.delete(id);
      expect(called).toBe(false);

      history.delete(id, function() {
  			called = true;
  		});
      expect(called).toBe(true);
    });
  });


  describe('deleteAll', function() {
    it('should remove all history objects', function() {
      history.set({id: 100});
      sleep(1);
      history.set({id: 200});
      history.get(function(values) {
        expect(values.length).toBe(2);
      });

      history.deleteAll();
      history.get(function(values) {
        expect(values.length).toBe(0);
      });
    });
    it('should execute the callback', function() {
      var called = false;
      history.deleteAll(function() {
  			called = true;
  		});
      expect(called).toBe(true);
    });
  });


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

  //Quick 'n' dirty hack to delay code execution. Only for testing purposes. This will kill performance.
  function sleep(time) {
    var past = Date.now();
    var future;
    do {
      future = Date.now();
    } while (future - past < time);
  }
});
