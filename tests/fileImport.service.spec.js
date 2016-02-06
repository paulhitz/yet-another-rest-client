describe('File Import', function() {
  beforeEach(module('clientApp'));

  var fileImport, foo;
  beforeEach(inject(function(_fileImport_){
    fileImport = _fileImport_;
    // foo = {
    //   MAX_IMPORT_FILE_SIZE: 1,
    // };
    // spyOn(foo, "getBar").and.returnValue(745);
    //    foo.setBar(123);




    // foo = jasmine.createSpy('GENERAL_CONSTANTS');
    // foo(1);




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
      //TODO mock GENERAL_CONSTANTS.MAX_IMPORT_FILE_SIZE to a tiny size and test
      var largeFile = new File(["lorem ipsum dolar sumit. lorem ipsum dolar sumit. lorem ipsum dolar sumit. "],
          "filename.json", {type: 'application/json'});
      //expect(fileImport.isValidFile(largeFile)).toBeFalsy();

      var tinyFile = new File([""], "filename.json", {type: 'application/json'});
      expect(fileImport.isValidFile(tinyFile)).toBeTruthy();


      //expect(bar).toEqual(1234);
    });
  });


  describe('hasValidContent', function() {
    it('should accept arrays only', function() {
      var valid = [
        [1, 2, 3],
        [{}, {}],
        []
      ];
      var invalid = [
        "",
        "foo",
        "[]",
        {foo: 'bar'},
        {},
        12345,
        0,
        true,
        null,
        undefined
      ];

      for (var validInput of valid) {
        expect(fileImport.hasValidContent(validInput)).toBeTruthy();
      }

      for (var invalidInput of invalid) {
        expect(fileImport.hasValidContent(invalidInput)).toBeFalsy();
      }
    });
  });


  xdescribe('importFile', function() {
    //TODO mock favorites and FileReader

  });
});
