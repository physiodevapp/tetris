class Game {
  constructor(ctx, xDim, yDim) {
    this.ctx = ctx
    this.w = this.ctx.canvas.clientWidth
    this.h = this.ctx.canvas.clientHeight

    this.matrix = new Matrix(this.ctx, xDim, yDim)

    this.intervalId = null

    this.dropVel = 5 // tiene más sentido que sea una propiedad de la clase Square?
    this.tick = 0
  }

  load() {
    this.matrix.create()
    this.interactions()

    // this.matrix.values[6][23] = 1
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
      }
    }
  }

  start() {
    this.reset()
    this.intervalId = setInterval(() => {
      if (this.tick++ === this.dropVel) {
        this.tick = 0
        this.clear()
        this.draw()
        this.move() // no entiendo por qué solo me funciona con el move() antes del draw()
        this.matrix.fillPos()
        this.checkStatus()      
      }
    }, 1000 / 60)
  }
  
  checkStatus() {
    if (this.matrix.isOverflow()) {
      this.stop()
    } else if (!this.matrix.isEmptyNextPos()) {
      this.reset()
    }
  }

  draw() {
    this.matrix.draw()
    this.ghostSquare = new Square(
      this.ctx,
      this.matrix.xPos * (this.w / this.matrix.xDim),
      this.matrix.yPos * (this.h / this.matrix.yDim),
      this.w / this.matrix.xDim,
      this.h / this.matrix.yDim
    )
    this.ghostSquare.draw()
  }

  move() {
    this.matrix.traverse()
  }

  stop() {
    clearInterval(this.intervalId)
    console.log(this.matrix)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }

  reset() {
    this.matrix.yPos = 0
  }


}