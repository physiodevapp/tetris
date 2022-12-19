class Background {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientHeight / this.rowDim
  }

  draw() {
    console.log('draw background')
    this.ctx.save()
    this.ctx.strokeStyle = '#1c1d2b';
    this.ctx.lineWidth = 1
    for (let x = 0; x <= this.ctx.canvas.clientWidth; x += this.w) {
      for (let y = 0; y <= this.ctx.canvas.clientHeight; y += this.h) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.ctx.canvas.clientHeight);
        this.ctx.stroke();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.ctx.canvas.clientWidth, y);
        this.ctx.stroke();
      }
    }
    this.ctx.restore()
  }

}