import objectAssign from "object-assign";

export function waitfor(condition, callback, options) {
  options = objectAssign({
    timeout: 100, // ms
    time: (new Date()).getTime()
  }, options);

  if (!(((new Date()).getTime() - options.time) > options.timeout || condition())) {
    window.requestAnimationFrame(() => {
      waitfor(selector, options);
    });
  } else {
    callback();
  }
}

export function waitforElement(selector, callback, options) {
  waitfor(() => {
    return document.querySelectorAll(selector).length > 0;
  }, callback, options);
}
