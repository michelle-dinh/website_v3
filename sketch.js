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

  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();

}

function draw() {

background('#F6F1EB');

level = analyzer.getLevel();
fft.analyze();


// Get the average (root mean square) amplitude
let rms = analyzer.getLevel();

  noFill();
  stroke('#D36462');


  let a = angle;
  translate(width/2, height/2);
  push();
  angle = angle + rms;
  rectMode(CENTER);
  rotate(a / 2);
  scale(a / 4);
  // Draw an ellipse with size based on volume
  rect(0, 0, 50 + rms * 200, 50 + rms * 200);
  pop();

  let vol = mic.getLevel();
  let h = map(vol, 0, 1, height, 0);
  stroke('#312D2F');
  rect(width / 2, h - 25, 50, 50);


}