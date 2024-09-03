// this code was partially adapted using ChatGPT https://chatgpt.com/share/c3404bad-4987-43ca-b627-e53c45b593d9
// this code was partially adapted using code provided by Garrit Schaap

// inspired by Tyler Hobbs

const fieldSize = 6;
const fieldSizeHalf = fieldSize / 2;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
let flowField = [];
const numSteps = 20; 
const stepLength = 5;
const noiseScale = 0.004;
const numCurves = 4000;
const divider = 200;

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = maxCols;
  rows = maxRows;
  flowField = new Array(cols * rows);

  blendMode(ADD);

  generateFlowField();
  noLoop();
}

//the following 14 lines of code were adapted using ChatGPT
function generateFlowField() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(x / divider, y / divider) * TWO_PI * 4;
      flowField[index] = p5.Vector.fromAngle(angle).setMag(1);
      xoff += noiseScale;
    }
    yoff += noiseScale;
  }
}

function drawCurve(startX, startY) {
  let x = startX;
  let y = startY;

  noFill();
  stroke(250, 30, 40);
  strokeWeight(2);

  beginShape();
  vertex(x, y);
  
  //the following 19 lines of code were provided by Garrit Schaap and ChatGPT
  for (let n = 0; n < numSteps; n++) {
    let xOffset = x - (width / 2 - cols * fieldSize / 2);
    let yOffset = y - (height / 2 - rows * fieldSize / 2);
    
    let colIndex = int(xOffset / fieldSize);
    let rowIndex = int(yOffset / fieldSize);
    colIndex = constrain(colIndex, 0, cols - 1);
    rowIndex = constrain(rowIndex, 0, rows - 1); 

    let gridAngle = flowField[colIndex + rowIndex * cols].heading();

    let xStep = stepLength * cos(gridAngle); //angle for x
    let yStep = stepLength * sin(gridAngle); //angle for y

    x += xStep;
    y += yStep;

    vertex(x, y);
  }

  endShape();
}

function draw() {
  background(200, 80, 160);
  
  // Draw the curves
  for (let i = 0; i < numCurves; i++) {
    let startX = random(width);
    let startY = random(height);
    drawCurve(startX, startY);
  }
}
