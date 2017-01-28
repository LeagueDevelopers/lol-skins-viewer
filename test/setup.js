window.localStorage = window.sessionStorage = {
  getItem (key) {
    return this[key];
  },
  setItem (key, value) {
    this[key] = value;
  },
  removeItem (key) {
    this[key] = undefined;
  },
};
