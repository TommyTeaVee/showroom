import Register from "register";
import times from "times-loop";
import * as Builder from "../helpers/builder";

describe("Register", () => {
  describe("Initialization", () => {
    it("should initialize an empty Register", () => {
      const reg = new Register();
      expect(Array.isArray(reg.items)).toBe(true);
      expect(reg.items).toEqual([]);
    });

    it("should store values given as an argument", () => {
      const reg = Builder.register();
      expect(reg.items).toEqual([1, 2, 3, 4])
    });

    it("should initialize the pointer with 0", () => {
      const reg = Builder.register();
      const reg2 = Builder.register();
      expect(reg.pointer).toEqual(0);
      expect(reg2.pointer).toEqual(0);
    });
  });

  describe("pointer", () => {
    it("should increase by 1 when calling next once", () => {
      const reg = Builder.register();
      reg.next();
      expect(reg.pointer).toEqual(1);
    });

    it("should increase by 2 when calling twice", () => {
      const reg = Builder.register();
      reg.next();
      reg.next();
      expect(reg.pointer).toEqual(2);
    });

    it("should keep the last item when overflowing the items list", () => {
      const reg = Builder.register();
      reg.next();
      reg.next();
      reg.next();
      reg.next();
      reg.next();
      expect(reg.pointer).toEqual(3);
    });
  });

  describe("cycling", () => {
    it("should return undefined if no items are defined", () => {
      const reg = Builder.register([]);
      expect(reg.current()).not.toBeDefined();
    });

    it("should return the first item initially", () => {
      const reg = Builder.register();
      expect(reg.current()).toEqual(1);
    });

    it("should cycle through the items list using next", () => {
      const reg = Builder.register();
      expect(reg.current()).toEqual(1);
      reg.next();
      expect(reg.current()).toEqual(2);
      reg.next();
      expect(reg.current()).toEqual(3);
      reg.next();
      expect(reg.current()).toEqual(4);
      reg.next();
      expect(reg.current()).toEqual(4);
    });

    it("should cycle through the items list using next and prev", () => {
      const reg = Builder.register();
      expect(reg.current()).toEqual(1);
      reg.prev();
      expect(reg.current()).toEqual(1);
      reg.next();
      expect(reg.current()).toEqual(2);
      reg.next();
      expect(reg.current()).toEqual(3);
      reg.prev();
      expect(reg.current()).toEqual(2);
    });
  });

  describe("head", () => {
    it("should not call head when the register is already set to the first element", () => {
      const reg = Builder.register();

      reg.prev();
      expect(reg.headCalls).toEqual(0);
    });

    it("should call head when reaching the start of the register", () => {
      const reg = Builder.register();

      reg.next();
      reg.prev();
      reg.prev();
      expect(reg.headCalls).toEqual(1);
    });

    it("should call head only once when reaching the start multiple times", () => {
      const reg = Builder.register();

      reg.next();
      times(3, reg.prev.bind(reg));
      expect(reg.headCalls).toEqual(1);
    });

    it("should call head again when reaching the start again", () => {
      const reg = Builder.register();

      reg.next();
      times(3, reg.prev.bind(reg));
      reg.next();
      times(3, reg.prev.bind(reg));
      expect(reg.headCalls).toEqual(2);
    });
  });

  describe("tail", () => {
    it("should call tail when reaching the end of the register", () => {
      const reg = Builder.register();

      times(4, reg.next.bind(reg));
      expect(reg.tailCalls).toEqual(1);
    });

    it("should call tail only once when reaching the end multiple times", () => {
      const reg = Builder.register();

      times(6, reg.next.bind(reg));
      expect(reg.tailCalls).toEqual(1);
    });

    it("should call tail again when reading the end again", () => {
      const reg = Builder.register();

      times(6, reg.next.bind(reg));
      reg.prev();
      times(6, reg.next.bind(reg));
      expect(reg.tailCalls).toEqual(2);
    });
  });

  describe("set", () => {
    it("should throw an error when the item is not in the register", () => {
      const reg = Builder.register();

      expect(() => { reg.set(5); }).toThrowError("This item is not part of the register");
    });

    it("should set the pointer to the item", () => {
      const reg = Builder.register();

      reg.set(3);
      expect(reg.pointer).toEqual(2);
    });

    it("should not call head when setting to the first item initially", () => {
      const reg = Builder.register();

      reg.set(1);
      expect(reg.headCalls).toEqual(0);
    });

    it("should call head when setting to the first item", () => {
      const reg = Builder.register();

      reg.set(2);
      reg.set(1);
      expect(reg.headCalls).toEqual(1);
    });

    it("should call tail when setting to the last item", () => {
      const reg = Builder.register();

      reg.set(4);
      expect(reg.tailCalls).toEqual(1);
    });

    it("should call head only once when setting to the first item twice", () => {
      const reg = Builder.register();

      reg.next();
      times(3, () => reg.set(1));
      expect(reg.headCalls).toEqual(1);
    });

    it("should call tail only once when setting to the last item twice", () => {
      const reg = Builder.register();

      times(3, () => reg.set(4));
      expect(reg.tailCalls).toEqual(1);
    });
  });

  describe("append", () => {
    it("should extend the default items with the new set of items", () => {
      const reg = Builder.register();
      reg.append([5, 6]);

      expect(reg.items).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should not touch the pointer", () => {
      const reg = Builder.register();
      reg.append([5, 6]);

      expect(reg.pointer).toEqual(0);
      expect(reg.current()).toEqual(1);
    });

    it("should call tail again when reaching the end with an extended itemset", () => {
      const reg = Builder.register();
      reg.set(4);
      expect(reg.tailCalls).toEqual(1);

      reg.append([6]);

      reg.next();
      expect(reg.tailCalls).toEqual(2);
    });
  });
});
