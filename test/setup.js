import exhibition from "exhibition";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10;

beforeAll(() => {
  fixture.setBase('test/fixtures');
});

afterEach(function(){
  fixture.cleanup();
  exhibition._reset();
});
