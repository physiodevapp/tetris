class Matrix {
  constructor(colDim, rowDim) {
    this.colDim = colDim
    this.rowDim = rowDim

    this.values = this.create()
  }

  create() {
    return new Array(this.rowDim)
      .fill(0)
      .map(() => new Array(this.colDim).fill(0))
  }

  isOverflow() {
    return this.values[0].includes(1)
  }

  canSetDown(square) {
    if (square.yToRow() >= this.rowDim - 1) {
      return false
    }
    const canDown = !this.values[square.yToRow() + 1][square.xToCol()];
    return canDown
  }

  canSetLeftRight(square, leftRight) {
    // a veces me devuelve error 'cannot read property of undefined' si desplazo horizontalmente sobre la última línea inferior libre antes de almacenar el square
    // ...hacer un try catch??
    let canLeftRight;
    try {
      switch (leftRight) {
        case 'right':
          canLeftRight = this.values[square.yToRow()][square.xToCol() + 1] === 0
          break;
        case 'left':
          canLeftRight = this.values[square.yToRow()][square.xToCol() - 1] === 0
          break;
        default:
          canLeftRight = false
      }
      return canLeftRight
    } catch (error) {
      // console.log(error)
      return false
    }

    // return true
  }

  freeze(square) {
    this.values[square.yToRow()][square.xToCol()] = 1
    // console.log(this.values)
  }

}