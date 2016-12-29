import once from "once";

export default function makeOnce(fn) {
  const onceFn = once(fn);

  onceFn.enable = () => onceFn.called = false;

  onceFn.disable = () => onceFn.called = true;

  return onceFn;
}
