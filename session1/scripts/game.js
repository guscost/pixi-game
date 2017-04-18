// Main game module
const game = (() => {

  // Make handlers for arrow keys
  keyboard.add('ArrowUp');
  keyboard.add('ArrowDown');
  keyboard.add('ArrowLeft');
  keyboard.add('ArrowRight');

  // Start the game
  start();

  // Update every FPS interval for 30 FPS
  setInterval(update, 1000/30);

  // Module API
  return {

  };
})();
