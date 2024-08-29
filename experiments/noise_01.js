function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255, 255, 255);

    const originalY = 300; //perlin noise
    const divider = 60;

    //tip: whenever we recreate this value it stays the same
    noiseSeed(4);
    //draw custom shape
    beginShape();
    for (let x = 0; x < 600; x++) {
        // const y = originalY + Math.random() * 100;
        //noise function from p5
        const y = originalY + noise(x / divider) * 100;
        vertex(x, y);
    }
    endShape();

    noLoop();
}

