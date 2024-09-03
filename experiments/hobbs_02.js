//code adapted from Claude.ai https://claude.site/artifacts/8caff05c-90da-467d-9866-e16602d85ab1

const fieldSize = 10;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
let flowFields = {
  field1: [],
  field2: []
};
const numSteps = 300;
const stepLength = 3;
const noiseScale = 0.005;
const numCurves = {
  thin: 3000,
  medium: 1500,
  thick: 500,
  veryThick: 450
};

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = maxCols;
  rows = maxRows;
  
  generateFlowFields();
  background(250);
  noLoop();
}

function generateFlowFields() {
  noiseSeed();
  ['field1', 'field2'].forEach(fieldName => {
    flowFields[fieldName] = new Array(cols * rows);
    let offsetX = random(1000);
    let offsetY = random(1000);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = noise(offsetX + x * noiseScale, offsetY + y * noiseScale) * TWO_PI * 2;
        flowFields[fieldName][index] = p5.Vector.fromAngle(angle).setMag(1);
      }
    }
  });
}

function drawCurve(startX, startY, maxWeight, isWhite, fieldName) {
  let x = startX;
  let y = startY;

  noFill();
  stroke(isWhite ? 255 : 0);

  beginShape();
  for (let n = 0; n < numSteps; n++) {
    let colIndex = constrain(floor(x / fieldSize), 0, cols - 1);
    let rowIndex = constrain(floor(y / fieldSize), 0, rows - 1);
    let index = colIndex + rowIndex * cols;
    let flowVector = flowFields[fieldName][index];

    let angle = flowVector.heading();
    let xStep = stepLength * cos(angle);
    let yStep = stepLength * sin(angle);
    
    x += xStep;
    y += yStep;
    

    if (x < 0 || x > width || y < 0 || y > height) break;

    // Natural tapering
    let progress = n / numSteps;
    let weight = maxWeight * sin(progress * PI);
    strokeWeight(weight);

    vertex(x, y);
  }
  endShape();
}

function draw() {
  for (let i = 0; i < numCurves.thin; i++) {
    drawCurve(random(width), random(height), 0.5, 0, 'field1');
  }

  for (let i = 0; i < numCurves.medium; i++) {
    drawCurve(random(width), random(height), 1.5, i % 2 === 0, 'field2');
  }

  for (let i = 0; i < numCurves.thick; i++) {
    drawCurve(random(width), random(height), 2.5, i % 2 === 0, 'field1');
  }

  for (let i = 0; i < numCurves.veryThick; i++) {
    drawCurve(random(width), random(height), 3, 0, 'field2');
  }
}