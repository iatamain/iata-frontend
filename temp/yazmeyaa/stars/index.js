//* ==> SCENE OBJECTS <==

const stars = [];

//*  ==> UTILS <==

function getRandomInt(min = 0, max = 1) {
	return Math.floor(min + Math.random() * (max - min + 1));
}

function spawnNStars(count = 0) {
	if (stars.length >= count) return;

	stars.push(new Star());
}

//* ==> ELEMENTS <==

const body = document.querySelector("body");
if (!body) throw new Error("no body");
body.style.margin = "0px";

const canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.display = "block";
canvas.innerHTML = "Enable JavaScript to run this app!";

body.appendChild(canvas);

window.addEventListener("resize", () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});

//* ==> GLOBAL APP VARIABLES <==

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("no context");

const colors = ["#363c85", "#3a46c9", "#5732ad", "#7986ad"];

//* ==> CLASSES <==

class Vector {
	x1 = 0;
	x2 = 0;

	constructor(x1 = 0, x2 = 0) {
		this.x1 = x1;
		this.x2 = x2;
	}

	get vector() {
		return this.x1 - this.x2;
	}

	get length() {
		return Math.sqrt(this.x1 ** 2 + this.x2 ** 2);
	}

	get normalisedVector() {
		return this.vector / this.length;
	}
}

class Star {
	#angle = getRandomInt(0, 360);
	#position = {
		x: 20 * Math.cos(this.#angle) + canvas.width / 2,
		y: 20 * Math.sin(this.#angle) + canvas.height / 2,
	};
	#direction = {
		x: new Vector(canvas.width / 2, this.#position.x),
		y: new Vector(canvas.height / 2, this.#position.y),
	};
	#speed = getRandomInt(150, 400);
	#color = colors[getRandomInt(0, colors.length - 1)];
	#size = 1;

	#reset() {
		this.#angle = getRandomInt(0, 360);
		this.#position.x = 20 * Math.cos(this.#angle) + canvas.width / 2;
		this.#position.y = 20 * Math.sin(this.#angle) + canvas.height / 2;
		this.#direction = {
			x: new Vector(canvas.width / 2, this.#position.x),
			y: new Vector(canvas.height / 2, this.#position.y),
		};
		this.#size = 1;
		this.#speed = getRandomInt(150, 400);
	}

	render() {
		if (!ctx) throw new Error("no context");
		ctx.beginPath();
		ctx.fillStyle = this.#color;
		ctx.arc(this.#position.x, this.#position.y, this.#size, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	update(dt = 0) {
		if (
			this.#position.x >= canvas.width + this.#size ||
			this.#position.x <= 0 - this.#size ||
			this.#position.y <= 0 - this.#size ||
			this.#position.y >= canvas.height + this.#size
		) {
			this.#reset();
		}
		this.#position.x -= this.#direction.x.normalisedVector * (dt * this.#speed);
		this.#position.y -= this.#direction.y.normalisedVector * (dt * this.#speed);

		this.#size += 2 * dt;
		this.#speed += 20000 * dt;
	}
}

//* ==> SCENE RENDER <==

function drawBackground() {
	if (!ctx) throw new Error("no context");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//* ==> APP ENGINE <==

function render() {
	drawBackground();
	stars.forEach((item) => item.render());
}

function update(dt = 0) {
	spawnNStars(350);
	stars.forEach((item) => item.update(dt));
}

let last = Date.now();

function play() {
	const now = Date.now();
	let dt = (now - last) / 1000;
	if (dt > 1) dt = 0.2;
	last = now;
	render();
	update(dt);
	requestAnimationFrame(play);
}

play();