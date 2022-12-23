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
    this.ctx.fillStyle = this.color //'#702963'
    this.ctx.beginPath();
    this.ctx.roundRect(this.colToX() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.rowToY() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.w - SQUARE_PADDING - (2 * GRID_LINE_WIDTH), this.h - SQUARE_PADDING - (2 * GRID_LINE_WIDTH), [4]);
    this.ctx.fill();
    /*
    this.ctx.strokeStyle = '#292b39'
    this.ctx.lineWidth = 0
    this.ctx.strokeRect(this.colToX(), this.rowToY(), this.w, this.h)
    */
   this.ctx.restore()
  }

  highlight() {
    this.flick(0)
  }

  flick(state) {
    this.ctx.save()
    this.ctx.fillStyle = state % 2 ? 'red' : 'white'
    this.ctx.clearRect(this.colToX() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.rowToY() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.w - SQUARE_PADDING - (2 * GRID_LINE_WIDTH), this.h - SQUARE_PADDING - (2 * GRID_LINE_WIDTH));
    this.ctx.beginPath();
    this.ctx.roundRect(this.colToX() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.rowToY() + SQUARE_PADDING - (0.5 * GRID_LINE_WIDTH * SQUARE_PADDING), this.w - SQUARE_PADDING - (2 * GRID_LINE_WIDTH), this.h - SQUARE_PADDING - (2 * GRID_LINE_WIDTH), [4]);
    this.ctx.fill();
    /*
    this.ctx.strokeStyle = '#292b39'
    this.ctx.lineWidth = 0
    this.ctx.strokeRect(this.colToX(), this.rowToY(), this.w, this.h)
    */
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