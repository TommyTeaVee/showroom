import ShowroomComponent from "components/showroom-component";
import { isUUID } from "../../helpers/utils";
import { qAll } from "../../helpers/utils";
import * as Builder from "../../helpers/builder";

describe("Showroom component", () => {

  describe("Initialization", () => {
    it("should call the created callback function and create showroom instance", () => {
      const showroom = Builder.emptyShowroom();
      expect(showroom._register.items).toEqual([]);
      expect(isUUID(showroom.id)).toBe(true);
    });

    it("should prefer id on showroom element", () => {
      fixture.set("<showroom-element id='someId'></showroom-element>");
      const showroom = document.querySelector("showroom-element");
      expect(showroom.id).toEqual("someId");
    });

    it("should collect all items inside a showroom component", () => {
      const [showroom, items] = Builder.simpleShowroomItems();
      expect(items.map((node) => isUUID(node.id)))
        .toEqual([true, true, true, true, true]);

      expect(showroom._register.items.map((item) => isUUID(item.id)))
        .toEqual([true, true, true, true, true]);
    });

    it("should be closed initially", () => {
      const showroom = Builder.emptyShowroom();
      expect(showroom.isOpen).toBe(false);
    });

  });

  describe("rendering", () => {
    it("should reject when trying to render an invalid template", (done) => {
      const showroom = Builder.emptyShowroom();
      showroom.template = 2;

      showroom._renderTemplate().catch((reason) => {
        expect(reason).toEqual("'2' is not a valid template");
        done();
      })
    });

    it("should render an empty text content template", (done) => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "no HTML";

      showroom._renderTemplate().then((element) => {
        expect(element.textContent).toEqual("no HTML");
        done();
      });
    });

    it("should render an empty HTML content template", (done) => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "<p></p>";

      showroom._renderTemplate().then((element) => {
        expect(element.tagName).toEqual("P");
        done();
      });
    });

    it("should render an HTML content template with content provided", (done) => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "<p>{{content}}</p>";

      showroom._renderTemplate("paragraph").then((element) => {
        expect(element.tagName).toEqual("P");
        expect(element.textContent).toEqual("paragraph");
        done();
      });
    });
  });

  describe("fetching", () => {
    it("should reject when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

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
      const [showroom, item] = Builder.simpleShowroom();

      showroom._fetchItem(item).then((content) => {
        expect(content).toEqual("content");
        done();
      });
    });
  });

  describe("rendering item", () => {
    it("should reject when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

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
      const [showroom, item] = Builder.simpleShowroom();

      showroom._renderItem(item).then((element) => {
        expect(element.tagName).toEqual("P");
        expect(element.textContent).toEqual("content");
        done();
      });
    });
  });

  describe("open", () => {
    it("should reject when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

      showroom.open().catch((reason) => {
        expect(reason).toEqual("No item is provided");
      }).then(() => {
        showroom.open("i am no item").catch((reason) => {
          expect(reason).toEqual("No item is provided");
          done();
        });
      });
    });

    it("should be open when an item could be fetched successfully", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom.open(item).then(() => {
        expect(showroom.isOpen).toBe(true);
        done();
      });
    });

  it("should attach the fetched content to the renderTarget when an item could be fetched successfully", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom.open(item).then((element) => {
        expect(element.tagName).toEqual("P");
        expect(element.textContent).toEqual("content");
        expect(element.style.display).toEqual("block", "The content should be visible");
        done();
      });
    });

    it("should toggle the element when opening the showroom multiple times", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom.open(item).then(() => {
        showroom.close()
        showroom.open(item).then((element) => {
          expect(element.style.display).toEqual("block", "The content should be visible");
          done();
        });
      });
    });

    it("should only have one content element when opening multiple times", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom.open(item)
        .then(() => { showroom.open(item) })
        .then(() => {
          expect(qAll("p").map((node) => node.style.display))
            .toEqual(["block"]);
          done();
        });
    });
  });

  describe("close", () => {
    it("should make the content invisible", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom.open(item).then((element) => {
        expect(element.style.display).toEqual("block", "The content should be visible");
        showroom.close();
        expect(element.style.display).toEqual("none", "The content should be invisible");
        expect(showroom.isOpen).toBe(false);
        done();
      });
    });
  });

  describe("cycling", () => {
    it("should open the next item", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();

      showroom.open(items[0])
              .then(showroom.next.bind(showroom))
              .then((element) => {
                expect(element.textContent).toEqual("content");
                done();
              });
    });

    it("should open the previous item", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();

      showroom.open(items[1])
              .then(showroom.prev.bind(showroom))
              .then((element) => {
                expect(element.textContent).toEqual("content");
                done();
              });
    });

    it("should properly cycle through all the items", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();

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
        expect(results.map((result) => result.textContent))
          .toEqual(["content", "content", "content", "content", "content", "content", "content", "content", "content"]);
      }).then(done);
    });
  });

});
