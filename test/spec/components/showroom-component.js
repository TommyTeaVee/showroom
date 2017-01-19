import ShowroomComponent from "components/showroom-component";
import { isUUID } from "../../helpers/utils";
import { qAll } from "../../helpers/utils";
import * as Builder from "../../helpers/builder";
import Q from "q";

describe("Showroom component", () => {

  describe("Initialization", () => {
    it("should call the created callback function and create showroom instance", () => {
      const showroom = Builder.emptyShowroom();
      assert.deepEqual(showroom._register.items, []);
      assert.isTrue(isUUID(showroom.id));
    });

    it("should prefer id on showroom element", () => {
      fixture.set("<showroom-element id='peter'></showroom-element>");
      const showroom = document.querySelector("showroom-element");
      assert.equal(showroom.id, "peter");
    });

    it("should collect all items inside a showroom component", () => {
      const [showroom, items] = Builder.simpleShowroomItems();
      assert.deepEqual(
        items.map((node) => isUUID(node.id)), [true, true, true, true, true]
      );

      assert.deepEqual(
        showroom._register.items.map((item) => isUUID(item.id)), [true, true, true, true, true]
      );
    });

    it("should be closed initially", () => {
      const showroom = Builder.emptyShowroom();
      assert.isFalse(showroom.isOpen);
    });

  });

  describe("rendering", () => {
    it("should throw an error when trying to render an invalid template", () => {
      const showroom = Builder.emptyShowroom();
      showroom.template = 2;

      assert.throws(() => {
        showroom._renderTemplate();
      }, Error, "'2' is not a valid template");
    });

    it("should render an empty text content template", () => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "no HTML";

      assert.equal(showroom._renderTemplate().textContent, "no HTML");
    });

    it("should render an empty HTML content template", () => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "<p></p>";

      assert.equal(showroom._renderTemplate().tagName, "P");
    });

    it("should render an HTML content template with content provided", () => {
      const showroom = Builder.emptyShowroom();
      showroom.template = "<p>{{content}}</p>";

      const templateResult = showroom._renderTemplate("paragraph");
      assert.equal(templateResult.tagName, "P");
      assert.equal(templateResult.textContent, "paragraph");
    });
  });

  describe("fetching", () => {
    it("should throw an error when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

      assert.throws(() => {
        showroom._fetch();
      }, Error, "No item is provided");

      assert.throws(() => {
        showroom._fetch("i am no item");
      }, Error, "No item is provided");
    });

    it("should fetch a target given on an item", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom._fetch(item).done(done);

    });
  });

  describe("rendering item", () => {
    it("should throw an error when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

      assert.throws(() => {
        showroom._renderItem();
      }, Error, "No item is provided");

      assert.throws(() => {
        showroom._renderItem("i am no item");
      }, Error, "No item is provided");
    });

    it("should fetch and render a given item", (done) => {
      const [showroom, item] = Builder.simpleShowroom();

      showroom._renderItem(item).done(done);
    });
  });

  describe("customize rendering and fetching", () => {
    it("should prefer the customized fetch function", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom._fetch = () => "content";

      showroom._renderItem().pipe((data) => {
        assert.equal(data.textContent, "content");
        done();
      });
    });

    it("should prefer the customized render function", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom._fetch = () => "content";
      showroom._renderTemplate = (content) => content;

      showroom._renderItem().pipe((data) => {
        assert.equal(data, "content");
        done();
      });
    });
  });

  describe("open", () => {
    it("should throw an error when no item is provided", () => {
      const showroom = Builder.emptyShowroom();

      assert.throws(() => {
        showroom.open();
      }, Error, "No item is provided");

      assert.throws(() => {
        showroom.open("i am no item");
      }, Error, "No item is provided");
    });

    it("should be open when an item could be fetched successfully", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom.template = "<p>{{content}}</p>";
      showroom._fetch = () => "content";

      showroom.open(item).done(() => {
        assert.isTrue(showroom.isOpen);
        done();
      });
    });

  it("should attach the fetched content to the renderTarget when an item could be fetched successfully", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom.template = "<p>{{content}}</p>";
      showroom._fetch = () => "content";

      showroom.open(item).done((element) => {
        assert.equal(element.tagName, "P");
        assert.equal(element.textContent, "content");
        assert.equal(element.style.display, "block", "The content should be visible");
        done();
      });
    });

    it("should toggle the element when opening the showroom multiple times", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom.template = "<p class='content'>{{content}}</p>";
      showroom._fetch = () => "content";

      showroom.open(item).pipe(() => {
        showroom.close()
        showroom.open(item).done((element) => {
          assert.equal(element.style.display, "block", "The content should be visible");
          done();
        });
      });
    });

    it("should only have one content element when opening multiple times", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom.template = "<p class='content'>{{content}}</p>";
      showroom._fetch = () => "content";

      showroom.open(item)
        .pipe(() => { showroom.open(item) })
        .pipe(() => {
          assert.deepEqual(
            qAll(".content").map((node) => node.style.display),
            ["block"]
          );
          done();
        });
    });
  });

  describe("close", () => {
    it("should make the content invisible", (done) => {
      const [showroom, item] = Builder.simpleShowroom();
      showroom.template = "<p>{{content}}</p>";
      showroom._fetch = () => "content";

      showroom.open(item).done((element) => {
        assert.equal(element.style.display, "block", "The content should be visible");
        showroom.close();
        assert.equal(element.style.display, "none", "The content should be invisible");
        assert.isFalse(showroom.isOpen);
        done();
      });
    });
  });

  describe("cycling", () => {
    it("should open the next item", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();
      showroom.template = "<p>{{item.title}}</p>";
      showroom._fetch = () => "content";

      showroom.open(items[0])
              .pipe(showroom.next.bind(showroom))
              .done((element) => {
                assert.equal(element.textContent, "item2");
                done();
              });
    });

    it("should open the previous item", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();
      showroom.template = "<p>{{item.title}}</p>";
      showroom._fetch = () => "content";

      showroom.open(items[1])
              .pipe(showroom.prev.bind(showroom))
              .done((element) => {
                assert.equal(element.textContent, "item1");
                done();
              });
    });

    it("should properly cycle through all the items", (done) => {
      const [showroom, items] = Builder.simpleShowroomItems();
      showroom.template = "<p>{{item.title}}</p>";
      showroom._fetch = () => "content";

      Q.all([
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
        assert.deepEqual(
          results.map((result) => result.textContent)
          ["item2", "item3", "item4", "item5", "item4", "item3", "item2", "item1", "item1"]
        );
      }).then(done);
    });
  });

});
