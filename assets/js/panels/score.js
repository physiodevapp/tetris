class Score {
  constructor() {
    this.total = 0
    this.lines = 0
  }

  linesToScore(lines) {
    this.total += lines * 100
    this.lines += lines
  }

  show() {
    document.getElementById('score-value').innerHTML = `${this.total}`
    document.getElementById('lines-value').innerHTML = `${this.lines}`
  }
}