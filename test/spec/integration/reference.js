import * as Builder from "../../helpers/builder";
import * as Event from "../../helpers/event";

describe("integration", () => {
  describe("reference-component", () => {
    it("should open the corresponding showroom", (done) => {
      const [ref, showroom] = Builder.showroomWithReference();

      showroom.onOpen.then((element) => {
        expect(showroom.renderCalls).toEqual(1);
        expect(element.title).toEqual("item1");
        done();
      });

      Event.click(ref);
    });
  });
});
