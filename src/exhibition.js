import ShowroomComponent from "./components/showroom-component"
import removeArrayItem from "remove-value"

const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

let instance = null;

class Exhibition {
  constructor() {
    if (!instance) {
      instance = this;
      instance.showrooms = [];
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
