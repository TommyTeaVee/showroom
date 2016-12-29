import Register from "register";
import times from "times-loop";
import * as Builder from "../helpers/builder";

describe("Register", () => {
  describe("Initialization", () => {
    it("should initialize an empty Register", () => {
      const reg = new Register();
      assert.isTrue(Array.isArray(reg.items));
      assert.deepEqual(reg.items, []);
    });

    it("should store values given as an argument", () => {
      const reg = Builder.register();
      assert.deepEqual(reg.items, [1,2,3,4]);
    });

    it("should initialize the pointer with 0", () => {
      const reg = Builder.register();
      const reg2 = Builder.register();
      assert.equal(reg.pointer, 0);
      assert.equal(reg2.pointer, 0);
    });
  });

  describe("pointer", () => {
    it("should increase by 1 when calling next once", () => {
      const reg = Builder.register();
      reg.next();
      assert.equal(reg.pointer, 1);
    });

    it("should increase by 2 when calling twice", () => {
      const reg = Builder.register();
      reg.next();
      reg.next();
      assert.equal(reg.pointer, 2);
    });

    it("should keep the last item when overflowing the items list", () => {
      const reg = Builder.register();
      reg.next();
      reg.next();
      reg.next();
      reg.next();
      reg.next();
      assert.equal(reg.pointer, 3);
    });
  });

  describe("cycling", () => {
    it("should return undefined if no items are defined", () => {
      const reg = Builder.register([]);
      assert.isUndefined(reg.current());
    });

    it("should return the first item initially", () => {
      const reg = Builder.register();
      assert.equal(reg.current(), 1);
    });

    it("should cycle through the items list using next", () => {
      const reg = Builder.register();
      assert.equal(reg.current(), 1);
      reg.next();
      assert.equal(reg.current(), 2);
      reg.next();
      assert.equal(reg.current(), 3);
      reg.next();
      assert.equal(reg.current(), 4);
      reg.next();
      assert.equal(reg.current(), 4);
    });

    it("should cycle through the items list using next and prev", () => {
      const reg = Builder.register();
      assert.equal(reg.current(), 1);
      reg.prev();
      assert.equal(reg.current(), 1);
      reg.next();
      assert.equal(reg.current(), 2);
      reg.next();
      assert.equal(reg.current(), 3);
      reg.prev();
      assert.equal(reg.current(), 2);
    });
  });

  describe("head", () => {
    it("should not call head when the register is already set to the first element", () => {
      const reg = Builder.register();

      reg.prev();
      assert.equal(reg.headCalls, 0);
    });

    it("should call head when reaching the start of the register", () => {
      const reg = Builder.register();

      reg.next();
      reg.prev();
      reg.prev();
      assert.equal(reg.headCalls, 1);
    });

    it("should call head only once when reaching the start multiple times", () => {
      const reg = Builder.register();

      reg.next();
      times(3, reg.prev.bind(reg));
      assert.equal(reg.headCalls, 1);
    });

    it("should call head again when reaching the start again", () => {
      const reg = Builder.register();

      reg.next();
      times(3, reg.prev.bind(reg));
      reg.next();
      times(3, reg.prev.bind(reg));
      assert.equal(reg.headCalls, 2);
    });
  });

  describe("tail", () => {
    it("should call tail when reaching the end of the register", () => {
      const reg = Builder.register();

      times(4, reg.next.bind(reg));
      assert.equal(reg.tailCalls, 1);
    });

    it("should call tail only once when reaching the end multiple times", () => {
      const reg = Builder.register();

      times(6, reg.next.bind(reg));
      assert.equal(reg.tailCalls, 1);
    });

    it("should call tail again when reading the end again", () => {
      const reg = Builder.register();

      times(6, reg.next.bind(reg));
      reg.prev();
      times(6, reg.next.bind(reg));
      assert.equal(reg.tailCalls, 2);
    });
  });

  describe("set", () => {
    it("should throw an error when the item is not in the register", () => {
      const reg = Builder.register();

      assert.throws(() => {
        reg.set(5);
      }, Error, "This item is not part of the register")
    });

    it("should set the pointer to the item", () => {
      const reg = Builder.register();

      reg.set(3);
      assert.equal(reg.pointer, 2);
    });

    it("should not call head when setting to the first item initially", () => {
      const reg = Builder.register();

      reg.set(1);
      assert.equal(reg.headCalls, 0);
    });

    it("should call head when setting to the first item", () => {
      const reg = Builder.register();

      reg.set(2);
      reg.set(1);
      assert.equal(reg.headCalls, 1);
    });

    it("should call tail when setting to the last item", () => {
      const reg = Builder.register();

      reg.set(4);
      assert.equal(reg.tailCalls, 1);
    });

    it("should call head only once when setting to the first item twice", () => {
      const reg = Builder.register();

      reg.next();
      times(3, () => reg.set(1));
      assert.equal(reg.headCalls, 1);
    });

    it("should call tail only once when setting to the last item twice", () => {
      const reg = Builder.register();

      times(3, () => reg.set(4));
      assert.equal(reg.tailCalls, 1);
    });
  });

  describe("append", () => {
    it("should extend the default items with the new set of items", () => {
      const reg = Builder.register();
      reg.append([5, 6]);

      assert.deepEqual(reg.items, [1, 2, 3, 4, 5, 6]);
    });

    it("should not touch the pointer", () => {
      const reg = Builder.register();
      reg.append([5, 6]);

      assert.equal(reg.pointer, 0);
      assert.equal(reg.current(), 1);
    });

    it("should call tail again when reaching the end with an extended itemset", () => {
      const reg = Builder.register();
      reg.set(4);
      assert.equal(reg.tailCalls, 1);

      reg.append([6]);

      reg.next();
      assert.equal(reg.tailCalls, 2);
    });
  });
});
