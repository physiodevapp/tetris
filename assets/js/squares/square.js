class Square {
  constructor(ctx, col, row, w, h, color = 'white') {
    this.ctx = ctx

    this.x = col
    this.y = row

    this.w = w
    this.h = h

    this.color = color
  }

  draw() {
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING, this.w - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2, [4])
    this.ctx.fill()
    this.ctx.restore()
  }

  highlight() {
    this.flick(0)
  }

  flick(state, outlined = false) {
    this.ctx.save()
    this.ctx.clearRect(this.colToX(), this.rowToY(), this.w, this.h);
    if (!(state % 2)) {
      this.ctx.fillStyle = outlined ? 'transparent' : 'white'
      this.ctx.lineWidth = outlined ? 2 : 0
      this.ctx.strokeStyle = 'white'
      this.ctx.beginPath();
      this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING, this.w - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2, [4]);
      this.ctx.fill();
      if (outlined) {
        this.ctx.stroke();
      }
    }
    this.ctx.restore()
  }

  hide() {
    if (this.y === ROW_DIM - 1 &&
       document.getElementById('game').classList.contains('game-round-border')) {
      document.getElementById('game').classList.remove('game-round-border')
    }
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.clearRect(this.colToX(), this.rowToY(), this.w, this.h);
    this.ctx.restore()
  }

  setTranslation(action) {
    switch (action) {
      case 'rotate':
        break;
      case 'left':
        this.x -= 1
        break;
      case 'right':
        this.x += 1
        break;
      case 'down':
      default:
        this.y += 1
        break;
    }
  }

  colToX() {
    return this.x * this.w
  }

  rowToY() {
    return this.y * this.h
  }

}