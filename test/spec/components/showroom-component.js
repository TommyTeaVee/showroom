import ShowroomComponent from "components/showroom-component";
import { isUUID } from "../../helpers/utils";
import { qAll } from "../../helpers/utils";
import * as Builder from "../../helpers/builder";

describe("Showroom component", () => {

  describe("Initialization", () => {
    it("should call the created callback function and create showroom instance", () => {
      const [showroom, items] = Builder.showroom();
      expect(items.map((node) => isUUID(node.id)))
        .toEqual([true, true, true, true, true]);
      expect(isUUID(showroom.id)).toBe(true);
    });

    it("should prefer id on showroom element", () => {
      fixture.set("<showroom-element id='someId'></showroom-element>");
      const showroom = document.querySelector("showroom-element");
      expect(showroom.id).toEqual("someId");
    });

    it("should collect all items inside a showroom component", () => {
      const [showroom, items] = Builder.showroom();
      expect(items.map((node) => isUUID(node.id)))
        .toEqual([true, true, true, true, true]);

      expect(showroom._register.items.map((item) => isUUID(item.id)))
        .toEqual([true, true, true, true, true]);
    });

    it("should be closed initially", () => {
      const [showroom, items] = Builder.showroom();
      expect(showroom.isOpen).toBe(false);
    });

  });

  describe("rendering", () => {
    it("should reject when trying to render an invalid template", (done) => {
      const [showroom, items] = Builder.showroom();
      showroom.template = 2;

      showroom._renderTemplate().catch((reason) => {
        expect(reason).toEqual("'2' is not a valid template");
        done();
      })
    });

    it("should render an empty text content template", (done) => {
      const [showroom, items] = Builder.showroom();
      showroom.template = "no HTML";

      showroom._renderTemplate().then((content) => {
        expect(content).toEqual("no HTML");
        done();
      });
    });

    it("should render an empty HTML content template", (done) => {
      const [showroom, items] = Builder.showroom();
      showroom.template = "<p></p>";

      showroom._renderTemplate().then((content) => {
        expect(content).toEqual("<p></p>");
        done();
      });
    });

    it("should render an HTML content template with content provided", (done) => {
      const [showroom, items] = Builder.showroom();
      showroom.template = "<p>{{content}}</p>";

      showroom._renderTemplate("paragraph").then((content) => {
        expect(content).toEqual("<p>paragraph</p>");
        done();
      });
    });
  });

  describe("fetching", () => {
    it("should reject when no item is provided", () => {
      const [showroom, items] = Builder.showroom();

      showroom._fetchItem().catch((reason) => {
        expect(reason).toEqual("No item is provided")
      }).then(() => {
        showroom._fetchItem("i am no item").catch((reason) => {
          expect(reason).toEqual("No item is provided")
          done();
        });
      });
    });

    it("should fetch a target given on an item", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom._fetchItem(items[0]).then((content) => {
        expect(content).toEqual("content");
        done();
      });
    });
  });

  describe("rendering item", () => {
    it("should reject when no item is provided", () => {
      const [showroom, items] = Builder.showroom();

      showroom._renderItem().catch((reason) => {
        expect(reason).toEqual("No item is provided");
      }).then(() => {
        showroom._renderItem("i am no item").catch((reason) => {
          expect(reason).toEqual("No item is provided");
          done();
        });
      });
    });

    it("should fetch and render a given item", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom._renderItem(items[0]).then((content) => {
        expect(content).toEqual("content");
        done();
      });
    });
  });

  describe("open", () => {
    it("should reject when no item is provided", () => {
      const [showroom, items] = Builder.showroom();
      showroom.open().catch((reason) => {
        expect(reason).toEqual("No item is provided");
      });
    });

    it("should reject when wrong type of item is provided", () => {
      const [showroom, items] = Builder.showroom();
      showroom.open("i am no item").catch((reason) => {
        expect(reason).toEqual("No item is provided");
        done();
      });
    });

    it("should throw an error if no target component is available", (done) => {
      fixture.set("<showroom-element><showroom-item></showroom-item></showroom-element>");
      const showroom = document.querySelector("showroom-element");
      const item = document.querySelector("showroom-item");
      showroom.open(item).catch(reason => {
        expect(reason).toEqual("No showroom-target element is present in the DOM");
        done();
      });
    });

    it("should be open when an item could be fetched successfully", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0]).then(() => {
        expect(showroom.isOpen).toBe(true);
        done();
      });
    });

  it("should attach the fetched content to the renderTarget when an item could be fetched successfully", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0]).then((content) => {
        expect(content).toEqual("content")
        done();
      });
    });

    it("should toggle the element when opening the showroom multiple times", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0]).then(() => {
        showroom.close();
        showroom.open(items[0]).then((content) => {
          expect(content).toEqual("content");
          done();
        });
      });
    });

    it("should only have one content element when opening multiple times", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0])
        .then(() => { showroom.open(items[0]) })
        .then(() => {
          expect(qAll("showroom-target").map((node) => node.style.display))
            .toEqual(["block"]);
          done();
        });
    });
  });

  describe("close", () => {
    it("should make the content invisible", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0]).then(() => {
        expect(showroom.isOpen).toBe(true);
        showroom.close();
        expect(showroom.isOpen).toBe(false);
        done();
      });
    });
  });

  describe("cycling", () => {
    it("should open the next item", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[0])
              .then(showroom.next.bind(showroom))
              .then((content) => {
                expect(content).toEqual("content");
                done();
              });
    });

    it("should open the previous item", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.open(items[1])
              .then(showroom.prev.bind(showroom))
              .then((content) => {
                expect(content).toEqual("content");
                done();
              });
    });

    it("should properly cycle through all the items", (done) => {
      const [showroom, items] = Builder.showroom();

      Promise.all([
        showroom.next(),
        showroom.next(),
        showroom.next(),
        showroom.next(),
        showroom.prev(),
        showroom.prev(),
        showroom.prev(),
        showroom.prev(),
        showroom.prev()
      ]).then((results) => {
        expect(results)
          .toEqual(["content", "content", "content", "content", "content", "content", "content", "content", "content"]);
      }).then(done);
    });
  });

  describe("optimizations", () => {
    it("should not call render twice when opening the same item twice", (done) => {
      const [showroom, items] = Builder.showroom();
      const item = items[1];
      item.open().then(() => item.open()).then(() => {
        expect(showroom.renderCalls).toEqual(1);
        done();
      });
    });

    it("should open an other item after calling the previous item twice", (done) => {
      const [showroom, items] = Builder.showroom();
      const item = items[0];
      const item2 = items[1];
      item.open().then(() => item.open()).then(() => {
        expect(showroom.renderCalls).toEqual(1);
        item2.open().then(() => {
          expect(showroom.renderCalls).toEqual(2);
          done();
        })
      });
    });

    it("should properly cycle through all the items but not rendering items multiple times", (done) => {
      const [showroom, items] = Builder.showroom();

      showroom.next()
        .then(() => showroom.next())
        .then(() => showroom.next())
        .then(() => showroom.next())
        .then(() => showroom.next())
        .then(() => showroom.next())
        .then(() => showroom.next())
        .then(() => showroom.prev())
        .then(() => showroom.prev())
        .then(() => showroom.prev())
        .then(() => showroom.prev())
        .then(() => showroom.prev())
        .then(() => showroom.prev())
        .then(() => {
          expect(showroom.renderCalls).toEqual(8);
          done();
      });
    });
  });

});
