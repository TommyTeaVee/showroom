import exhibition from "exhibition";

class ReferenceComponent extends HTMLElement {

  createdCallback() {
    this.target = exhibition.findShowroom(this.getAttribute("target"));
    this.addEventListener("click", this._handleClick);
  }

  open(item) { return this.target.open(item); }

  _handleClick() { this.open(this.target._register.items[0]); }
}

document.registerElement("showroom-reference", ReferenceComponent);

export default ReferenceComponent;
