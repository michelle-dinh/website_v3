
// Mixed code across various p5 examples
// https://p5js.org/examples/sound-mic-input.html
// https://p5js.org/examples/sound-reverb.html
// https://p5js.org/examples/sound-mic-threshold.html
// https://p5js.org/examples/sound-measuring-amplitude.html
// https://p5js.org/examples/transform-rotate.html
// https://p5js.org/examples/hello-p5-simple-shapes.html

var song, analyzer;
let mic;
var angle = 0.0;
let sound, reverb;

//preload music of choice, Slow by Giraffage

function preload() {
  song = loadSound("assets/slow.mp3");
}

function setup() {
  //Canvas is 1600 w x 800 h
  createCanvas(windowWidth, windowHeight);

  song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  //Create audio input
  mic = new p5.AudioIn();

  //start audio input
  mic.start();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);


}

function draw() {

//backoground color is cream
background('#F6F1EB');

level = analyzer.getLevel();


// Get the average (root mean square) amplitude
let rms = analyzer.getLevel();

noFill();


  let a = angle;
  translate(windowWidth/2, windowHeight/2);
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, height, 0);

//OUTER BLACK SQUARE
  push(); //start new drawing state
  stroke('#312D2F'); // dark brown
  strokeWeight(1);
  angle = angle + rms;
  rectMode(CENTER); //the first two parameters of rectangle code is its origin point
  rotate(h*a/50);
  scale(rms*30);
  // Drawing ellipse with size based on average amplitude of song
  rect(0, 0, 50 + rms * 200, 50 + rms * 200);
  pop(); // restore original state

//SOLID REDDISH SHAPE
  push();
  rectMode(CENTER);
  stroke('#D36462'); //reddish
  strokeWeight(1); 
  rotate(-a/50 + mouseY); //rotate object by declared angle and mouseY position
  scale(rms / 20 ); //scale based on avg amplitude of song divided by 20;
  // Draw an rectangle with size based on volume
  rect(0, 0, 10 + rms * 200, 10 + rms * 200);
  pop();

//FLORAL SHAPE
  push();
  rotate(h);
  stroke("#312D2F",); //dark brown
  strokeWeight(1);
  scale(vol*50);
  //for loop statement that will update the ellipse to form a flower shape until it reaches 9.
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 60);
    rotate(PI/5);
  }

  pop();

   // If the volume > 0.1,  an ellipse is drawn at a random location.
  // The louder the volume, the larger the ellipse.
  //this piece of code creates the floral shape.
  let threshold = 0.1;
  push();
  scale(vol*50); //scale is determined by mic input
  if (rms > threshold) {
    noStroke();
    fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), rms + 100, rms + 100);
  }

  pop();


}