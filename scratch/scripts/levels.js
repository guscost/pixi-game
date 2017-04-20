// Game levels module
var levels = (function () {

  // Loader function
  function loadLevel() {
    state.level = {};
    state.level.platforms = [];

    // Add platforms
    var platform = new PIXI.Graphics();

    // set a fill and line style
    platform.beginFill(0xFF3300);
    platform.lineStyle(4, 0xffd900, 1);

    // draw a shape
    platform.moveTo(50,50);
    platform.lineTo(250, 50);
    platform.lineTo(100, 100);
    platform.lineTo(50, 50);
    platform.endFill();

    state.app.stage.addChild(platform);
    state.level.platforms.push(platform);


  }

  // Public API
  return {
    loadLevel: loadLevel
  };
})();
