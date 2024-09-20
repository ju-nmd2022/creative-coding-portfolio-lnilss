// //third try vv

// let mic, fft, waveform;
// let isSetup = false;
// let frequencyData = [];
// let waveformData = [];

// const numLines = 30;
// const gap = 20;
// const waveWidth = 1000;
// const fftSize = 1024;
// const waveformSize = 1024;

// let colorOffset = 0;

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	colorMode(HSB, 360, 100, 100);
// 	frameRate(30);

// 	mic = new Tone.UserMedia();
// 	fft = new Tone.FFT(fftSize);
// 	waveform = new Tone.Waveform(waveformSize);
// 	mic.connect(fft);
// 	mic.connect(waveform);

// 	canvas.addEventListener("click", setupAudio);
// }

// function setupAudio() {
// 	if (!isSetup) {
// 		Tone.start();
// 		mic
// 			.open()
// 			.then(() => {
// 				console.log("microphone is open");
// 				isSetup = true;
// 			})
// 			.catch((e) => {
// 				console.error("error opening microphone:", e);
// 			});
// 	}
// }

// function drawAudioEntity() {
// 	const baselineY = (numLines * gap) / 2;

// 	for (let i = 0; i < numLines; i++) {
// 		let rowHue = (colorOffset * 100 + i * 12) % 360;
// 		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 360;
// 		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 360;
// 		stroke(rowHue, rowSaturation, rowBrightness);
// 		strokeWeight(2);

// 		beginShape();
// 		for (let x = 0; x < waveWidth; x++) {
// 			let y = i * gap + sin(x * 0.01 + frameCount * 0.05) * 15;

// 			if (isSetup) {
// 				// apply waveform
// 				const waveformIndex = floor(
// 					map(x, 0, waveWidth, 0, waveformData.length)
// 				);
// 				const waveformValue = waveformData[waveformIndex] || 0;
// 				y += waveformValue * 200;

// 				// apply frequency data
// 				const freqIndex = floor(map(x, 0, waveWidth, 0, frequencyData.length));
// 				const freqValue = frequencyData[freqIndex] || 0;
// 				const normalizedFreqValue = map(freqValue, -100, 0, 0, 1);
// 				y -= normalizedFreqValue * 80;
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
// 		waveformData = waveform.getValue();
// 	}

// 	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

// 	drawAudioEntity();

// 	colorOffset += 0.01;

// 	if (!isSetup) {
// 		fill(255);
// 		noStroke();
// 		textAlign(CENTER, CENTER);
// 		textSize(24);
// 		text("click to open microphone", width / 2, height / 2);
// 	}
// }

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }

//fourth try vv

// let mic, fft, waveform;
// let isSetup = false;
// let frequencyData = [];
// let waveformData = [];
// let smoothedVolume = 0;
// let lastAudioInputTime = 0;

// const numLines = 30;
// const gap = 20;
// const waveWidth = 1000;
// const fftSize = 1024;
// const waveformSize = 1024;

// let colorOffset = 0;

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	colorMode(HSB, 360, 100, 100);
// 	frameRate(30);

// 	mic = new Tone.UserMedia();
// 	fft = new Tone.FFT(fftSize);
// 	waveform = new Tone.Waveform(waveformSize);
// 	mic.connect(fft);
// 	mic.connect(waveform);

// 	canvas.addEventListener("click", setupAudio);
// }

// function setupAudio() {
// 	if (!isSetup) {
// 		Tone.start();
// 		mic
// 			.open()
// 			.then(() => {
// 				console.log("microphone is open");
// 				isSetup = true;
// 			})
// 			.catch((e) => {
// 				console.error("error opening microphone:", e);
// 			});
// 	}
// }

// function drawAudioEntity() {
// 	const baselineY = (numLines * gap) / 2;
// 	let waveformOffset = 0;

// 	if (isSetup) {
// 		const currentTime = millis();
// 		if (currentTime - lastAudioInputTime > 6000) {
// 			const volume = mic.volume.value;
// 			smoothedVolume = lerp(smoothedVolume, volume, 0.1);
// 			lastAudioInputTime = currentTime;
// 		}

// 		waveformOffset = map(smoothedVolume, -60, 0, 0, 100);
// 	}

// 	for (let i = 0; i < numLines; i++) {
// 		let rowHue = (colorOffset * 100 + i * 12) % 360;
// 		let rowSaturation = 80 + noise(colorOffset + i * 0.1) * 20;
// 		let rowBrightness = 60 + noise(colorOffset + i * 0.2) * 40;
// 		stroke(rowHue, rowSaturation, rowBrightness);
// 		strokeWeight(2);

// 		beginShape();
// 		for (let x = 0; x < waveWidth; x++) {
// 			let waveformIndex = floor(map(x, 0, waveWidth, 0, waveformData.length));
// 			let waveformValue = waveformData[waveformIndex] || 0;

// 			let y = i * gap + sin(x * 0.01 + frameCount * 0.05) * 15;
// 			y += waveformValue * waveformOffset;

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
// 		waveformData = waveform.getValue();
// 	}

// 	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

// 	drawAudioEntity();

// 	colorOffset += 0.01;

// 	if (!isSetup) {
// 		fill(255);
// 		noStroke();
// 		textAlign(CENTER, CENTER);
// 		textSize(24);
// 		text("click to open microphone", width / 2, height / 2);
// 	}
// }

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }

let player, fft, waveform;
let isSetup = false;
let frequencyData = [];
let waveformData = [];
let smoothedWaveform = [];
let smoothedVolume = 0;
let lastAudioInputTime = 0;

const numLines = 30;
const gap = 20;
const waveWidth = 1000;
const fftSize = 1024;
const waveformSize = 1024;
const smoothingFactor = 0.9;

let colorOffset = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100);
	frameRate(60);

	player = new Tone.Player("anitta-envolver.mp3").toDestination();
	fft = new Tone.FFT(fftSize);
	waveform = new Tone.Waveform(waveformSize);
	player.connect(fft);
	player.connect(waveform);

	for (let i = 0; i < waveformSize; i++) {
		smoothedWaveform[i] = 0;
	}

	canvas.addEventListener("click", setupAudio);
}

function setupAudio() {
	if (!isSetup) {
		Tone.start().then(() => {
			player.start();
			isSetup = true;
			console.log("Audio started");
		});
	}
}

function smoothWaveform(newData) {
	for (let i = 0; i < waveformSize; i++) {
		smoothedWaveform[i] = lerp(
			smoothedWaveform[i],
			newData[i],
			1 - smoothingFactor
		);
	}
	return smoothedWaveform;
}

function drawAudioEntity() {
	const baselineY = (numLines * gap) / 2;
	let waveformOffset = 0;

	if (isSetup) {
		const currentTime = millis();
		if (currentTime - lastAudioInputTime > 0) {
			const volume = Tone.dbToGain(player.volume.value);
			smoothedVolume = lerp(smoothedVolume, volume, 0.5);
			lastAudioInputTime = currentTime;
		}

		waveformOffset = map(smoothedVolume, 0, 1, 0, 250);
		colorOffset = map(smoothedVolume, 0, 1, 0, 360);
	}

	for (let i = 0; i < numLines; i++) {
		let rowHue = (colorOffset + i * 12) % 360;
		let rowSaturation = 80 + noise(frameCount * 0.01 + i * 0.1) * 20;
		let rowBrightness = 60 + noise(frameCount * 0.01 + i * 0.2) * 40;
		stroke(rowHue, rowSaturation, rowBrightness);
		strokeWeight(2);

		beginShape();
		for (let x = 0; x < waveWidth; x++) {
			let waveformIndex = floor(
				map(x, 0, waveWidth, 0, smoothedWaveform.length)
			);
			let waveformValue = smoothedWaveform[waveformIndex] || 0;

			// Apply easing to the waveform value for smoother transitions
			let easedWaveformValue = easeInOutQuad(abs(waveformValue));

			// Incorporate frequency data
			let frequencyIndex = floor(map(x, 0, waveWidth, 0, frequencyData.length));
			let frequencyValue = frequencyData[frequencyIndex] || 0;
			let normalizedFrequencyValue = map(frequencyValue, -100, 0, 0, 1);

			let y = i * gap + sin(x * 0.01 + frameCount * 0.05) * 15;
			y -= easedWaveformValue * waveformOffset;

			// Apply frequency-based offset
			y -= normalizedFrequencyValue * 50; // Adjust the multiplier to control the effect intensity

			vertex(x, y);
		}
		endShape();
	}
}

function easeInOutQuad(t) {
	return t < 0.5 ? 2 * t * t : 1 + (4 - 2 * t) * t;
}

function draw() {
	background(0, 0, 10);
	noFill();

	if (isSetup) {
		frequencyData = fft.getValue();
		waveformData = waveform.getValue();
		smoothedWaveform = smoothWaveform(waveformData);
	}

	translate(width / 2 - waveWidth / 2, height / 2 - (numLines * gap) / 2);

	drawAudioEntity();

	if (!isSetup) {
		fill(255);
		noStroke();
		textAlign(CENTER, CENTER);
		textSize(24);
		text("click to start audio", width / 2, height / 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
