let song, analyzer, mic;

function preload() {
  song = loadSound('assets/giraffage_slow.mp3');
}

function setup() {
  createCanvas(1280, 1920);
  song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  // create an audio input
  mic = new p5.AudioIn();

  // start audio input
  mic.start();

}

function draw() {
  background(255);

  let vol = mic.getLevel();

  // Get the average (root mean square) amplitude
  let rms = analyzer.getLevel();
  // fill(20, 50, 80);

  let threshold = 0.1;
  if (vol > threshold) {
    stroke(0);
    fill(random(rms), random(vol*80), random(vol*10);
    rect(random(40, width), random(height), vol * 50, vol * 50);
  }


  // Draw an ellipse with size based on volume
  let h = map(vol, 0, 1, height, 0);
  ellipse(width/2, height/2, 10 + rms * 200, 10 + rms * 200);
  // ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
}
