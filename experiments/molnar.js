//grid
//decreased square with slight variation
//around 10 steps
//no gap

//Molnar recreation

//values
const size = 100; //what should size be? parameters are good for reusing code
const layers = 10;

function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance); //maps from one system to a different one
}
function drawLayers(x, y, size, layers) {
    //to not calculate over and over

    const variance = size / 20;

    noFill();
    // rectMode(CENTER); we will not use this and instead use own calculations
    for (let i = 0; i < layers; i++) {
        if (Math.random() > 0.8) {
          continue;
        }
        const s = (size / layers) * i;
        const half = s / 2;
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
}

function draw() {
    background(255,255,255);

    // drawLayers(100, 100, size, layers);
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
        }
      }

    noLoop();
}