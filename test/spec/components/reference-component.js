import * as Builder from "../../helpers/builder";
import ReferenceComponent from "components/reference-component";

describe("Reference component", () => {
  it("should open the showroom referencing the target", (done) => {
    const [ref, showroom, items] = Builder.showroomWithReference();

    ref.open(items[0]).then((element) => {
      expect(showroom.isOpen).toBe(true);
      expect(element.style.display).toEqual("block")
      done();
    });
  });
});
