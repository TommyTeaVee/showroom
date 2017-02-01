import noop from "no-op";
import dombars from "dombars";
import ItemComponent from "./item-component";
import { qAll } from "utils";
import uuid from "uuid/v4";
import Exhibition from "exhibition";
import Register from "register";
import "whatwg-fetch";

class ShowroomComponent extends HTMLElement {

  createdCallback() {
    this._register = new Register();
    this.isOpen = false;
    this.template = "{{{content}}}";
    this.renderTarget = document.body;
    this.id = this.getAttribute("id") || uuid();
    this.tail = noop;
    this.head = noop;
    Exhibition.getInstance().exhibit(this);
  }

  _compileTemplate(options) {
    return dombars.compile(this.template)(options);
  }

  _renderTemplate(content) {
    return new Promise((resolve, reject) => {
      if (typeof this.template !== "string") {
        reject(`'${this.template}' is not a valid template`);
      } else {
        const options = { content, item: this._register.current() }
        resolve(this._compileTemplate(options));
      }
    });
  }

  _fetch(item) { return fetch(item.target); }

  _fetchItem(item) {
    return new Promise((resolve, reject) => {
      if (!item || !(item && item instanceof ItemComponent)) {
        reject("No item is provided");
      } else {
        resolve(this._fetch(item));
      }
    });
  }

  _renderItem(item) {
    return Promise.resolve(item)
      .then(this._fetchItem.bind(this))
      .then(this._renderTemplate.bind(this));
  }

  open(item) {
    return this._renderItem(item).then((element) => {
      if(this.element) {
        this.renderTarget.removeChild(this.element);
      }
      this.element = element;
      this.element.style.display = "block";
      this.renderTarget.appendChild(this.element);
      this.isOpen = true;
      return this.element;
    });
  }

  next() { return this.open(this._register.next()); }

  prev() { return this.open(this._register.prev()); }

  close() {
    this.element.style.display = "none";
    this.isOpen = false;
  }

}

document.registerElement("showroom-element", ShowroomComponent);

export default ShowroomComponent;
