var song, fft, analyzer, mic;
//creating an array for color palette (dark brown, beige, cream, reddish)
var colorPalette = ["⁣⁣⁣⁣#312D2F", "⁣⁣⁣⁣#E0D5C7", "⁣⁣⁣⁣#F6F1EB", "⁣⁣⁣⁣#D36462"];
function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  createCanvas(1500,900);
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  song.loop();
  mic = new p5.AudioIn();
  mic.start();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

}

function draw() {

background('#F6F1EB');

level = analyzer.getLevel();
fft.analyze();

let vol = mic.getLevel();

// Get the average (root mean square) amplitude
let rms = analyzer.getLevel();

  noFill();
  stroke('#D36462');
  strokeWeight(mouseY);


  // Draw an ellipse with size based on volume
  ellipse(width / 2, height / 2, 20 + rms * 500, 20 + rms * 500);
}