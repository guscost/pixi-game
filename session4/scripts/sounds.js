var sounds = (function () {

  var collect = new Howl({
    src: ['sounds/collect.mp3']
  });

  return {
    collect: collect
  };
})();