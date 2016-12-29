import objectAssign from "object-assign";
import noop from "no-op";
import once from "./once";

class Register {
  constructor(items = [], options = {}) {
    this.items = items;
    this.pointer = 0;

    this.options = objectAssign(
      { tail: noop, head: noop },
      options
    );

    this.options.tail = once(this.options.tail);
    this.options.head = once(this.options.head);

    // The register is at head initially
    this.options.head.disable();
  }

  _hasNext() { return this.pointer < this.items.length - 1 }

  _hasPrev() { return this.pointer > 0; }

  _checkPointer() {
    if(!this._hasNext()) {
      this.tail();
    } else if(!this._hasPrev()) {
      this.head();
    }
  }

  head() { this.options.head.call(this, this.items[0]); }

  tail() { this.options.tail.call(this, this.items[this.items.length - 1]); }

  next() {
    this.options.head.enable();
    if(this._hasNext()) {
      this.pointer += 1;
    }
    this._checkPointer();
    return this.current();
  }

  prev() {
    this.options.tail.enable();
    if(this._hasPrev()) {
      this.pointer -= 1;
    }
    this._checkPointer();
    return this.current();
  }

  append(items = []) {
    this.options.tail.enable();
    this.items = this.items.concat(items);
  }

  set(item) {
    if(!this.items.includes(item)) {
      throw new Error("This item is not part of the register");
    }
    this.pointer = this.items.indexOf(item);
    if(!this._hasNext()) {
      this.tail();
      this.options.head.called = false;
    } else if(!this._hasPrev()) {
      this.head();
      this.options.tail.called = false;
    } else {
      this.options.tail.enable();
      this.options.head.enable();
    }
  }

  reset(items = []) {
    this.items = items;
    this.pointer = 0;
    this._end = this.items.length - 1;
    this.options.head.disable();
  }

  current() { return this.items[this.pointer]; }
}

export default Register;
