//code adapted from Garrit Schaap, Daniel Shiffman, and ChatGPT https://chatgpt.com/share/25408281-2e63-4249-a64c-833a094cf666

class Boid {
	constructor(x, y, maxSpeed, maxForce) {
		this.position = createVector(x, y);
		this.velocity = createVector(random(-1, 1), random(-1, 1));
		this.maxSpeed = maxSpeed;
		this.maxForce = maxForce;
	}

	applyForce(force) {
		this.velocity.add(force);
	}

	update() {
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
	}

	checkBorders() {
		if (this.position.x < 0) this.position.x = width;
		if (this.position.x > width) this.position.x = 0;
		if (this.position.y < 0) this.position.y = height;
		if (this.position.y > height) this.position.y = 0;
	}

	seek(target) {
		let desired = p5.Vector.sub(target, this.position);
		desired.normalize();
		desired.mult(this.maxSpeed);
		let steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxForce);
		this.applyForce(steer);
	}

	draw(size) {
		fill(255, 0, 0); // Red color for hearts
		noStroke();
		beginShape();
		vertex(this.position.x, this.position.y + size * 0.25);
		bezierVertex(
			this.position.x - size * 0.25,
			this.position.y - size * 0.25,
			this.position.x - size * 0.75,
			this.position.y + size * 0.75,
			this.position.x,
			this.position.y + size
		);
		bezierVertex(
			this.position.x + size * 0.75,
			this.position.y + size * 0.75,
			this.position.x + size * 0.25,
			this.position.y - size * 0.25,
			this.position.x,
			this.position.y + size * 0.25
		);
		endShape(CLOSE);
	}
}

let board = [];
let size = 20;
let boardsize = 30;
let lifecycle = 4;
let count = 0;

function setup() {
	createCanvas(innerWidth, innerHeight);
	for (let i = 0; i < boardsize; i++) {
		board.push([]);
		for (let j = 0; j < boardsize; j++) {
			let x = i * size;
			let y = j * size;
			let cell = new Boid(x, y, 6, 0.07);
			board[i].push(cell);
		}
	}
}

function calculateNewState(x, y) {
	let startX = Math.max(0, x - 1);
	let startY = Math.max(0, y - 1);
	let endX = Math.min(board.length, x + 2);
	let endY = Math.min(board[x].length, y + 2);

	let liveCells = 0;
	for (let i = startX; i < endX; i++) {
		for (let j = startY; j < endY; j++) {
			if (board[i][j] && board[i][j].state === 1) {
				liveCells++;
			}
		}
	}

	let currentState = board[x][y].state;
	if (liveCells === 3) {
		board[x][y].state = 1;
	} else if (liveCells === 4) {
		board[x][y].state = currentState;
	} else {
		board[x][y].state = 0;
	}
}

function draw() {
	background(255);

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			let boid = board[i][j];
			boid.seek(createVector(mouseX, mouseY)); // Make boids seek the mouse
			boid.update();
			boid.checkBorders();
			boid.draw(size);
			calculateNewState(i, j);
		}
	}

	count++;
	if (count == lifecycle) {
		count = 0;
	}
}
