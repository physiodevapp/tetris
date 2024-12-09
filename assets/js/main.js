const canvas = document.getElementById('game');
const game = new Game(canvas, COL_DIM, ROW_DIM);
const mobile = document.getElementById('mobile');

function handleMobileVisibility() {
  const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
  if (isMobileOrTablet) {
    mobile.style.display = 'flex';
  } else {
    mobile.style.display = 'none';
  }
}

handleMobileVisibility();

game.load();

document.onfullscreenchange = (ev) => {
  if (!document.fullscreenElement) {
    document.getElementById('start-stop-btn').innerHTML = 'RESUME';
    game.stop();
  }
};

window.onresize = (ev) => {
  handleMobileVisibility();
  game.background.load();
};

window.addEventListener('keydown', function(e) { // Previene el desplazamiento al presionar la barra espaciadora
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
