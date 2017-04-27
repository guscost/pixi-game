// Game startup script
function start() {

  // Global State Object
  state = {};
  state.score = 0;

  // Set up the application element
  state.app = new PIXI.Application(
    960,
    540,
    { backgroundColor: 0xE8EAF9 }
  );
  state.container = document.getElementById('container');
  state.container.appendChild(state.app.view);

  // Stats text style
  state.statStyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: ['#E44450', '#E44459'],
  });

  // Stats text
  state.stats = {};
  state.stats.scoreReport = new PIXI.Text('', state.statStyle);
  state.app.stage.addChild(state.stats.scoreReport);
  state.stats.scoreReport.x = 800;
  state.stats.scoreReport.y = 30;
  state.stats.xvelReport = new PIXI.Text('', state.statStyle);
  state.app.stage.addChild(state.stats.xvelReport);
  state.stats.xvelReport.x = 800;
  state.stats.xvelReport.y = 60;
  state.stats.yvelReport = new PIXI.Text('', state.statStyle);
  state.app.stage.addChild(state.stats.yvelReport);
  state.stats.yvelReport.x = 800;
  state.stats.yvelReport.y = 90;

  // Set up level
  levels.generateLevel(levels.level1);

  // Cat Sprite
  state.cat = new PIXI.Sprite.fromImage('images/cat.png');
  state.level.addChild(state.cat);
  state.cat.pivot.x = 32;
  state.cat.pivot.y = 50;
  state.cat.x = 480;
  state.cat.y = 800;
  state.cat.xvel = 0;
  state.cat.yvel = 0;

  // Don't need to save or return anything because state is global
  return;
}
