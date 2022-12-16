class Game {
  constructor(ctx, xDim, yDim) {
    this.ctx = ctx
    this.w = this.ctx.canvas.clientWidth
    this.h = this.ctx.canvas.clientHeight

    this.matrix = new Matrix(this.ctx, xDim, yDim)
    this.ghostSquare = new Square(this.ctx, 6, 0, xDim, yDim)
    // this.figure = null

    this.intervalId = null

    // this.dropVel = 10
    // this.drop = 0
  }

  load() {
    // this.matrix.create() // se repite dos veces en el código, puede abstraerse en una sola funcion?
    this.interactions()

    console.log(this.matrix)
  }

  interactions() {
    document.getElementById('start-stop').onclick = (ev) => {
      switch (ev.target.innerHTML) {
        case 'START':
          ev.target.innerHTML = 'STOP';
          this.start()
          break;
        case 'STOP':
          ev.target.innerHTML = 'START';
          this.stop()
          break;
        case 'RESTART':
          this.new()
      }
    }
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear()
      this.draw()
      if (this.matrix.isEmpty(this.matrix.xPos, this.matrix.yPos + 1)) {
        this.move()
      } else {
        this.matrix.update()
        if (this.matrix.isOverflow()) {
          this.end()
        } else {
          this.matrix.yPos = -1
          this.move()
        }
      }
    }, 1000);
  }

  draw() {
    this.matrix.draw()

    this.ghostSquare = new Square(
      this.ctx,
      this.matrix
    )
    this.ghostSquare.draw()

    // this.figure = new Figure(
    //   this.ctx,
    //   this.matrix,
    //   'square'
    // )

    // this.figure = new Figure('square')
    // console.log(this.figure)

  }

  move() {
    // this.matrix.move()

    // comprobar si se puede mover en la matriz
    // metodo can() en la matriz
    this.ghostSquare.move()

    // this.figure.move()
  }


  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }

  stop() { // tal y como está, puedo pasarle el argumento innerHTML y quitarme el end()...
    clearInterval(this.intervalId)
    document.getElementById('start-stop').innerHTML = 'START'

    console.log(this.matrix)
  }

  end() {
    clearInterval(this.intervalId)
    document.getElementById('start-stop').innerHTML = 'RESTART'

    console.log(this.matrix)
  }

  new() {
    document.getElementById('start-stop').innerHTML = 'STOP'
    this.matrix.create()
    this.start()
  }

}