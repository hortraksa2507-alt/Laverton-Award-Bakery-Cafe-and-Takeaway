if (!window.storage) {
  window.storage = {
    get(key) {
      return Promise.resolve({ value: localStorage.getItem(key) });
    },
    set(key, val) {
      localStorage.setItem(key, val);
      return Promise.resolve();
    },
    delete(key) {
      localStorage.removeItem(key);
      return Promise.resolve();
    },
    list(prefix) {
      return Promise.resolve({
        keys: Object.keys(localStorage).filter((k) => k.startsWith(prefix)),
      });
    },
  };
}
