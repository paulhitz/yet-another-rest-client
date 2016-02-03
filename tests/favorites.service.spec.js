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

  //TODO findById, isValidKey, isValidFavorite
});
