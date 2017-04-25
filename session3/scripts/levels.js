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

    for (var i = 0; i < 10; i++) {
      var width = 200
      var platform = createPlatform(width);
      state.app.stage.addChild(platform);
      state.level.platforms.push(platform);
      platform.x = i * 80;
      platform.y = 520 - i * 40;
      platform.width = width;
    }
  }

  // Public API
  return {
    loadLevel: loadLevel
  };
})();
