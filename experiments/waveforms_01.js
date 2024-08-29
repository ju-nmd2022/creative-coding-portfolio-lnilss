function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255, 255, 255);

    const originalY = 0; //perlin noise
    const divider = 100;
    const numRows = 100;

    noFill();
    //tip: whenever we recreate this value it stays the same
    noiseSeed(4);

    for (let row = 0; row < numRows; row++) {
        let noiseIncrease = map(row, 0, numRows - 1, 1.2, height);
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


    noLoop();
}