class Matrix {
  constructor(colDim, rowDim) {
    this.colDim = colDim
    this.rowDim = rowDim

    this.values = this.create()

    this.isFreezing = false
  }

  create() {
    return new Array(this.rowDim)
      .fill(null)
      .map(() => new Array(this.colDim).fill(null))
  }

  isGameover() {
    try { // en ocasiones, al llegar arriba del todo en el tablero, tira un error en game.js porque isOverflow() devuelve false cuando debería devolver true y el juego intenta continuar
      return !this.values[0].every((value) => value === null)
    } catch {
      return true
    }
  }

  async checkFullRows() {
    const fullRows = this.getFullRows()
    if (fullRows.length) {
      await this.deleteFullRows()
      this.isFreezing = false
    }
  }

  getFullRows() {
    return this.values.filter((row) => row.every((value) => value !== null))
  }

  // CON AWAIT
  // *********
  animateRow(row) {
    let count = 1;
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        // row.forEach((square) => square.flick())
        row.forEach((square) => square.flick(count))
        if (count++ === (3 * 2)) {
          clearInterval(intervalId)
          resolve('animation completed!')
        }
      }, 100);
    })
  }

  async deleteFullRows() {
    for (let index = 0; index < this.values.length; index++) {
      const row = this.values[index]
      if (row.every((value) => value !== null)) {
        await this.animateRow(row)
        this.values.splice(index, 1)
        this.values
          .filter((row, overIndex) => overIndex < index)
          .forEach((row) => {
            row
              .filter((value) => value !== null)
              .forEach((square) => {
                square.y++
              })
          })
        this.values.unshift(new Array(this.colDim).fill(null))
      }
    }
  }

  // SIN AWAIT
  // *********
  // deleteFullRows() {
  //   this.values.forEach(async (row, index) => {
  //     if (row.every((value) => value !== null)) {
  //       let count = 1;
  //       const intervalId = setInterval(() => {
  //         row.forEach((square) => square.flick(count))
  //         if (count++ === (2 * 2)) {
  //           clearInterval(intervalId)
  //           // console.log('animation completed!')
  //           this.values.splice(index, 1)
  //           this.values
  //             .filter((row, overIndex) => overIndex < index)
  //             .forEach((row) => {
  //               row
  //                 .filter((value) => value !== null)
  //                 .forEach((square) => {
  //                   square.y++
  //                 })
  //             })
  //           this.values.unshift(new Array(this.colDim).fill(null))

  //           this.isFreezing = false
  //         }
  //       }, 200);

  //     }
  //   })
  // }

  isBlocked(figure) {
    // console.log('is blocked?')
    const actions = ['left', 'right', 'down']
    // console.log(actions
    //   .map((action) => this.canSet(figure, action)))
    // return false
    return actions
      .map((action) => {
        const result = this.canSet(figure, action)
        // console.log(result)
        return result
      })
      .every((result) => result === false)
  }

  canSet(figure, action) {
    let testFigure = figure
    if (action === 'rotate') {
      testFigure = figure.clone()
      testFigure.setRotation()
    }
    return testFigure.squares.every((square) => this.doesFit(square, action))
  }

  doesFit(square, action) {
    let x = 0;
    let y = 0
    switch (action) {
      case 'rotate':
        break;
      case 'left':
        x--
        break;
      case 'right':
        x++
        break;
      case 'down':
      default:
        y++
        break;
    }
    // console.log(square.y, ' - ', y)
    return square.y + y < this.rowDim &&
      square.x + x < this.colDim &&
      this.values[square.y + y][square.x + x] === null
  }

  freeze(figure) {
    console.log('freeze!')
    this.isFreezing = true
    figure.squares.forEach((square) => this.values[square.y][square.x] = square)
    // console.log(this.values)
  }

  draw() {
    this.values.forEach((row) => {
      row.forEach((square) => {
        if (square) {
          square.draw()
        }
      })
    })
  }


}