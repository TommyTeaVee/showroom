import exhibition from "exhibition";

beforeAll(() => {
  fixture.setBase('test/fixtures');
});

afterEach(function(){
  fixture.cleanup();
  exhibition._reset();
});
