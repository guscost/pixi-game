// Game update script ("game loop")
function update () {

  // Print out stats for this step
  state.stats.xvel.text = 'X Vel: ' + state.cat.xvel.toFixed(3);
  state.stats.yvel.text = 'Y Vel: ' + state.cat.yvel.toFixed(3);

  // Update position for this step
  state.cat.x = Math.round(state.cat.x + state.cat.xvel);
  state.cat.y = Math.round(state.cat.y + state.cat.yvel);

  // Flip sprite to face x-direction of movement
  // Pivot is in the center so this won't move the sprite
  if (state.cat.xvel < 0) {
    state.cat.scale.x = -1;
  } else if (state.cat.xvel > 0) {
    state.cat.scale.x = 1;
  }

  // Motion Decay
  state.cat.xvel /= 1.2;
  state.cat.yvel += 2;

  // Enforce bottom of screen
  if (state.cat.y > 520) {
    state.cat.y = 520;
    state.cat.yvel = 0;
    state.cat.contact = true;
  }

  // Enforce bottom of screen
  if (state.cat.x > 944) {
    state.cat.x = 944;
    state.cat.xvel = 0;
  } else if (state.cat.x < 16) {
    state.cat.x = 16;
    state.cat.xvel = 0;
  }

  // Left and Right Movement
  if (keyboard.keys['ArrowRight'].down) {
    state.cat.xvel = Math.min(state.cat.xvel + 4, 12);
  }
  if (keyboard.keys['ArrowLeft'].down) {
    state.cat.xvel = Math.max(state.cat.xvel - 4, -12);
  }

  // Whenever cat has "contact", make jump available for 4 frames
  // Otherwise if jump key is pressed and jump is available
  // Once you let go of the jump key, the jump is gone
  const jumpPressed = keyboard.keys['ArrowUp'].down;
  if (!jumpPressed && state.cat.contact) {
    state.cat.jumpAvailable = 5;
  } else if (jumpPressed && state.cat.jumpAvailable) {
    state.cat.yvel = -14;
    state.cat.jumpAvailable--;
    state.cat.contact = false;
  } else {
    state.cat.jumpAvailable = 0;
  }
}
