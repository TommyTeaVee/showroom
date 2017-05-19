import * as Builder from "../../helpers/builder";
import * as Event from "../../helpers/event";

describe("integration", () => {
  describe("reference-component", () => {
    xit("should open the corresponding item", () => {
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
