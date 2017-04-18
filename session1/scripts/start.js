// Game startup script
function start() {

  // Reset the global state variable ¯\_(ツ)_/¯
  state = {};

  // Set up the application element
  state.app = new PIXI.Application(960, 540, { backgroundColor: 0xE8EAF9 });
  state.container = document.getElementById('container');
  state.container.appendChild(state.app.view);

  // Text styles
  const titleStyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#444450', '#444459'], // gradient
    //stroke: '#444444',
    //strokeThickness: 4,
    dropShadow: false,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  const statStyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: ['#E44450', '#E44459'],
  })

  // Title text
  state.text = new PIXI.Text('Pixi Treasure!', titleStyle);
  state.app.stage.addChild(state.text);
  state.text.x = 30;
  state.text.y = 30;

  // Draw some stats
  state.stats = {};
  state.stats.xvel = new PIXI.Text('', statStyle);
  state.app.stage.addChild(state.stats.xvel);
  state.stats.xvel.x = 800;
  state.stats.xvel.y = 30;
  state.stats.yvel = new PIXI.Text('', statStyle);
  state.app.stage.addChild(state.stats.yvel);
  state.stats.yvel.x = 800;
  state.stats.yvel.y = 60;


  // Cat Sprite
  state.cat = PIXI.Sprite.fromImage('images/cat.png');
  state.app.stage.addChild(state.cat);
  state.cat.pivot = new PIXI.Point(16, 16);
  state.cat.x = 480;
  state.cat.y = 300;
  state.cat.xvel = 1;
  state.cat.yvel = -10;

  // Don't need to return anything because state is global
  return;
}
