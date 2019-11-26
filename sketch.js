var song, fft, analyzer, mic;
//creating an array for color palette (dark brown, beige, cream, reddish)
var colorPalette = ["⁣⁣⁣⁣#312D2F", "⁣⁣⁣⁣#E0D5C7", "⁣⁣⁣⁣#F6F1EB", "⁣⁣⁣⁣#D36462"];
function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  song.loop();
  mic = new p5.AudioIn();
  mic.start();

  analyzer.setInput(song);

}

function draw() {

background(colorPalette[3]);

translate(windowWidth/2, windowHeight/2);

level = analyzer.getLevel();
fft.analyze();
let vol = mic.getLevel();

let rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with size based on volume
  ellipse(windowWidth / 2, windowHeight / 2, 10 + rms * 200, 10 + rms * 200);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
