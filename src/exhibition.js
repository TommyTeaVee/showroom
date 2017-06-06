import removeArrayItem from "remove-value"
import { isInstance } from "./utils"
import ShowroomComponent from "./components/showroom-component"

const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

let instance = null;

class Exhibition {
  constructor() {
    if (!instance) {
      instance = this;
      instance.showrooms = [];
      window.addEventListener("popstate", this._handlePopstate.bind(this));
    }
    return instance;
  }

  static _resetInstance() { instance = null; }

  static getInstance() { return new Exhibition(); }

  exhibit(showrooms) {
    instance.showrooms = instance.showrooms.concat(showrooms);
  }

  withdraw(showrooms) {
    showrooms.forEach((showroom) => {
      instance.showrooms = removeArrayItem(instance.showrooms, showroom);
    });
  }

  _handlePopstate(e) {
    console.log(e.state);
    const item = this.findItem(e.state.sid);
    if(item) {
      item.open();
    } else {
      this._getOpenShowrooms().forEach(showroom => showroom.open());
    }
  }

  _getOpenShowrooms() {
    return instance.showrooms.filter((showroom) => showroom.isOpen);
  }

  _reset() { instance.showrooms = []; }

  findItem(id) {
    return flatten(
      instance.showrooms.map(showroom => showroom._register.items)
    ).filter(item => item.id === id)[0];
  }

}

export default Exhibition;
