let flowerSize = 20;
let amount = 4;
let gap = 60;

function setup () {
    createCanvas(innerWidth, innerHeight);
    background(255);
}

function flower() {
        noStroke();
        let petals = 11;

        for (let y = 0; y < petals; y++) {
            for (let x = 0; x < petals; x++) {
                fill(80, 255, 60);
                rect(x, y, 40, 1);

                fill(0, 10, 250);
                rect(x, y, 10, 20);

                fill(230, random(20, 200), 100);
                ellipse(x, y, 3);


                rotate(PI / 5);
            }
        }
    }

function draw() {
    let y = (height - flowerSize * amount - gap * (amount - 1)) / 2;
    for (let i = 0; i < amount; i++) {
        let x = (height - flowerSize * amount - gap * (amount - 1)) / 2;
        for (let j = 0; j < amount; j++) {
            push();
            translate(x,y);
            flower();
            pop();
            x += flowerSize + gap;
        }
        y += flowerSize + gap;
    }
}