// Game startup script
function start() {

  // Global State Object
  state = {};

  // Set up the application element
  state.app = new PIXI.Application(
    960,
    540,
    { backgroundColor: 0xE8EAF9 }
  );
  state.container = document.getElementById('container');
  state.container.appendChild(state.app.view);

  // Stats text style
  const statStyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: ['#E44450', '#E44459'],
  });

  // Stats text
  state.stats = {};
  state.stats.xvelReport = new PIXI.Text('', statStyle);
  state.app.stage.addChild(state.stats.xvelReport);
  state.stats.xvelReport.x = 800;
  state.stats.xvelReport.y = 30;
  state.stats.yvelReport = new PIXI.Text('', statStyle);
  state.app.stage.addChild(state.stats.yvelReport);
  state.stats.yvelReport.x = 800;
  state.stats.yvelReport.y = 60;

  // Cat Sprite
  state.cat = new PIXI.Sprite.fromImage('images/cat.png');
  state.app.stage.addChild(state.cat);
  state.cat.pivot.x = 16;
  state.cat.pivot.y = 16;
  state.cat.x = 480;
  state.cat.y = 300;
  state.cat.xvel = 50;
  state.cat.yvel = -10;

  // Don't need to save or return anything because state is global
  return;
}
