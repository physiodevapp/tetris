class Square {
    constructor(ctx, x = 0, y = 0, w = 0, h = 0) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}