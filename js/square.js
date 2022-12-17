class Square {
  constructor(ctx, col, row, w, h) {
    this.ctx = ctx

    this.col = col
    this.row = row

    this.w = w
    this.h = h

    this.x = this.colToX()
    this.y = this.rowToY()

    this.ay = 0
    this.vy = this.h
  }

  draw() {
    this.ctx.save()
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
    this.ctx.restore()
  }

  setDown() {
    // this.vy += this.ay Como implementar esta funcionalidad
    this.y += this.vy 
  }

  setLeftRight(leftRight) {
    switch (leftRight) {
      case 'right':
        this.x += this.w
        break;
      case 'left':
        this.x -= this.w
        break;
    }
  }

  colToX() {
    return this.col * this.w
  }

  rowToY() {
    return this.row * this.h
  }

  xToCol() {
    return Math.floor(this.x / this.w)
  }

  yToRow() {
    return Math.floor(this.y / this.h)
  }

}