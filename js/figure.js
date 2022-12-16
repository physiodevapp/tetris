class Figure extends Square {
  constructor(ctx, matrix, pattern) {
    super(ctx, matrix)
    this.pattern = pattern
  }

  draw() {
    switch (this.pattern) {
      case 'square':
        super.draw()
        break;
    }
  }

  move() {
    console.log(this)
    switch (this.pattern) {
      case 'square':
        // console.log(super)
        super.move()
        break;
    }
  }
}