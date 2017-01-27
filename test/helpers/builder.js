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
    this.template = "<p>{{content}}</p>";
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

  _fetch() { return "content"; }
}

document.registerElement("test-showroom", TestShowroom);

export function emptyShowroom() {
  fixture.load("empty_showroom.html");
  const showroom = document.querySelector("test-showroom");
  return showroom;
}

export function simpleShowroom() {
  fixture.load("simple_showroom.html");
  const showroom = document.querySelector("test-showroom");
  const item = document.querySelector("showroom-item");
  return [showroom, item];
}

export function simpleShowroomItems() {
  fixture.load("simple_showroom_items.html");
  const showroom = document.querySelector("test-showroom");
  return [showroom, showroom._register.items];
}

export function showroomItems() {
  fixture.load("target_showroom_items.html");
  const showroom = document.querySelector("test-showroom");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function fullShowroom() {
  fixture.load("full_showroom.html");
  const showroom = document.querySelector("test-showroom");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function multipleShowrooms(count = 0) {
  times(count, () => {
    fixture.load("empty_showroom.html", true);
  });
  const showrooms = qAll("test-showroom");
  showrooms.map((showroom) => showroom.template = "<p class='content'>{{content}}</p>");
  return showrooms;
}

export function multipleIdShowrooms(count = 0) {
  times(count, (i) => {
    fixture.set(`<test-showroom id="showroom-${i}"></test-showroom>`, true);
  });
  const showrooms = qAll("test-showroom");
  return showrooms;
}

export function reference(target = "showroom-1") {
  fixture.set(`<showroom-reference target="${target}"></showroom-reference>`);
  return document.querySelector("showroom-reference");
}

export function showroomWithReference(target = "showroom-1") {
  const ref = reference(target);
  const [showroom, items] = fullShowroom();
  return [ref, showroom, items];
}

export function register(items) {
  return new TestRegister(items, {
    tail: function() {  this.tailCalls += 1; },
    head: function() { this.headCalls += 1; },
  });
}
