// Game update script ("game loop")
function update () {

  // Report diagnostics
  state.stats.xvelReport.text = 'X Vel: ' + state.cat.xvel.toFixed(3);
  state.stats.yvelReport.text = 'Y Vel: ' + state.cat.yvel.toFixed(3);

  // Move the cat
  state.cat.x = state.cat.x + state.cat.xvel;
  state.cat.y = state.cat.y + state.cat.yvel;

  // Face direction of movement
  if (state.cat.xvel < 0) {
    state.cat.scale.x = -1;
  } else if (state.cat.xvel > 0) {
    state.cat.scale.x = 1;
  }

  // Gravity pushes on the cat
  state.cat.yvel += 2;
  state.cat.xvel /= 1.2;

  // Ground blocks the cat
  if (state.cat.y > 520) {
    state.cat.y = 520;
    state.cat.yvel = 0;
    state.cat.contact = true;
  }

  // Walls block the cat
  if (state.cat.x > 940) {
    state.cat.x = 940;
    state.cat.xvel = 0;
  } else if (state.cat.x < 20) {
    state.cat.x = 20;
    state.cat.xvel = 0;
  }

  // Key inputs
  if (keyboard.keys['ArrowRight'].down) {
    state.cat.xvel = Math.min(
      state.cat.xvel + (state.cat.contact ? 4 : 3),
      12
    );
  } 
  if (keyboard.keys['ArrowLeft'].down) {
    state.cat.xvel = Math.max(
      state.cat.xvel - (state.cat.contact ? 4 : 3), 
      -12
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

  // Collision Detection
  state.level.platforms.forEach(function (platform) {
    var xOverlap = 
      state.cat.x >= platform.x && 
      state.cat.x <= (platform.x + platform.width);

    var yCrossing =
      state.cat.y <= platform.y &&
      state.cat.y + state.cat.yvel >= platform.y;

    if (xOverlap && yCrossing) {
      state.cat.y = platform.y;
      state.cat.yvel = 0;
      state.cat.contact = true;
    }

  });

  // Special case: falling off anything means no contact
  if (state.cat.yvel > 0) {
    state.cat.contact = false;
  }

  // Don't need to save or return anything because state is global
  return;
}
