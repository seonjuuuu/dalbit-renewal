const listeners = new Map();

globalThis.addEventListener = (type, cb) => {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(cb);
};
globalThis.removeEventListener = (type, cb) => {
  listeners.get(type)?.delete(cb);
};
globalThis.dispatchEvent = (event) => {
  for (const cb of listeners.get(event.type) || []) cb(event);
  return true;
};

globalThis.location = {
  pathname: "/",
  search: "",
  hash: "",
  href: "https://dalbit-work.co.kr/",
};

globalThis.history = {
  state: null,
  pushState() {},
  replaceState() {},
};

globalThis.window = globalThis;
