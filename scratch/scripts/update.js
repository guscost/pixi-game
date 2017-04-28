
function move(sprite) {
  sprite.x = Math.round(sprite.x + sprite.xvel);
  sprite.y = Math.round(sprite.y + sprite.yvel);
}

function fall(sprite) {
  sprite.yvel += 1;
}

function checkBounds(sprite) {
  // Ground blocks the sprite
  if (sprite.y > 520) {
    sprite.y = 520;
    sprite.yvel = 0;
    sprite.contact = true;
  }

  // Walls block the sprite
  if (sprite.x > 2000) {
    sprite.x = 2000;
    sprite.xvel = 0;
  } else if (sprite.x < 20) {
    sprite.x = 20;
    sprite.xvel = 0;
  }
}

function distance (sprite1, sprite2) {
  var xSquared = Math.pow(sprite2.x - sprite1.x, 2);
  var ySquared = Math.pow(sprite2.y - sprite1.y, 2);
  return Math.sqrt(xSquared + ySquared);
}

function collideWithPlatforms(sprite, platforms) {
  platforms.forEach(function (platform) {
    var xOverlap = 
      sprite.x >= platform.x && 
      sprite.x <= (platform.x + platform.width);

    var yCrossing =
      sprite.y <= platform.y &&
      sprite.y + sprite.yvel >= platform.y;

    if (xOverlap && yCrossing) {
      sprite.y = platform.y;
      sprite.yvel = 0;
      sprite.contact = true;
    }
  });
}

// Game update script ("game loop")
function update () {

  // Report diagnostics
  state.stats.scoreReport.text = 'Score: ' + state.score;
  state.stats.xvelReport.text = 'X Vel: ' + state.cat.xvel.toFixed(3);
  state.stats.yvelReport.text = 'Y Vel: ' + state.cat.yvel.toFixed(3);

  // Move the cat
  move(state.cat);

  // Face direction of movement
  if (state.cat.xvel < 0) {
    state.cat.scale.x = -1;
  } else if (state.cat.xvel > 0) {
    state.cat.scale.x = 1;
  }

  // Gravity pushes on the cat
  fall(state.cat);
  state.cat.xvel /= 1.2;

  // Check level bounds
  checkBounds(state.cat);

  // Key inputs
  if (keyboard.keys['ArrowRight'].down) {
    state.cat.xvel = Math.min(
      state.cat.xvel + (state.cat.contact ? 3 : 2),
      8
    );
  } 
  if (keyboard.keys['ArrowLeft'].down) {
    state.cat.xvel = Math.max(
      state.cat.xvel - (state.cat.contact ? 3 : 2), 
      -8
    );
  }

  // Jump input
  var jumpPressed = keyboard.keys['ArrowUp'].down;
  if (!jumpPressed && state.cat.contact) {
    state.cat.jumpAvailable = 5;
  } else if (jumpPressed && state.cat.jumpAvailable) {
    state.cat.yvel = Math.max(state.cat.yvel - 10, -12);
    state.cat.contact = false;
    state.cat.jumpAvailable--;
  } else {
    state.cat.jumpAvailable = 0;
  }

  // Collide cat with all platforms
  collideWithPlatforms(state.cat, state.level.platforms);

  // Pickup collision detection
  state.level.pickups.forEach(function (pickup) {
    if (!pickup.collected) {
      if (distance(state.cat, pickup) < 32) {
        sounds.collect.play();
        pickup.collected = true;
        state.score++;
        state.level.removeChild(pickup);
      }
    }
  });

  // Actor logic
  state.level.actors.forEach(function (actor) {

    // Move the actor
    move(actor);
    fall(actor);
    checkBounds(actor);

    // Collide this actor with all platforms
    var oldX = actor.x;
    var oldY = actor.y;
    collideWithPlatforms(actor, state.level.platforms);
    if (!actor.contact) {
      actor.y = oldY;
      actor.x = oldX;
      actor.xvel = actor.xvel * -1;
      actor.contact = true;
    }

    // Collide with the player
    if (actor.active) {
      if (distance(state.cat, actor) < 40) {

        if (state.cat.y > actor.y) {
          sounds.collect.play();
          actor.active = false;
          state.score++;
          state.level.removeChild(state.cat);
        } else {
          state.level.removeChild(actor);
        }
      }
    }

    // Special case: falling off anything means no contact
    if (actor.yvel > 0) {
      actor.contact = false;
    }

  });

  // Special case: falling off anything means no contact
  if (state.cat.yvel > 0) {
    state.cat.contact = false;
  }

  // Scroll horizontally
  state.level.x = Math.max(state.cat.x - 480, 0) * -1;

  // Don't need to save or return anything because state is global
  return;
}
