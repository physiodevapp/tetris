class Animation {
  constructor(rows, sound) {
    this.rows = rows

    this.sound = sound

    this.squares = this.rows
      .reduce((acc, curr) => {
        curr.forEach((square) => acc.push(square))
        return acc
      }, [])

    this.intervalIds = []
  }

  animateRows() {
    this.sound.play()
    return new Promise(async (resolve) => {
      this.squares.forEach((square) => square.highlight())
      for (let i = 0; i < this.rows.length; i++) {
        this.animateRow(this.rows[i]).then(() => {
          this.animateSquaresInRow(this.rows[i])
          if (i === this.rows.length - 1) {
            resolve('all animateRow launched!')
          }
        })
        /* La otra opción es aquí, pero creo que funciona mejor en la otra posición, dentro del then()
        if (i === this.rows.length - 1) {
          resolve('all animateRow launched!')
        }
        */
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
      row.forEach((square) => square.flick(state, true))
      state++
    }, 100);
    this.intervalIds.push(intervalId)
  }

  /*
  animateAllSquares() {
    this.squares.forEach((square) => square.highlight())
    let state = 1
    const intervalId = setInterval(() => {
      this.squares.forEach((square) => square.flick(state))
      state++
    }, 100);
    this.intervalIds.push(intervalId)
  }
  */

}