// Game levels module
var levels = (function () {

  // Platform creator
  function createPlatform(x, y, width) {

    // Add platforms
    var platform = new PIXI.Graphics();
    platform.x = x;
    platform.y = 540 - y;
    platform.width = width;

    // set a fill and line style
    platform.beginFill(0xBBBBDD);

    // draw a shape
    platform.moveTo(0, 0);
    platform.lineTo(width, 0);
    platform.lineTo(width, 20);
    platform.lineTo(0, 20);
    platform.endFill();

    return platform;
  }

  // Pickup creator
  function createPickup(x, y) {
    var pickup = new PIXI.Sprite.fromImage('images/ball.png');
    pickup.x = x;
    pickup.y = 540 - y;
    pickup.pivot.x = 16;
    pickup.pivot.y = 16;
    return pickup;
  }

  // Loader function
  function loadLevel() {
    state.level = new PIXI.Container();
    state.level.platforms = [];
    state.level.pickups = [];

    // Add platforms to define level
    state.level.platforms.push(createPlatform(100, 100, 160));
    state.level.platforms.push(createPlatform(250, 180, 180));
    state.level.platforms.push(createPlatform(400, 230, 160));
    state.level.platforms.push(createPlatform(600, 300, 180));
    state.level.platforms.push(createPlatform(800, 220, 160));
    state.level.platforms.push(createPlatform(1000, 300, 180));
    state.level.platforms.push(createPlatform(1200, 230, 160));
    state.level.platforms.push(createPlatform(1400, 300, 180));
    state.level.platforms.push(createPlatform(1600, 280, 160));
    state.level.platforms.push(createPlatform(1800, 320, 180));

    // Add each platform to our level container
    state.level.platforms.forEach(function (platform) {
      state.level.addChild(platform);
    });

    // Create pickups
    state.level.pickups.push(createPickup(180, 116));
    state.level.pickups.push(createPickup(340, 196));
    state.level.pickups.push(createPickup(480, 246));
    state.level.pickups.push(createPickup(690, 316));

    // Add each pickup to our level container
    state.level.pickups.forEach(function (pickup) {
      state.level.addChild(pickup);
    });

    // Add end-of-level marker
    state.level.endText = new PIXI.Text('End!', state.statStyle);
    state.level.endText.x = 2000;
    state.level.endText.y = 400;
    state.level.addChild(state.level.endText);

    // Add level container to the main game stage
    state.app.stage.addChild(state.level);
  }

  // Public API
  return {
    loadLevel: loadLevel
  };
})();
