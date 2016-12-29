import exhibition from "exhibition";
import * as Builder from "../helpers/builder";
import { qAll } from "../helpers/utils";

describe("Exhibition", () => {

  // Reset the instance for testing
  // This way the singleton is reset when starting a new test
  beforeEach(exhibition._reset);

  describe("Initialization", () => {

    it("should able to handle single showroom values", () => {
      const showroom = Builder.emptyShowroom();
      assert.deepEqual(exhibition.showrooms, [showroom]);
    });

    it("should have an empty showroom list", () => {
      assert.deepEqual(exhibition.showrooms, []);
    });

  });

  describe("exhibit", () => {
    it("should extend showrooms with additional showrooms", () => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      assert.deepEqual(exhibition.showrooms, [s1,s2,s3,s4]);
    });
  });

  describe("withdraw", () => {
    it("should remove given showrooms", () => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      exhibition.withdraw([s3,s4]);
      assert.deepEqual(exhibition.showrooms, [s1,s2]);
    });
  });

  describe("findShowroom", () => {
    it("should return undefined if no showroom has been found", () => {
      assert.isUndefined(exhibition.findShowroom());
    });

    it("should be able to find a showroom by id", () => {
      Builder.multipleIdShowrooms(3);
      assert.equal(exhibition.findShowroom("showroom-2").id, "showroom-2");
    });
  });

  describe("getOpenShowrooms", () => {
    it("should be able to determine the current open showroom", (done) => {
      const [s1, s2, s3, s4] = Builder.multipleShowrooms(4);
      const [_, item] = Builder.simpleShowroom();
      s3.template = "<p>{{content}}</p>"
      s3._fetch = () => "content"
      s3.open(item).done(() => {
        assert.deepEqual(exhibition._getOpenShowrooms(), [s3]);
        done();
      });
    });
  });

});
