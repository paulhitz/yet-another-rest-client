describe('File Import Service', function() {
  beforeEach(module('clientApp'));

  var fileImport;
  beforeEach(inject(function(_fileImport_){
    fileImport = _fileImport_;
  }));


  describe('isValidFile', function() {
    it('should be an object', function() {
      expect(fileImport.isValidFile()).toBeFalsy();
      expect(fileImport.isValidFile("foo")).toBeFalsy();

      var file = new File([""], "filename.json", {type: 'application/json'});
      expect(fileImport.isValidFile(file)).toBeTruthy();
    });

    it('should have the correct file extension', function() {
      var validFile = new File([""], "filename.json", {type: 'application/json'});
      expect(fileImport.isValidFile(validFile)).toBeTruthy();

      var invalidFile = new File([""], "filename.txt", {type: 'application/json'});
      expect(fileImport.isValidFile(invalidFile)).toBeFalsy();
    });

    it('should be under a max size', function() {
      var smallContent = "0123456789";
      var tinyFile = new File([smallContent], "filename.json", {type: 'application/json'});
      expect(fileImport.isValidFile(tinyFile)).toBeTruthy();

      var largeContent = smallContent.repeat(25001);
      var largeFile = new File([largeContent], "filename.json", {type: 'application/json'});
      expect(fileImport.isValidFile(largeFile)).toBeFalsy();
    });
  });


  describe('hasValidContent', function() {
    it('should accept arrays only', function() {
      var valid = [
        [1, 2, 3],
        [{}, {}],
        []
      ];
      for (var validInput of valid) {
        expect(fileImport.hasValidContent(validInput)).toBeTruthy();
      }

      var invalid = ["", "foo", "[]", {foo: 'bar'}, {}, 12345, 0, true, null, undefined];
      for (var invalidInput of invalid) {
        expect(fileImport.hasValidContent(invalidInput)).toBeFalsy();
      }
    });
  });
});
