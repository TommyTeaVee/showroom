import * as Builder from "../../helpers/builder";
import * as Event from "../../helpers/event";

describe("integration", () => {
  describe("keyboard-interactions", () => {

    it("should do nothing either hitting arrow left or arrow right if the showroom is closed", (done) => {
      const [showroom, items] = Builder.showroom();

      Event.hitArrowRight();

      items[0].open().then(() => {
        expect(showroom._register.current().title).toEqual("item1");
        done();
      });
    });

    it("should go to the next item when hitting the right arrow", (done) => {
      const [showroom, items] = Builder.showroom();

      items[0].open().then(() => {
        showroom.onOpen.then(() => {
          expect(showroom.renderCalls).toEqual(2);
          expect(showroom._register.current().title).toEqual("item2");
          done();
        });
        Event.hitArrowRight();
      });
    });

    it("should go to the previous item when hitting the left arrow", (done) => {
      const [showroom, items] = Builder.showroom();

      items[0].open().then(() => {
        showroom.onOpen.then(() => {
          expect(showroom.renderCalls).toEqual(1);
          expect(showroom._register.current().title).toEqual("item1");
          done();
        });
        Event.hitArrowLeft();
      });
    });

    it("should close the showroom when hitting the escape button", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.onClose.then(() => {
        expect(showroom.isOpen).toEqual(false);
        done();
      })

      items[0].open().then(() => {
        Event.hitEscape();
      });

    });
  });
});
