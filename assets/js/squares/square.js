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
    this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING, this.w - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2, [4]);
    this.ctx.fill();
    this.ctx.restore()
  }

  highlight() {
    this.flick(0)
  }

  flick(state) {
    this.ctx.save()
    if (state % 2) {
      this.ctx.clearRect(this.colToX(), this.rowToY(), this.w, this.h);
    } else {
      this.ctx.fillStyle = 'white'
      this.ctx.beginPath();
      this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING, this.w - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2, [4]);
      this.ctx.fill();
    }
    this.ctx.restore()
  }

  hide() {
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.clearRect(this.colToX(), this.rowToY(), this.w, this.h);
    this.ctx.restore()
  }

  highlightRow() {
    this.flickRow(0)
  }

  // TODO: Decidir si flickRow o flick, pero aleatorio, con clearRect y color original con cada state
  flickRow(state) {
    this.ctx.save()
    this.ctx.fillStyle = state % 2 ? 'red' : 'white'
    if (state % 2) {
      /*
      this.ctx.fillStyle = 'transparent'
      this.ctx.beginPath();
      this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING + this.h * 0.25, this.w * COL_DIM - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2 - this.h * 0.5, [4]);
      this.ctx.fill();
      */
      this.ctx.fillStyle = 'white'
      this.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING + this.h * 0.25, this.w * COL_DIM - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2 - this.h * 0.5, 2);
     /*
     this.ctx.beginPath()
     this.ctx.fillStyle = 'white'
     this.ctx.roundRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING + this.h * 0.25, this.w * COL_DIM - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2 - this.h * 0.5, [4])
     this.ctx.fill()
      */
    } else {
      this.ctx.clearRect(this.colToX() + SQUARE_PADDING + GRID_LINE_WIDTH * 0.6, this.rowToY() + SQUARE_PADDING, this.w * COL_DIM - SQUARE_PADDING * 2, this.h - SQUARE_PADDING * 2);
    }
    this.ctx.restore()
  }

  roundRect(x, y, w, h, radius) {
    const r = x + w;
    const b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.ctx.fillStyle;
    this.ctx.lineWidth = "2";
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();
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