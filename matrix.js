class Matrix {
  constructor(ctx, xDim, yDim) {
    this.ctx = ctx

    this.xDim = xDim
    this.yDim = yDim

    this.xPos = (this.xDim / 2)
    this.yPos = 0

    this.values = null;
  }

  create() {
    // Crear mi propia clase Array para crear estos vectores y utilizar un Map, por ejemplo (inspirado en stackoverflow)
    const row = [];
    for (let i = 0; i < this.xDim; i++) {
      const col = [];
      for (let j = 0; j < this.yDim; j++) {
        col.push(0)
      }
      row.push(col)
    }
    this.values = row; // No me gusta esta nomenclatura de matrix = row...
  }

  traverse() {
    this.xPos = this.xPos
    this.yPos = this.yPos < this.yDim ? this.yPos + 1 : this.yDim;
  }

  isOverflow() {
    return this.values[this.xPos][0]
  }

  isEmptyNextPos() {
    if (this.yPos === this.yDim) {
      return false
    }
    return this.values[this.xPos][this.yPos + 1] === 0
  }

  fillPos() {
    if (!this.isOverflow() && !this.isEmptyNextPos()) {
      console.log(this.yPos)
      this.values[this.xPos][this.yPos] = 1
    }
  }

  draw() {
    // un foreach para rellenar cada valor de la matriz que valga igual a 1 en la posición X e Y correspondiente del canvas
    this.values.forEach((row, xPos) => {
      row.forEach((value, yPos) => {
        if (value) {
          const square = new Square(
            this.ctx,
            xPos * (this.ctx.canvas.clientWidth / this.xDim),
            yPos * (this.ctx.canvas.clientHeight / this.yDim),
            this.ctx.canvas.clientWidth / this.xDim,
            this.ctx.canvas.clientHeight / this.yDim
          )
          square.draw()
        }
      })
    })
  }
}