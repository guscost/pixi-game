// Game levels module
var levels = (function () {

  // Level definitions
  var level1 = `
----------------------------------------------------------------
----------------------------------p-----------------------------
---------------------------------xxx----------------------------
---------------------------pp-----------------------------------
--------------------------xxxx----------------------------------
--------------------pp------------------------------------------
----------p--------xxxx-----------------------------------------
---------xxx---aa-----------------------------------------------
-----p--------xxx-----------------------------------------------
----xxx---------------------------------------------------------
----------------------------------------------------------------
----------------------------------------------------------------
`;



  // Level parser and generator function
  function generateLevel(level) {
    var platforms = [];
    var pickups = [];
    var actors = [];
    var lines = level.trim().split('\n');

    lines.forEach(function (line, lineIndex) {
      var chars = line.split('');
      var specs = null;

      chars.forEach(function (char, charIndex) {

        // Don't care about casing
        char = char.toLowerCase();

        // This piece manages `specs` and creates platforms as needed
        if (char !== 'x' && specs) {
          platforms.push(createPlatform(specs.x, specs.y, specs.width));
          specs = null;
        } else if (char === 'x') {
          if (specs) {
            specs.width += 45;
          } else {
            specs = { x: charIndex * 45, y: lineIndex * 45 + 25, width: 45 }
          }
        }

        // This piece creates pickups as needed
        if (char === 'p') {
          pickups.push(createPickup(
            charIndex * 45 + 45/2, 
            lineIndex * 45 + 54
          ));
        }

        // This piece parses actors
        if (char === 'a') {
          actors.push(createActor(
            charIndex * 45 + 45/2, 
            lineIndex * 45 + 54
          ));
        }

      });

      if (specs) { 
        platforms.push(createPlatform(specs.x, specs.y, specs.width));
      }

    });

    // Now add everything to the state and draw it
    state.level = new PIXI.Container();
    state.level.platforms = platforms;
    state.level.pickups = pickups;
    state.level.actors = actors;

    // Add each platform to our level container
    platforms.forEach(function (platform) {
      state.level.addChild(platform);
    });

    // Add each pickup to our level container
    pickups.forEach(function (pickup) {
      state.level.addChild(pickup);
    });

    // Add each actor to our level container
    actors.forEach(function (actor) {
      state.level.addChild(actor);
    });

    // Add level container to the main game stage
    state.app.stage.addChild(state.level);

  }

  // Platform creator
  function createPlatform(x, y, width) {

    // Add platforms
    var platform = new PIXI.Graphics();
    platform.x = x;
    platform.y = y;
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
    pickup.y = y;
    pickup.pivot.x = 16;
    pickup.pivot.y = 16;
    return pickup;
  }

  // Actor creator
  function createActor(x, y) {
    var actor = new PIXI.Sprite.fromImage('images/actor.png');
    actor.x = x;
    actor.y = y;
    actor.xvel = 1;
    actor.yvel = 0;
    actor.pivot.x = 16;
    actor.pivot.y = 36;
    actor.active = true;
    return actor;
  }

  // Public API
  return {
    level1: level1,
    generateLevel: generateLevel
  };
})();
