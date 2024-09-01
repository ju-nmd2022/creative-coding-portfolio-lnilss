//Molnar recreation with shaky lines

//values
const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance); //maps from one system to a different one
}

//the following 11 lines of code were adapted from Claude.ai https://claude.site/artifacts/5a887f90-7808-4d4f-a303-d4d6c322cb05
function drawShakyLine(x1, y1, x2, y2, variance) {
  const steps = 3;
    beginShape();
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        vertex(getRandomValue(x, variance), getRandomValue(y, variance));
    }
    endShape();
}

function drawLayers(x, y, size, layers) {
    //to not calculate over and over

    const variance = size / 20;

    noFill();
    
    for (let i = 0; i < layers; i++) {
      if (random() > 0.8) {
        continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;

    drawShakyLine(x - half, y - half, x + half, y - half, variance);
    drawShakyLine(x + half, y - half, x + half, y + half, variance);
    drawShakyLine(x + half, y + half, x - half, y + half, variance);
    drawShakyLine(x - half, y + half, x - half, y - half, variance);
}
}
     
function setup() {
    createCanvas(1000,1000);
}

function draw() {
    background(255,255,255);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
        }
      }

    noLoop();
}