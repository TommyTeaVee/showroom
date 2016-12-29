import exhibition from "../exhibition";

class ReferenceComponent extends HTMLElement {

  createdCallback() {
    this.target = exhibition.findShowroom(this.getAttribute("target"));
  }
}

document.registerElement("showroom-reference", ReferenceComponent);

export default ReferenceComponent;
