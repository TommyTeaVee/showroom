import ItemComponent from "components/item-component";
import { isUUID } from "../../helpers/utils";

describe("Item component", () => {

  describe("Initialization", () => {

    xit("should throw an error when a showroom-item is not child of a showroom-element", () => {
      expect(() => { fixture.set("<showroom-item></showroom-item>") })
        .toThrowError("A 'showroom-item' must be a child element of a 'showroom-element'");
    });

    it("should call the created callback function and create an item instance", () => {
      fixture.set("<showroom-element><showroom-item></showroom-item></showroom-element>");
      const itemNode = document.querySelector("showroom-item");
      expect(isUUID(itemNode.id)).toBe(true);
    });

    it("should parse the target and title attribute on a showroom item node", () => {
      fixture.set("<showroom-element><showroom-item target='target' title='title'></showroom-item></showroom-element>")
      const itemNode = document.querySelector("showroom-item");
      expect(itemNode.target).toEqual("target");
      expect(itemNode.title).toEqual("title");
    });

    it("should prefer id on showroom item", () => {
      fixture.set("<showroom-element><showroom-item id='id'></showroom-item></showroom-element>");
      const itemNode = document.querySelector("showroom-item");
      expect(itemNode.id).toEqual("id");
    });
  });

});