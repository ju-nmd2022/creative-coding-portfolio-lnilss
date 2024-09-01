//this code was partially created using Claude.ai https://claude.site/artifacts/dadf0c91-53c1-42e5-96d0-f9ef39458796

function setup() {
    createCanvas(600, 600);
    colorMode(HSB, 360, 360, 360);
}

    const originalY = -250;
    const divider = 150;
    const numRows = 20;

    let gap = 100;
    let amountX = 1;
    let amountY = 5;

    let colorOffset = 0;


function waveforms(rowOffset) {
    for (let row = 0; row < numRows; row++) {
        let noiseIncrease = map(row, 0, numRows - 1, 400, height);
        // let originalY = row;
    
        beginShape();
        for (let x = 0; x < 600; x++) {
        // const y = originalY + Math.random() * 100;
        //noise function from p5
        const y = originalY + noise(x / divider + rowOffset, row * 0.01 + colorOffset) * noiseIncrease;
        vertex(x, y);
        }
        endShape();
    }
    
}

function draw() {
    background(0, 0, 0);

    noFill();

    let y = 0;
    for (let i = 0; i < amountY; i++) {
        let x = 0;


        for (let j = 0; j < amountX; j++) {
            //the following 9 lines of code were adapted from Claude.ai
            let rowOffset = colorOffset * 1 + i * 0.2 + j * 0.2;
            
            let seedValue = i * amountX + j;
            noiseSeed(seedValue);

            let rowHue = noise(colorOffset + i * 0.1, j * 0.1) * 360;
            let rowSaturation = noise(colorOffset + i * 0.1, j * 0.1) * 360;
            let rowBrightness = noise(colorOffset + i * 0.2, j * 0.2) * 360;
            stroke(rowHue, rowSaturation, rowBrightness);

            push();
            translate(x,y);
            waveforms(rowOffset);
            pop();
            x += numRows + gap;
        }
        y += numRows + gap;
    }
    colorOffset += 0.01;
}