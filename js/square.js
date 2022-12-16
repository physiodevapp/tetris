class Square {
  constructor(ctx, x, y, xDim, yDim) {
    this.ctx = ctx

    this.w = this.ctx.canvas.clientWidth / xDim
    this.h = this.ctx.canvas.clientHeight / yDim

    this.x = x
    this.y = y
  }

  draw() {
    this.ctx.save()
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.w, this.h)
    this.ctx.restore()
  }

  move() {
    // this.x += 1 
    this.y += 1 //convertir a coordenadas
  }
}