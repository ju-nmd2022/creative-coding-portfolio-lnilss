//Molnar recreation

//values
const size = 100; 
const layers = 10;

function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance); //maps from one system to a different one
}
function drawLayers(x, y, size, layers) {

    const variance = size / 60;

    noFill();
    stroke(random(360), 100, 100);
    // rectMode(CENTER); we will not use this and instead use own calculations
    for (let i = 0; i < layers; i++) {
        if (Math.random() > 0.3) {
          continue;
        }
        const s = (size / layers) * i;
        const half = s / 6;
        beginShape();
        vertex(
          getRandomValue(x - half, variance),
          getRandomValue(y - half, variance)
        );
        vertex(
          getRandomValue(x + half, variance),
          getRandomValue(y - half, variance)
        );
        vertex(
          getRandomValue(x + half, variance),
          getRandomValue(y + half, variance)
        );
        vertex(
          getRandomValue(x - half, variance),
          getRandomValue(y + half, variance)
        );
        endShape(CLOSE);
        // rect(x - half, y - half, s, s);
      }
}

function setup() {
    createCanvas(1000,1000);
    frameRate(2);

    colorMode(HSB, 360, 100, 100);
}

function draw() {
    background(200, 0, 120);
    blendMode(MULTIPLY);

    // drawLayers(100, 100, size, layers);
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
        }
      }
      blendMode(BLEND);
}
