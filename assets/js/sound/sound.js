class Sound {
  constructor(audio) {
    this.audio = new Audio(audio)
    this.volume = AUDIO_VOLUME
  }
  play() { // https://stackoverflow.com/questions/6893080/html5-audio-play-sound-repeatedly-on-click-regardless-if-previous-iteration-h
    const click = this.audio.cloneNode()
    click.volume = this.volume
    click.play()
  }
}