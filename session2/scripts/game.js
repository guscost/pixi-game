// Main game module
var game = (function () {

  // Set up the game
  start();

  // Update every FPS interval for 30 FPS
  setInterval(update, 1000/30);

  // Make handlers for arrow keys
  keyboard.add('ArrowUp');
  keyboard.add('ArrowDown');
  keyboard.add('ArrowLeft');
  keyboard.add('ArrowRight');

  // Module API
  return {
    publicThing: '123'

  };
})();
