//third try vv

let mic, fft, waveform;
let isSetup = false;
let frequencyData = [];
let waveformData = [];

const numLines = 30;
const gap = 20;
const waveWidth = 1000;
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
		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 360;
		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 360;
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
				y -= normalizedFreqValue * 80;
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
