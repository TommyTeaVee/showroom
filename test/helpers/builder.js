import times from "times-loop";
import { qAll } from "./utils";
import Register from "register";
import objectAssign from "object-assign";
import Showroom from "components/showroom-component"

class TestRegister extends Register {
  constructor(items = [1,2,3,4], options) {
    super(items, options);
    this.tailCalls = 0;
    this.headCalls = 0;
  }
}

class TestShowroom extends Showroom {

  createdCallback() {
    super.createdCallback();
    this.renderCalls = 0;
    this.tailCalls = 0;
    this.headCalls = 0;
    this.tail = () => { this.tailCalls += 1; };
    this.head = () => { this.headCalls += 1; };
    this.template = "{{content}}";
    this.renderTarget = fixture.el;

    this.onOpen = new Promise((resolve, reject) => {
      this.openResolve = resolve;
    });
  }

  _renderItem(item) {
    this.renderCalls += 1;
    this.openResolve(item);
    return super._renderItem(item);
  }

  _fetch(item) { return item.target; }

  _extractResponse(response) { return response; }
}

document.registerElement("test-showroom", TestShowroom);

export function showroomItems() {
  fixture.load("target_showroom_items.html");
  const showroom = document.querySelector("test-showroom");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function showroom() {
  fixture.load("full_showroom.html");
  const showroom = document.querySelector("test-showroom");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function fixedShowroom() {
  fixture.load("showroom_id.html");
  const showroom = document.querySelector("test-showroom");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function exhibition(count = 0) {
  times(count, () => {
    fixture.load("full_showroom.html", true);
  });
  const showrooms = qAll("test-showroom");
  return showrooms;
}

export function reference(target = "item1") {
  fixture.set(`<showroom-reference target="${target}"></showroom-reference>`);
  return document.querySelector("showroom-reference");
}

export function showroomWithReference(target = "item1") {
  const ref = reference(target);
  const [showroom, items] = this.fixedShowroom();
  return [ref, showroom, items];
}

export function register(items) {
  return new TestRegister(items, {
    tail: function() {  this.tailCalls += 1; },
    head: function() { this.headCalls += 1; },
  });
}
