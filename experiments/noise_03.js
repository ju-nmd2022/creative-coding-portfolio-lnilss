function setup() {
    createCanvas(600, 600);
    frameRate(10);
}

const size = 10;
const divider = 10;
const numRows = 60;
const numCols = 60; 

let counter = 0; //writing out explicity

function draw() {
    background(255, 255, 255);
    noStroke();
    fill(0,0,0);

    // noiseSeed(0);
    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            const value = noise(x / divider, y / divider, counter)* size;
            ellipse(size / 2 + x * size, size / 2 + y * size, value);
        }
    }

//every time draw loop goes through, counter increases by one
    counter += 0.1 ;
}

