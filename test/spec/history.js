import * as Builder from "../helpers/builder";

describe("history", () => {

  it("should store the item id in the history", (done) => {
    const [showroom, items] = Builder.showroom();
    const item = items[0];

    item.open().then(() => {
      expect(history.state["sid"]).toEqual(item.id);
      done();
    });
  });

  it("should open the previous item in the history when browser back is triggered", (done) => {
    const [showroom, items] = Builder.showroom();
    const item1 = items[0];
    const item2 = items[1];

    item1.open().then(() => {
      item2.open().then(() => {
        window.addEventListener("popstate", function(e) {
          expect(showroom._register.current().id).toEqual(item1.id);
          expect(e.state["sid"]).toEqual(item1.id);
          done();
        });
        history.back();
      });
    });
  });

  it("should close the showroom when no previous item is in the history", (done) => {
    const [showroom, items] = Builder.showroom();
    const item = items[0];

    item.open().then(() => {
      window.addEventListener("popstate", function() {
        expect(showroom.isOpen).toEqual(false);
        done();
      });
      history.back();
    });
  });

});
