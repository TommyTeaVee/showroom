beforeAll(() => {
  fixture.setBase('test/fixtures');
});

describe("Addition", () => {
  it("1 + 1 should equals 2", () => {
    assert.equal(1 + 1, 2);
  });
});

describe("HTML", () => {
  it("should contain a test div element", () => {
    fixture.load("test.html");
    assert.equal(fixture.el.querySelector("#test").id, "test");
  });
});
