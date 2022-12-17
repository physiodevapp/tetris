class Game {
  constructor(ctx, colDim, rowDim) {
    this.ctx = ctx

    this.colDim = colDim
    this.rowDim = rowDim

    this.intervalId = null

    this.leftRight = ''
    this.dropVel = 10
  }

  load() {
    this.initInteractions()
    this.initData()
    // console.log(this.matrix)
  }

  initInteractions() {
    document.getElementById('start-stop').onclick = (ev) => {
      switch (ev.target.innerHTML) {
        case 'PLAY':
          ev.target.innerHTML = 'STOP'
          this.start();
          break;
        case 'STOP':
          ev.target.innerHTML = 'PLAY'
          this.stop();
          break;
        case 'RESTART':
          ev.target.innerHTML = 'STOP'
          this.restart();
          break;
      }
    }

    document.body.onkeydown = (ev) => {
      // console.log(ev)
      switch (ev.keyCode) {
        case 39:
          this.leftRight = 'right'
          break;
        case 37:
          this.leftRight = 'left'
          break;
        default:
          this.leftRight = ''
      }
      
      if (this.leftRight && this.matrix.canSetLeftRight(this.square, this.leftRight)) {
        this.move()
      }
      
      this.leftRight = ''
    }


  }

  initData() {
    this.storeSquares = []
    this.matrix = new Matrix(this.colDim, this.rowDim)
    this.addNewSquare()
  }

  start() {
    this.intervalId = setInterval(() => {
      this.move()
      this.check()
    }, 1000 / this.dropVel)
  }

  stop() {
    clearInterval(this.intervalId)
  }

  end() {
    this.stop()
    document.getElementById('start-stop').innerHTML = 'RESTART'
  }

  restart() {
    this.initData()
    this.start()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }

  draw() {
    this.square.draw()
    this.storeSquares.forEach((square) => square.draw())
  }

  check() {
    if (this.matrix.isOverflow()) {
      this.end()
    } else if (!this.matrix.canSetDown(this.square)) {
      this.storeSquare()
      this.addNewSquare()
    }
  }

  move() { // Pongo set en vez de move porque realmente visualmente se ve cuando se draw
    if (this.leftRight && this.matrix.canSetLeftRight(this.square, this.leftRight)) {
      this.square.setLeftRight(this.leftRight)
    } else if (this.matrix.canSetDown(this.square)) {
      this.square.setDown()
    }
    this.clear()
    this.draw()
  }

  addNewSquare() {
    this.square = new Square(this.ctx, 6, -1, this.ctx.canvas.clientWidth / this.colDim, this.ctx.canvas.clientHeight / this.rowDim)
    // this.figure = new Figure(this.ctx, 'square')
  }

  storeSquare() {
    this.matrix.freeze(this.square)
    this.storeSquares.push(this.square)
  }

}