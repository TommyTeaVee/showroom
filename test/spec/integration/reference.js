import * as Builder from "../../helpers/builder";
import * as Event from "../../helpers/event";

describe("integration", () => {
  describe("reference-component", () => {
    it("should open the corresponding showroom", (done) => {
      const [ref, showroom] = Builder.showroomWithReference();

      showroom.onOpen.then(() => {
        assert.equal(showroom.renderCalls, 1);
        done();
      });

      Event.click(ref);
    });
  });
});
