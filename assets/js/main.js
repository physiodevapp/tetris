
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
  console.log('resized!')
  // TODO: revisar que funcione bien añadiendo solo una imagen y no dos al array 'this.images' cuando cambia el ancho de la pantalla
  game.background.load()
}

document.getElementById('click-me').onclick = () => {
  document.getElementById('board').classList.add('slide-in-left')
  document.getElementById('menu').classList.add('slide-out-right')
  
  document.getElementById('board').classList.remove('slide-out-left')
  document.getElementById('menu').classList.remove('slide-in-right')
}