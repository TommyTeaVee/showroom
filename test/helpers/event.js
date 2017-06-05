import simulateEvent from "simulate-event";
import keycode from "keycode";

export function click(element = document) {
  simulateEvent.simulate(element, "click");
}

export function hitEnter(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("ENTER")
  });
}

export function hitEscape(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("ESCAPE")
  });
}

export function hitArrowRight(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("RIGHT")
  });
}

export function hitArrowDown(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("DOWN")
  });
}

export function hitArrowLeft(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("LEFT")
  });
}

export function hitArrowUp(element = document) {
  simulateEvent.simulate(element, "keydown", {
    keyCode: keycode("UP")
  });
}
