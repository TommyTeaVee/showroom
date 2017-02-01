import exhibition from "exhibition";

class ReferenceComponent extends HTMLElement {

  createdCallback() { this.addEventListener("click", this._handleClick); }

  _findItem() { return exhibition.findItem(this.getAttribute("target")); }

  open(item) { return this._findItem().open(item); }

  _handleClick() { this.open(); }
}

document.registerElement("showroom-reference", ReferenceComponent);

export default ReferenceComponent;
