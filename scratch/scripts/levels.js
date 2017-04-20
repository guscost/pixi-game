// Game levels module
var levels = (function () {

  // Platform creator
  function createPlatform(width) {
    // Add platforms
    var platform = new PIXI.Graphics();

    // set a fill and line style
    platform.beginFill(0xFF3300);
    platform.lineStyle(4, 0xffd900, 1);

    // draw a shape
    platform.moveTo(0, 0);
    platform.lineTo(width, 0);
    platform.lineTo(width, 20);
    platform.lineTo(0, 20);
    platform.endFill();

    return platform;
  }

  // Loader function
  function loadLevel() {
    state.level = {};
    state.level.platforms = [];

    var platform = createPlatform(200);
    state.app.stage.addChild(platform);
    state.level.platforms.push(platform);
  }

  // Public API
  return {
    loadLevel: loadLevel
  };
})();
