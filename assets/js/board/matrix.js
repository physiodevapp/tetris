class Matrix {
  constructor(colDim, rowDim) {
    this.colDim = colDim
    this.rowDim = rowDim

    this.values = this.create()

    this.intervalIds = []
  }

  create() {
    return new Array(this.rowDim)
      .fill(null)
      .map(() => new Array(this.colDim).fill(null))
  }

  canFreeze() {
    return !this.matrix.isFreezing && !this.matrix.isChecked
  }

  async freeze(figure) {
    return new Promise(async (resolve) => {
      this.isFreezing = true
      figure.squares.forEach((square) => this.values[square.y][square.x] = square)
      await this.checkFullRows().then((linePacks) => {
        this.isFreezing = false
        resolve(linePacks)
      })
    })
  }

  async checkFullRows() {
    return new Promise(async (resolve) => {
      const fullRows = this.getFullRows()
      if (fullRows.length) {
        const linePacks = this.getFullRowPacks()
        const squares = fullRows
          .reduce((acc, curr) => {
            curr.forEach((square) => acc.push(square))
            return acc
          }, [])

        await this.animateRows(fullRows, squares).then(async (resp) => {
          console.log(resp)
          setTimeout(async () => {
            await this.deleteFullRows().then(() => {
              clearInterval(this.intervalId)
              this.intervalIds.forEach((intervalId) => clearInterval(intervalId))
              resolve(linePacks)
            })
          }, 1000)
        })
      } else {
        resolve([])
      }
    })
  }

  // ***********************ANIMATIONS**************************

  animateRows(rows, squares) {
    return new Promise(async (resolve) => {
      squares.forEach((square) => square.highlight())
      for (let i = 0; i < rows.length; i++) {
        this.animateRow(rows[i]).then((resp) => {
          this.animateSquaresInRow(rows[i])
        })
        if (i === rows.length - 1) {
          resolve('all animateRow launched!')
        }
      }
    })
  }

  animateRow(row) {
    return new Promise((resolve) => {
      let index = 0
      const intervalId = setInterval(() => {
        row[index].hide()
        index++
        if (index === COL_DIM) {
          clearInterval(intervalId)
          resolve('animateRow completed!')
        }
      }, 50)
    })
  }

  animateSquaresInRow(row) {
    let state = 1
    const intervalId = setInterval(() => {
      row.forEach((square) => square.flick(state))
      state++
    }, 100);
    this.intervalIds.push(intervalId)
  }

  animateAllSquares(squares) {
    // squares.forEach((square) => square.highlight())
    // let state = 1
    // const intervalId = setInterval(() => {
    //   squares.forEach((square) => square.flick(state))
    //   state++
    // }, 100);
    // this.intervalIds.push(intervalId)
  }

  // *************************************************

  deleteFullRows() {
    return new Promise((resolve) => {
      for (let index = 0; index <= this.values.length; index++) {
        if (index === this.values.length) {
          resolve('deletion completed!')
        }
        const row = this.values[index]
        if (row.every((value) => value !== null)) {
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
    })
  }

  getFullRowPacks() {
    return this.values
      .reduce((acc, row) => {
        this.isFullRow(row) ? acc[acc.length - 1]++ : acc.push(0)
        return acc
      }, [0])
      .filter((value) => value)
  }

  getFullRows() {
    return this.values.filter((row) => this.isFullRow(row))
  }

  isFullRow(row) {
    return row.every((value) => value !== null)
  }

  isBlocked(figure) {
    const actions = ['left', 'right', 'down']
    return actions
      .map((action) => {
        const result = this.canSet(figure, action)
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
    try {
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
      return square.y + y < this.rowDim &&
        square.x + x < this.colDim &&
        this.values[square.y + y][square.x + x] === null
    } catch (error) {
      return false
    }
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