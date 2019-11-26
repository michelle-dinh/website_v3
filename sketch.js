var song, fft, analyzer;
let mic;
var angle = 0.0;
var button; 
//creating an array for color palette (dark brown, beige, cream, reddish)
var colorPalette = ["⁣⁣⁣⁣#312D2F", "⁣⁣⁣⁣#E0D5C7", "⁣⁣⁣⁣#F6F1EB", "⁣⁣⁣⁣#D36462"];


//adding functionality to button
function toggleSong() {
  //if song is playing, press button to pause, otherwise continue playing
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }

}

//preload music of choice, Slow by Giraffage

function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  //Canvas is 1600 w x 800 h
  createCanvas(1500, 900);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();

  //Create audio input
  mic = new p5.AudioIn();

  //start audio input
  mic.start();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  //create toggle button for music
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();

}

function draw() {

//backoground color is cream
background('#F6F1EB');

level = analyzer.getLevel();
fft.analyze();


// Get the average (root mean square) amplitude
let rms = analyzer.getLevel();

  noFill();


  let a = angle;
  translate(width/2, height/2);
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, height, 0);

  push(); //start new drawing state
  stroke('#312D2F');
  strokeWeight(1);
  angle = angle + rms;
  rectMode(CENTER);
  rotate(h * a / 2);
  scale(a / 300);
  // Draw an ellipse with size based on volume
  rect(0, 0, 50 + rms * 200, 50 + rms * 200);
  pop(); // restore original state

  push();
  rectMode(CENTER);
  stroke('#D36462');
  rotate(-a/50);
  scale(a * h / 200);
  // Draw an rectangle with size based on volume
  rect(0, 0, 10 + rms * 200, 10 + rms * 200);
  pop();

  push();
  rotate(h);
  strokeWeight(mouseY / 10);
  scale(h);

  for (let i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 80);
    rotate(PI/5);
  }

  pop();

    let threshold = 0.01;
    push();
    if (vol > threshold) {
    noStroke();
    fill('#E0D5C7');
    ellipse(random(width), random(height), vol * 100, vol * 100);
  }
  pop();


}