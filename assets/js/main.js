const canvas = document.getElementById('game');
const game = new Game(canvas, COL_DIM, ROW_DIM);
const isDesktop = window.matchMedia("(min-width: 1024px)");

function updateUIBasedOnDevice() {
  if (isDesktop.matches) {
    document.getElementById('container-board-menu').style.display = 'block';
    document.getElementById('info-panel').style.display = 'block';
    game.background.load();
    game.load();
  } else {
    document.getElementById('container-board-menu').style.display = 'none';
    document.getElementById('info-panel').style.display = 'none';
    game.stop();
  }
}

if (isDesktop.matches) {
  game.load();
} else {
  updateUIBasedOnDevice();
}

document.onfullscreenchange = (ev) => {
  if (!document.fullscreenElement) {
    document.getElementById('start-stop-btn').innerHTML = 'RESUME';
    game.stop();
  }
};

isDesktop.addEventListener('change', updateUIBasedOnDevice);

window.addEventListener('resize', (ev) => {
  updateUIBasedOnDevice();
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
