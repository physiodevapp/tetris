class Background {
  constructor(ctx) {
    this.ctx = ctx

    this.intervalId = null

    this.x = 0
    this.y = 0

    this.vx = -0.25
    this.vy = 0

    this.canRender = false

    this.image = new Image()
    this.image.src = "/assets/img/triangles.jpg"
    this.image.onload = (ev) => {
      const duplicatesQty = Math.round(this.ctx.canvas.width / this.image.width) + 1
      this.images = new Array(duplicatesQty).fill(this.image)
      this.canRender = true
      this.render()
    }

    this.initListeners()
  }

  load() {
    this.initListeners()
    this.start()
  }

  initListeners() {
    window.onresize = (ev) => {
      console.log('resized!')
      this.setDim()
    }
  }

  setDim() {
    this.ctx.canvas.setAttribute('width', this.ctx.canvas.clientWidth)
    this.ctx.canvas.setAttribute('height', this.ctx.canvas.clientHeight)
  }

  start() {
    this.setDim() // pensando en que pueda reajustarse con cambios de pantalla... con un 'restart()' por ejemplo...
    this.intervalId = setInterval(() => {
      if (this.canRender) {
        this.render()
      }
    }, 1000 / 60);
  }

  stop() {
    clearInterval(this.intervalId)
    this.intervalId = null
    this.vx = 0
    this.vy = 0
  }

  render() {
    this.clear()
    this.draw()
  }

  draw() {
    this.x += this.vx
    this.ctx.save()
    for (let i = 0; i < this.images.length; i++) {
      this.ctx.drawImage(this.images[i], 0, 0, this.images[i].width, this.images[i].height, this.x + this.images[i].width * i, 0, this.images[i].width, this.images[i].height)
    }

    if (this.x < -this.image.width) {
      this.x = 0
      this.images.push(this.image)
      this.images.shift()
    }

    this.ctx.restore()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
  }


}