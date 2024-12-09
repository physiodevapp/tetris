
const canvas = document.getElementById('game')
const game = new Game(canvas, COL_DIM, ROW_DIM)
const isDesktop = window.matchMedia("(min-width: 1024px)");

function toggleVisibility() {
  const containerBoardMenu = document.getElementById('container-board-menu');
  const infoPanel = document.getElementById('info-panel');
  const background = document.getElementById('background');

  if (isDesktop.matches) {
    containerBoardMenu.style.display = 'block';
    infoPanel.style.display = 'block';
    background.style.display = 'block';
  } else {
    containerBoardMenu.style.display = 'none';
    infoPanel.style.display = 'none';
    background.style.display = 'none';
  }
}

toggleVisibility();

isDesktop.addEventListener('change', toggleVisibility);

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
