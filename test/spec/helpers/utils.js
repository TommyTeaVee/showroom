import * as Utils from "utils";

describe("Utils", () => {

  class Dummy {}
  class Dummy2 {}

  describe("isInstance", () => {
    it("should return false when a single value is not an instance of Dummy2", () => {
      expect(Utils.isInstance(new Dummy(), Dummy2)).toBe(false);
    });

    it("should return true when a single value is an instance of Dummy", () => {
      expect(Utils.isInstance(new Dummy(), Dummy)).toBe(true);
    });

    it("should return false when on element of a list is not an instance of Dummy", () => {
      expect(Utils.isInstance(
        [new Dummy(), new Dummy(), new Dummy2()],
        Dummy
      )).toBe(false);
    });

    it("should return true when all elements of a list is are instances of Dummy", () => {
      expect(Utils.isInstance(
        [new Dummy(), new Dummy(), new Dummy()],
        Dummy
      )).toBe(true);
    });
  });
});
