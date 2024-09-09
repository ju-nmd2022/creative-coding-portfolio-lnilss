let flowFields = {
  field1: [],
  field2: []
};

const fieldSize = 10;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const numSteps = 500;
const stepLength = 3;
const noiseScale = 0.009;
const timeScale = 0.0005;
const numCurves = {
  thin: 300,
  medium: 150,
  thick: 50,
  veryThick: 40
};
let time = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = maxCols;
  rows = maxRows;
  generateFlowFields();
  background(250);
}

function generateFlowFields() {
  ['field1', 'field2'].forEach(fieldName => {
    flowFields[fieldName] = new Array(cols * rows);
  });
}

function updateFlowFields() {
  ['field1', 'field2'].forEach(fieldName => {
    let offsetX = noise(time * timeScale) * 1000;
    let offsetY = noise(time * timeScale + 1000) * 1000;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = noise(offsetX + x * noiseScale, offsetY + y * noiseScale, time * timeScale) * TWO_PI * 2;
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
    let progress = n / numSteps;
    let weight = maxWeight * sin(progress * PI);
    strokeWeight(weight);
    vertex(x, y);
  }
  endShape();
}

function draw() {
  background(250, 10);  // Semi-transparent background for trail effect
  updateFlowFields();
  
  for (let i = 0; i < numCurves.thin; i++) {
    drawCurve(random(width), random(height), 0.5, false, 'field1');
  }
  for (let i = 0; i < numCurves.medium; i++) {
    drawCurve(random(width), random(height), 1.5, i % 2 === 0, 'field2');
  }
  for (let i = 0; i < numCurves.thick; i++) {
    drawCurve(random(width), random(height), 2.5, false, 'field1');
  }
  for (let i = 0; i < numCurves.veryThick; i++) {
    drawCurve(random(width), random(height), 3, i % 2 === 0, 'field2');
  }
  
  time++;
}