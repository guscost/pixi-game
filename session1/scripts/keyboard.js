// Keyboard handler module
const keyboard = (() => {
  const keys = {};

  // Helpers to add/remove key handlers
  function add(code, press, release) {
    keys[code] = {
      down: false,
      press: press || (x => x),
      release: release || (x => x)
    };
  }
  function remove(code) {
    delete keys[code];
  }

  // Listen for key events, run key handlers, update bookkeeping
  window.addEventListener('keydown', event => {
    event.stopPropagation();
    const key = keys[event.key];
    if (key && !key.down) {
      key.press();
      key.down = true;
    }
  });
  window.addEventListener('keyup', event => {
    event.stopPropagation();
    const key = keys[event.key];
    if (key && key.down) {
      key.release();
      key.down = false;
    }
  });

  // Module API
  return {
    keys: keys,
    add: add,
    remove: remove
  };
})();
