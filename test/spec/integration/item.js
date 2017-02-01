import * as Builder from "../../helpers/builder";
import * as Event from "../../helpers/event";

describe("integration", () => {
  describe("item-component", () => {
    it("should open the showroom with the current item on click", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();

      showroom.onOpen.then((element) => {
        expect(showroom.renderCalls).toEqual(1);
        expect(element.title).toEqual("item3");
        done();
      });

      Event.click(items[2]);
    });
  });
});
