
// const background = new Background(document.getElementById('grid').getContext('2d'), 12, 24)
// background.draw()

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const game = new Game(ctx, 12, 24)
game.load()