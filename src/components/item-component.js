import uuid from "uuid/v4";
import ShowroomComponent from "./showroom-component";
import { isInstance } from "utils";

/*
  This class cannot be instantiated because the Component has no constructor.
  The `createdCallback` function acts as a constructor to initialize the component.
  The component gets automatically created when a `showroom-item` tag appears in the DOM.
 */
class ItemComponent extends HTMLElement {

  createdCallback() {
    if(!isInstance(this.parentElement, ShowroomComponent)) {
      throw new Error("A 'showroom-item' must be a child element of a 'showroom-element'");
    }
    this.target = this.getAttribute("target");
    this.title = this.getAttribute("title");
    this.id = this.getAttribute("id") || uuid();
    this.type = this.getAttribute("type");
    this.showroom = this.parentElement;
    this.parentElement._register.append([this]);
    this.isOpen = false;

    this.addEventListener("click", this._handleClick);
  }

  _handleClick() { this.open(); }

  open() {
    return this.showroom._open(this).then((content) => {
      this.isOpen = true
      history.pushState({ sid: this.id }, "");
      return content;
    });
  }

  close() { this.isOpen = false; }

}

document.registerElement("showroom-item", ItemComponent);

export default ItemComponent;
