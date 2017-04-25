// Keyboard handler module
var keyboard = (function () {
  var keys = {};

  // Helpers to add/remove key handlers
  function add(code, press, release) {
    keys[code] = {
      down: false,
      press: press || function (x) { return x; },
      release: release || function (x) { return x; }
    };
  }
  function remove(code) {
    delete keys[code];
  }

  // Listen for key events, run key handlers, update bookkeeping
  window.addEventListener('keydown', function(event) {
    event.stopPropagation();
    var key = keys[event.key];
    if (key && !key.down) {
      key.press();
      key.down = true;
    }
  });
  window.addEventListener('keyup', function(event) {
    event.stopPropagation();
    var key = keys[event.key];
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
