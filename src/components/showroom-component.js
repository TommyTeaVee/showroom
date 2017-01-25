import $ from "jquery";
import noop from "no-op";
import dombars from "dombars";
import ItemComponent from "./item-component";
import { qAll } from "utils";
import uuid from "uuid/v4";
import exhibition from "exhibition";
import Register from "register";

class ShowroomComponent extends HTMLElement {

  createdCallback() {
    this._register = new Register();
    this.isOpen = false;
    this.template = "{{{content}}}";
    this.renderTarget = document.body;
    this.id = this.getAttribute("id") || uuid();
    this.tail = noop;
    this.head = noop;
    exhibition.exhibit(this);
    this.addEventListener("click", this._handleClick);
  }

  _renderTemplate(content) {
    if (typeof this.template !== "string") {
      throw new Error(`'${this.template}' is not a valid template`);
    }
    return dombars.compile(this.template)({
      content,
      item: this._register.current()
    });
  }

  _fetch(item) {
    if (!item || !(item && item instanceof ItemComponent)) {
      throw new Error("No item is provided");
    }
    return $.get(item.target);
  }

  _renderItem(item) {
    return $.when(item)
      .pipe(this._fetch.bind(this))
      .pipe(this._renderTemplate.bind(this));
  }

  open(item) {
    return this._renderItem(item).pipe((element) => {
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

  _handleClick() { this.open(this._register.items[0]); }

}

document.registerElement("showroom-element", ShowroomComponent);

export default ShowroomComponent;
