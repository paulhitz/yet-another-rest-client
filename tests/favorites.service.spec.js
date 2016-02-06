describe('Favorites Service', function() {
  beforeEach(module('clientApp'));

  var favorites;
  beforeEach(inject(function(_favorites_){
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
});
