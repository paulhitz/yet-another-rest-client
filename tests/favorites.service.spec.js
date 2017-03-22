describe('Favorites Service', function() {
  beforeEach(module('clientApp'));

  var favorites, mockChromeSyncStorage;

  beforeEach(function() {
    var storage = {
      "yarc.favorite.0": {id: 0},
      "yarc.header.1": {id: 1},
      "yarc.favorite.2": {id: 2},
      "yarc.header.3": {id: 3},
      "yarc.1": {id: 3}
    };
    mockChromeSyncStorage = {
      storage: {
        sync: {
          get: function(foo, callback) {
            callback(storage);
          },
          set: function(keyValue, callback) {
            //No need to test the mock. Just execute the callback.
            //Object.assign(storage, keyValue);
            callback();
          },
          remove: function(key, callback) {
            //No need to test the mock by removing the favorite. Just execute the callback.
            //delete storage[key];
            callback();
          }
        }
      }
    };
    module(function ($provide) {
      $provide.decorator('$window', function ($delegate) {
        $delegate.chrome = mockChromeSyncStorage;
        return $delegate;
      });
    });
  });

  beforeEach(inject(function(_favorites_) {
    favorites = _favorites_;
  }));


  describe('add', function() {
    it('should add a favorites object', function() {
      expect(favorites.get().length).toBe(0);

      var exampleFavorites = [ {id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4} ];
      for (var fav of exampleFavorites) {
        favorites.add(fav);
      }
      expect(favorites.get().length).toBe(exampleFavorites.length);
    });

    it('should replace a duplicate', function() {
      expect(favorites.get().length).toBe(0);

      //Uniqueness is based on the ID only.
      var exampleFavorites = [ {id: 0, ignored: true}, {id: 1}, {id: 0}, {id: 3}, {id: 0} ];
      var numUniqueFavorites = 3;
      for (var fav of exampleFavorites) {
        favorites.add(fav);
      }
      expect(favorites.get().length).toBe(numUniqueFavorites);
    });
  });


  describe('findById', function() {
    it('should return a favorite with the specified ID', function() {
      expect(favorites.findById(999)).not.toBeDefined();

      var invalidFavorites = [ {id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4} ];
      for (var fav of invalidFavorites) {
        favorites.add(fav);
      }
      expect(favorites.findById(999)).not.toBeDefined();

      var validFavorite = {id: 999};
      favorites.add(validFavorite);
      expect(favorites.findById(999)).toBe(validFavorite);
    });
  });


  describe('isValidKey', function() {
    it('should check that the specifed key is in the correct format', function() {
      var invalidKeys = ["", "favorite", "yarc.*", "*", "yarc.favourite."];
      for (var key of invalidKeys) {
        expect(favorites.isValidKey(key)).toBeFalsy();
      }

      var validKey = "yarc.favorite.";
      expect(favorites.isValidKey(validKey)).toBeTruthy();
    });
  });


  describe('isValidFavorite', function() {
    it('should check that the specified favorite contains all the required fields', function() {
      var invalidFavorites = [
        null,
        undefined,
        "foo",
        {id: 0},
        {id: 0, name: "foo", url: ""},
        {id: 0, name: "foo", method: ""},
        {id: 0, name: "", method: "", url: "", headers: ""},
        {id: 0, name: "", method: "", url: "", headers: {}, auth: ""}
      ];
      for (var invalid of invalidFavorites) {
        expect(favorites.isValidFavorite(invalid)).toBeFalsy();
      }

      var validFavorites = [
        {id: 0, name: "", url: "", method: ""},
        {id: 0, name: "", url: "", method: "", headers: {}},
        {id: 0, name: "", url: "", method: "", auth: {}},
        {id: 0, name: "", url: "", method: "", headers: {}, auth: {}}
      ];
      for (var valid of validFavorites) {
        expect(favorites.isValidFavorite(valid)).toBeTruthy();
      }
    });
  });


  //TODO use spyOn to configure what to expect from the mocks?
  describe('retrieveFavorites', function() {
    it('should only retrieve favorites', function() {
      expect(favorites.get().length).toBe(0);
      favorites.retrieveFavorites();
      expect(favorites.get().length).toBe(2);
    });
  });


  describe('saveFavorite', function() {
    it('should save a favorite', function() {
      var favorite = {id: 100};
      expect(favorites.get().length).toBe(0);
      favorites.saveFavorite(favorite);
      expect(favorites.get().length).toBe(1);
    });
    it('should execute the callback', function() {
      var favorite = {id: 101};
      var called = false;

      favorites.saveFavorite(favorite, function() {
  			called = true;
  		});
      expect(called).toBe(true);
    });
  });


  describe('saveMultipleFavorites', function() {
    it('should save all valid favorites', function() {
      var testFavorites = [
        {id: 200, name: "Valid Favorite", url: "", method: ""},
        {id: 201, name: "Another Valid Favorite", url: "", method: ""},
        {name: "Invalid Favorite"}
      ];

      expect(favorites.get().length).toBe(0);
      var numValidFavorites = favorites.saveMultipleFavorites(testFavorites);
      expect(favorites.get().length).toBe(numValidFavorites);
      expect(numValidFavorites).toBe(2);
    });
  });


  describe('deleteFavorite', function() {
    it('should remove the favorite with the specified ID', function() {
      expect(favorites.get().length).toBe(0);
      favorites.add({id: 300});
      favorites.add({id: 301});
      expect(favorites.get().length).toBe(2);
      favorites.deleteFavorite(300);
      expect(favorites.get().length).toBe(1);
    });
    it('should execute the callback', function() {
      favorites.add({id: 300});
      var called = false;
      favorites.deleteFavorite(300, function() {
  			called = true;
  		});
      expect(called).toBe(true);
    });
  });


  describe('deleteAllFavorites', function() {
    it('should remove all favorites', function() {
      favorites.retrieveFavorites();
      expect(favorites.get().length).toBe(2);

      favorites.deleteAllFavorites();
      expect(favorites.get().length).toBe(0);
    });
    it('should execute the callback', function() {
      var called = false;
      favorites.deleteAllFavorites(function() {
        called = true;
      });
      expect(called).toBe(true);
    });
  });
});
