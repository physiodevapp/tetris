class PanelFigure {
  constructor() {
    this.container = document.getElementById('next-figure-value')

    this.colDim = 4
    this.rowDim = 4

    this.setCanvas()
  }

  setCanvas() {
    const canvas = document.querySelector('#panel-figure')
    canvas.setAttribute('width', this.container.clientWidth - 10)
    canvas.setAttribute('height', this.container.clientWidth - 10)
    this.ctx = canvas.getContext('2d')
    this.w = this.ctx.canvas.clientWidth / this.colDim
    this.h = this.ctx.canvas.clientWidth / this.rowDim
  }

  render(type, color) {
    this.createFigure(type, color)
    this.clear()
    this.figure.draw()
  }

  createFigure(type, color) {
    this.figure = new Random().getFigure(this.ctx, this.colDim, this.rowDim, true, [type], color)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  }


}