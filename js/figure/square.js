class Square {
  constructor(ctx, col, row, w, h) {
    this.ctx = ctx

    this.x = col
    this.y = row

    this.w = w
    this.h = h

    this.padding = 1
  }

  draw() {
    this.ctx.save()
    this.ctx.fillStyle = '#702963'
    this.ctx.beginPath();
    this.ctx.roundRect(this.colToX() + this.padding, this.rowToY() + this.padding, this.w - (2 * this.padding), this.h - (2 * this.padding), [4]);
    this.ctx.fill();
    this.ctx.strokeStyle = '#292b39'
    this.ctx.lineWidth = 0
    this.ctx.strokeRect(this.colToX(), this.rowToY(), this.w, this.h)
    this.ctx.restore()
  }

  flick(state) {
    this.ctx.save()
    this.ctx.fillStyle = state % 2 ? '#702963' : 'yellow'
    this.ctx.clearRect(this.colToX() + this.padding, this.rowToY() + this.padding, this.w - (2 * this.padding), this.h - (2 * this.padding));
    this.ctx.beginPath();
    this.ctx.roundRect(this.colToX() + this.padding, this.rowToY() + this.padding, this.w - (2 * this.padding), this.h - (2 * this.padding), [4]);
    this.ctx.fill();
    this.ctx.strokeStyle = '#292b39'
    this.ctx.lineWidth = 0
    this.ctx.strokeRect(this.colToX(), this.rowToY(), this.w, this.h)
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