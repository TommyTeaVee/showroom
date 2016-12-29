import removeArrayItem from "remove-value"
import { isInstance } from "./utils"
import ShowroomComponent from "./components/showroom-component"

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

  findShowroom(id) { return instance.showrooms.filter((showroom) => showroom.id === id)[0]; }

}



export default (new Exhibition());
