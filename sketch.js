var song, fft, analyzer, mic;
var angle = 0.0;
var button; 
//creating an array for color palette (dark brown, beige, cream, reddish)
var colorPalette = ["⁣⁣⁣⁣#312D2F", "⁣⁣⁣⁣#E0D5C7", "⁣⁣⁣⁣#F6F1EB", "⁣⁣⁣⁣#D36462"];


function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }

}

function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  createCanvas(1500,900);
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  // song.loop();
  mic = new p5.AudioIn();
  mic.start();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
  rectMode(CENTER);

  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();

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
  let y = map(mouseY, 0, 20, 0, 100);
  strokeWeight(y);


  let c = cos(angle);
  translate(width/2, height/2);
  push();
  rotate(c);
  // Draw an ellipse with size based on volume
  rect(0, 0, 20 + rms * 200, 20 + rms * 200);
  pop();
}