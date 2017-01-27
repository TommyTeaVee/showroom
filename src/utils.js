export function isInstance(instance, klass) {
  if(Array.isArray(instance)) {
    return instance.every((item) => item instanceof klass);
  }
  return instance instanceof klass;
}

export function qAll(selector) { return Array.from(fixture.el.querySelectorAll(selector)); }
