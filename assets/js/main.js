
const canvas = document.getElementById('game')
const game = new Game(canvas, COL_DIM, ROW_DIM)
game.load()

document.onfullscreenchange = (ev) => {
  if (!document.fullscreenElement) {
    document.getElementById('start-stop-btn').innerHTML = 'RESUME'
    game.stop()
  }
}

window.onresize = (ev) => {
  game.background.load()
}

window.addEventListener('keydown', function(e) {  // prevents scrolling down when pressing space bar
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});