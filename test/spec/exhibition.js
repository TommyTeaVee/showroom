import exhibition from "exhibition";
import * as Builder from "../helpers/builder";
import { qAll } from "../helpers/utils";

describe("Exhibition", () => {

  beforeEach(exhibition._reset);

  describe("Initialization", () => {

    it("should able to handle single showroom values", () => {
      const showroom = Builder.emptyShowroom();
      expect(exhibition.showrooms).toEqual([showroom]);
    });

    it("should have an empty showroom list", () => {
      expect(exhibition.showrooms).toEqual([]);
    });

  });

  describe("exhibit", () => {
    it("should extend showrooms with additional showrooms", () => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      expect(exhibition.showrooms).toEqual([s1, s2, s3, s4]);
    });
  });

  describe("withdraw", () => {
    it("should remove given showrooms", () => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      exhibition.withdraw([s3,s4]);
      expect(exhibition.showrooms).toEqual([s1, s2]);
    });
  });

  describe("findShowroom", () => {
    it("should return undefined if no showroom has been found", () => {
      expect(exhibition.findShowroom()).toBeUndefined();
    });

    it("should be able to find a showroom by id", () => {
      Builder.multipleIdShowrooms(3);
      expect(exhibition.findShowroom("showroom-2").id).toEqual("showroom-2");
    });
  });

  describe("getOpenShowrooms", () => {
    it("should be able to determine the current open showroom", (done) => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      const [_, item] = Builder.simpleShowroom();
      s3.open(item).then(() => {
        expect(exhibition._getOpenShowrooms()).toEqual([s3]);
        done();
      });
    });
  });

});
