import times from "times-loop";
import { qAll } from "./utils";
import Register from "register";
import objectAssign from "object-assign";

class TestRegister extends Register {

  constructor(items = [1,2,3,4], options) {
    super(items, options);
    this.tailCalls = 0;
    this.headCalls = 0;
  }

}

export function emptyShowroom() {
  fixture.load("empty_showroom.html");
  const showroom = document.querySelector("showroom-element");
  showroom.renderTarget = fixture.el;
  return showroom;
}

export function simpleShowroom() {
  fixture.load("simple_showroom.html");
  const showroom = document.querySelector("showroom-element");
  const item = document.querySelector("showroom-item");
  showroom.renderTarget = fixture.el;
  return [showroom, item];
}

export function simpleShowroomItems() {
  fixture.load("simple_showroom_items.html");
  const showroom = document.querySelector("showroom-element");
  showroom.renderTarget = fixture.el;
  return [showroom, showroom._register.items];
}

export function showroomItems() {
  fixture.load("target_showroom_items.html");
  const showroom = document.querySelector("showroom-element");
  const items = qAll("showroom-item");
  showroom.renderTarget = fixture.el;
  return [showroom, items];
}

export function fullShowroom() {
  fixture.load("full_showroom.html");
  const showroom = document.querySelector("showroom-element");
  const items = qAll("showroom-item");
  return [showroom, items];
}

export function multipleShowrooms(count = 0) {
  times(count, () => {
    fixture.load("empty_showroom.html", true);
  });
  const showrooms = qAll("showroom-element");
  showrooms.map((showroom) => showroom.template = "<p class='content'>{{content}}</p>");
  return showrooms;
}

export function multipleIdShowrooms(count = 0) {
  times(count, (i) => {
    fixture.set(`<showroom-element id="showroom-${i}"></showroom-element>`, true);
  });
  const showrooms = qAll("showroom-element");
  return showrooms;
}

export function reference(target = "showroom-1") {
  fixture.set(`<showroom-reference target="${target}"></showroom-reference>`);
  return document.querySelector("showroom-reference");
}

export function register(items) {
  return new TestRegister(items, {
    tail: function() {  this.tailCalls += 1; },
    head: function() { this.headCalls += 1; },
  });
}
