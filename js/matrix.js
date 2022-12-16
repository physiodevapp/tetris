class Matrix {
  constructor(ctx, xDim, yDim) {
    this.ctx = ctx

    this.xDim = xDim
    this.yDim = yDim

    this.xPos = (this.xDim / 2)
    this.yPos = 0

    this.values = [];

    this.create();
  }

  create() {
    const values = [];
    for (let i = 0; i < this.xDim; i++) {
      const col = [];
      for (let j = 0; j < this.yDim; j++) {
        col.push(0)
      }
      values.push(col)
    }
    this.values = values;
  }

  move() { //cuando completemos una fila
    // this.xPos = this.xPos < this.xDim ? this.xPos + 0 : this.xDim;
    // this.yPos = this.yPos < this.yDim ? this.yPos + 1 : this.yDim;
  }

  isOverflow() {
    // return this.values[this.xPos][0]
    return this.values.filter((col) => col[0] === 1).length
  }

  isEmpty(x, y) { //this.isEmpty(square)
    // console.log('x: ', x, 'y: ', y)
    // console.log('xPos: ', this.xPos, 'yPos: ', this.yPos)
    // if (this.yPos === this.yDim) {
    //   return false
    // }
    return this.values[x][y] === 0 // necesario === 0 para evitar casos 'undefined'
  }

  freeze(x, y) {
    if (!this.isOverflow() && !this.isEmpty(x, y + altoCuadrado)) {
      this.values[x][y] = 1
    }
  }

  draw() {
    this.values.forEach((row, xPos) => {
      row.forEach((value, yPos) => {
        if (value) { // value = 1 si posición ocupada y value = 0 si posición vacía
          const square = new Square(
            this.ctx,
            xPos * (this.ctx.canvas.clientWidth / this.xDim),
            yPos * (this.ctx.canvas.clientHeight / this.yDim),
            this.xDim,
            this.yDim
          )
          square.draw()
        }
      })
    })
  }
}