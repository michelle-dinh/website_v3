var song, fft, analyzer, mic;
//creating an array for color palette (dark brown, beige, cream, reddish)
var colorPalette = ["⁣⁣⁣⁣#312D2F", "⁣⁣⁣⁣#E0D5C7", "⁣⁣⁣⁣#F6F1EB", "⁣⁣⁣⁣#D36462"];
function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  createCanvas(1500,800)
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  song.loop();
  mic = new p5.AudioIn();
  mic.start();

  analyzer.setInput(song);

}

function draw() {

background('#F6F1EB');

level = analyzer.getLevel();
fft.analyze();
let vol = mic.getLevel();

let rms = analyzer.getLevel();
  fill(127);
  stroke('#D36462');

  // Draw an ellipse with size based on volume
  rect(width / 2, height / 2, 50 + rms * 500, 50 + rms * 500);
}