import uuid from "uuid/v4";

/*
  This class cannot be instantiated because the Component has no constructor.
  The `createdCallback` function acts as a constructor to initialize the component.
  The component gets automatically created when a `showroom-item` tag appears in the DOM.
 */
class TargetComponent extends HTMLElement {

  createdCallback() {
    this.id = this.getAttribute("id") || uuid();
  }

}

document.registerElement("showroom-target", TargetComponent);

export default TargetComponent;
