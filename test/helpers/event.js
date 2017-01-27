import simulateEvent from "simulate-event";
import keycode from "./keycodes";

export function click(element = document) {
  simulateEvent.simulate(element, "click");
}

export function hitEnter(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ENTER
  });
}

export function hitEscape(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ESCAPE
  });
}

export function hitArrowRight(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ARROW_RIGHT
  });
}

export function hitArrowDown(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ARROW_DOWN
  });
}

export function hitArrowLeft(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ARROW_LEFT
  });
}

export function hitArrowUp(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keycode: keycode.ARROW_UP
  });
}
