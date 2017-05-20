import Exhibition from "exhibition";
import * as Builder from "../helpers/builder";
import { qAll } from "../helpers/utils";

describe("Exhibition", () => {

  beforeEach(Exhibition.getInstance()._reset);

  describe("Initialization", () => {

    it("should able to handle single showroom values", () => {
      const [showroom, items] = Builder.showroom();
      expect(Exhibition.getInstance().showrooms).toEqual([showroom]);
    });

    it("should have an empty showroom list", () => {
      expect(Exhibition.getInstance().showrooms).toEqual([]);
    });

  });

  describe("exhibit", () => {
    it("should extend showrooms with additional showrooms", () => {
      const [s1, s2, s3, s4] = Builder.exhibition(4);
      expect(Exhibition.getInstance().showrooms).toEqual([s1, s2, s3, s4]);
    });
  });

  describe("withdraw", () => {
    it("should remove given showrooms", () => {
      const [s1, s2, s3, s4] = Builder.exhibition(4);
      Exhibition.getInstance().withdraw([s3,s4]);
      expect(Exhibition.getInstance().showrooms).toEqual([s1, s2]);
    });
  });

  describe("findItem", () => {
    it("should return undefined if no item has been found", () => {
      expect(Exhibition.getInstance().findItem()).toBeUndefined();
    });

    it("should be able to find an item by id", () => {
      Builder.fixedShowroom();
      expect(Exhibition.getInstance().findItem("item2").id).toEqual("item2");
    });
  });

  describe("getOpenShowrooms", () => {
    it("should be able to determine the current open showroom", (done) => {
      const [s1, s2, s3, s4] = Builder.exhibition(4);
      s3.open(s3._register.items[3]).then(() => {
        expect(Exhibition.getInstance()._getOpenShowrooms()).toEqual([s3]);
        done();
      });
    });
  });

});
