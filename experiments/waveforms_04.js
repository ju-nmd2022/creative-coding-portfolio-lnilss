// let mic, waveform;
// let isSetup = false;
// let audioData = [];

// const numLines = 20;
// const gap = 10;
// const waveWidth = 1200;
// const originalY = 0;
// const divider = 250;

// let colorOffset = 0;

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	colorMode(HSB, 360, 100, 100);
// 	frameRate(30);

// 	mic = new Tone.UserMedia();
// 	waveform = new Tone.Waveform(1024);
// 	mic.connect(waveform);

// 	canvas.addEventListener("click", setupAudio);
// }

// function setupAudio() {
// 	if (!isSetup) {
// 		Tone.start();
// 		mic
// 			.open()
// 			.then(() => {
// 				console.log("Microphone is open");
// 				isSetup = true;
// 			})
// 			.catch((e) => {
// 				console.error("Error opening microphone:", e);
// 			});
// 	}
// }

// function drawWaveformEntity() {
// 	for (let i = 0; i < numLines; i++) {
// 		let rowHue = (colorOffset * 100 + i * 12) % 360;
// 		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 20;
// 		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 40;
// 		stroke(rowHue, rowSaturation, rowBrightness);
// 		strokeWeight(2);

// 		beginShape();
// 		for (let x = 0; x < waveWidth; x++) {
// 			const audioIndex = floor(map(x, 0, waveWidth, 0, audioData.length - 1));
// 			const audioValue = audioData[audioIndex] || 0;
// 			const y = i * gap + audioValue * 300; // Unified movement based on audio
// 			vertex(x, y);
// 		}
// 		endShape();
// 	}
// }

// function draw() {
// 	background(0, 0, 10);
// 	noFill();

// 	if (isSetup) {
// 		audioData = waveform.getValue();
// 	}

// 	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

// 	drawWaveformEntity();

// 	colorOffset += 0.01;

// 	if (!isSetup) {
// 		fill(255);
// 		noStroke();
// 		textAlign(CENTER, CENTER);
// 		textSize(24);
// 		text("Click to open microphone", width / 2, height / 2);
// 	}
// }

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }

//second try vv

// let mic, fft;
// let isSetup = false;
// let frequencyData = [];

// const numLines = 30;
// const gap = 20;
// const waveWidth = 1200;
// const fftSize = 1024;

// let colorOffset = 0;

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	colorMode(HSB, 360, 100, 100);
// 	frameRate(30);

// 	mic = new Tone.UserMedia();
// 	fft = new Tone.FFT(fftSize);
// 	mic.connect(fft);

// 	canvas.addEventListener("click", setupAudio);
// }

// function setupAudio() {
// 	if (!isSetup) {
// 		Tone.start();
// 		mic
// 			.open()
// 			.then(() => {
// 				console.log("Microphone is open");
// 				isSetup = true;
// 			})
// 			.catch((e) => {
// 				console.error("Error opening microphone:", e);
// 			});
// 	}
// }

// function drawFluidEntity() {
// 	const baselineY = (numLines * gap) / 2;

// 	for (let i = 0; i < numLines; i++) {
// 		let rowHue = (colorOffset * 100 + i * 12) % 360;
// 		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 20;
// 		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 40;
// 		stroke(rowHue, rowSaturation, rowBrightness);
// 		strokeWeight(2);

// 		beginShape();
// 		for (let x = 0; x < waveWidth; x++) {
// 			// Constant gentle wave motion
// 			let y = i * gap + sin(x * 0.01 + frameCount * 0.05) * 15;

// 			// Apply audio input when detected
// 			if (isSetup) {
// 				const freqIndex = floor(map(x, 0, waveWidth, 0, frequencyData.length));
// 				const freqValue = frequencyData[freqIndex] || 0;
// 				const normalizedFreqValue = map(freqValue, -100, 0, 0, 1);
// 				y -= normalizedFreqValue * 100; // Subtract to move upwards for louder sounds
// 			}

// 			vertex(x, y);
// 		}
// 		endShape();
// 	}
// }

// function draw() {
// 	background(0, 0, 10);
// 	noFill();

// 	if (isSetup) {
// 		frequencyData = fft.getValue();
// 	}

// 	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

// 	drawFluidEntity();

// 	colorOffset += 0.01;

// 	if (!isSetup) {
// 		fill(255);
// 		noStroke();
// 		textAlign(CENTER, CENTER);
// 		textSize(24);
// 		text("Click to open microphone", width / 2, height / 2);
// 	}
// }

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }

let mic, fft, waveform;
let isSetup = false;
let frequencyData = [];
let waveformData = [];

const numLines = 30;
const gap = 20;
const waveWidth = 800;
const fftSize = 1024;
const waveformSize = 1024;

let colorOffset = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100);
	frameRate(30);

	mic = new Tone.UserMedia();
	fft = new Tone.FFT(fftSize);
	waveform = new Tone.Waveform(waveformSize);
	mic.connect(fft);
	mic.connect(waveform);

	canvas.addEventListener("click", setupAudio);
}

function setupAudio() {
	if (!isSetup) {
		Tone.start();
		mic
			.open()
			.then(() => {
				console.log("microphone is open");
				isSetup = true;
			})
			.catch((e) => {
				console.error("error opening microphone:", e);
			});
	}
}

function drawAudioEntity() {
	const baselineY = (numLines * gap) / 2;

	for (let i = 0; i < numLines; i++) {
		let rowHue = (colorOffset * 100 + i * 12) % 360;
		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 20;
		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 40;
		stroke(rowHue, rowSaturation, rowBrightness);
		strokeWeight(2);

		beginShape();
		for (let x = 0; x < waveWidth; x++) {
			let y = i * gap + sin(x * 0.01 + frameCount * 0.05) * 15;

			if (isSetup) {
				// apply waveform
				const waveformIndex = floor(
					map(x, 0, waveWidth, 0, waveformData.length)
				);
				const waveformValue = waveformData[waveformIndex] || 0;
				y += waveformValue * 200;

				// apply frequency data
				const freqIndex = floor(map(x, 0, waveWidth, 0, frequencyData.length));
				const freqValue = frequencyData[freqIndex] || 0;
				const normalizedFreqValue = map(freqValue, -100, 0, 0, 1);
				y -= normalizedFreqValue * 70;
			}

			vertex(x, y);
		}
		endShape();
	}
}

function draw() {
	background(0, 0, 10);
	noFill();

	if (isSetup) {
		frequencyData = fft.getValue();
		waveformData = waveform.getValue();
	}

	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

	drawAudioEntity();

	colorOffset += 0.01;

	if (!isSetup) {
		fill(255);
		noStroke();
		textAlign(CENTER, CENTER);
		textSize(24);
		text("click to open microphone", width / 2, height / 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
