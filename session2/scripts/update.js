// Game update script ("game loop")
function update () {

  // Report diagnostics
  state.stats.xvelReport.text = 'X Vel: ' + state.cat.xvel.toFixed(3);
  state.stats.yvelReport.text = 'Y Vel: ' + state.cat.yvel.toFixed(3);

  // Move the cat
  state.cat.x = state.cat.x + state.cat.xvel;
  state.cat.y = state.cat.y + state.cat.yvel;

  // Gravity pushes on the cat
  state.cat.yvel += 2;
  state.cat.xvel /= 1.2;

  // Ground blocks the cat
  if (state.cat.y > 520) {
    state.cat.y = 520;
    state.cat.yvel = 0;
  }

  // Key inputs
  if (keyboard.keys['ArrowRight'].down) {
    state.cat.xvel = Math.min(state.cat.xvel + 4, 12);
  } 
  if (keyboard.keys['ArrowLeft'].down) {
    state.cat.xvel = Math.max(state.cat.xvel - 4, -12);
  }

  console.log('updating!')

  // Don't need to save or return anything because state is global
  return;
}
