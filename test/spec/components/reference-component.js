import * as Builder from "../../helpers/builder";
import ReferenceComponent from "components/reference-component";

describe("Reference", () => {
  it("should open a the showroom referenced in the target", (done) => {
    const [ref, showroom, items] = Builder.showroomWithReference();

    ref.open(items[0]).then(() => {
      expect(showroom.isOpen).toBe(true);
      done();
    });
  });
});
