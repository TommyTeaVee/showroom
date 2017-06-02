import TargetComponent from "components/target-component";
import { isUUID } from "../../helpers/utils";

describe("Target component", () => {

  describe("Initialization", () => {
    it("should call the created callback function and create a target instance", () => {
      fixture.set("<showroom-target></showroom-target>");
      const targetNode = document.querySelector("showroom-target");
      expect(isUUID(targetNode.id)).toBe(true);
    });

    it("should prefer id on target element", () => {
      fixture.set("<showroom-target id='someId'></showroom-target>");
      const showroom = document.querySelector("showroom-target");
      expect(showroom.id).toEqual('someId');
    });
  });

});
