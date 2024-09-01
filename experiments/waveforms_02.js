function setup() {
    createCanvas(600, 600);
}

    const originalY = -250;
    const divider = 150;
    const numRows = 20;

    let gap = 100;
    let amountX = 1;
    let amountY = 5;


function waveforms() {
    for (let row = 0; row < numRows; row++) {
        let noiseIncrease = map(row, 0, numRows - 1, 400, height);
        // let originalY = row;
    
        beginShape();
        for (let x = 0; x < 600; x++) {
        // const y = originalY + Math.random() * 100;
        //noise function from p5
        const y = originalY + noise(x / divider) * noiseIncrease;
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

        let rowHue = random(360);
        let rowSaturation = random(360);
        let rowBrightness = random(360); 
        stroke(rowHue, rowSaturation, rowBrightness);


        for (let j = 0; j < amountX; j++) {
            //the following 2 lines of code were adapted using ChatGPT
            let seedValue = 4; // Generating a unique seed for each grid position
            noiseSeed(seedValue);

            push();
            translate(x,y);
            waveforms();
            pop();
            x += numRows + gap;
        }
        y += numRows + gap;
    }
    noLoop();
}