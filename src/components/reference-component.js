import exhibition from "exhibition";

class ReferenceComponent extends HTMLElement {

  createdCallback() {
    this.addEventListener("click", this._handleClick);
  }

  _findShowroom() {
    return exhibition.findShowroom(this.getAttribute("target"));
  }

  open(item) { return this._findShowroom().open(item); }

  _handleClick() { this.open(this._findShowroom()._register.items[0]); }
}

document.registerElement("showroom-reference", ReferenceComponent);

export default ReferenceComponent;
