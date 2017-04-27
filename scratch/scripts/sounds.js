var sounds = (function () {

  var collect = new Howl({
    src: ['sounds/collect.mp3']
  });

  var start = new Howl({
    src: ['sounds/start.mp3']
  });


  return {
    collect: collect,
    start: start,
  };
})();