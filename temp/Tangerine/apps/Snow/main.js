let mouseX, mouseY;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener("mousedown", function (e) {
	document.querySelector(".inputs").style.display = "block";
	mouseX = e.pageX - e.target.offsetLeft;
	mouseY = e.pageY - e.target.offsetTop;
	let minI = -1;
	let minDist = -1;
	let dist = 0;
	for (i in snowflakes) {
		dist = Math.sqrt(
			(mouseX - snowflakes[i].x) * (mouseX - snowflakes[i].x) +
				(mouseY - snowflakes[i].y) * (mouseY - snowflakes[i].y)
		);
		if (snowflakes[i].size * size > dist) {
			if (dist < minDist || minDist == -1) {
				minDist = dist;
				minI = i;
			}
		}
	}
	if (minI != -1) {
		snowflakes.splice(minI, 1);
		document.querySelector("#count").value--;
	}
});

const snowflakes = [];
const lyingSnow = [];
let last;

function play() {
	const now = Date.now();
	const dt = (now - last) / 1000;
	update(dt);
	render(dt);
	last = now;
	requestAnimationFrame(play);
}

function preload() {
	for (let i = 0; i < 30; i++) {
		snowflakes.push(new Snowflake(false));
	}
	for (let i = 0; i <= 10; i++) {
		let x = randomNumber(10, 30);
		let y = randomNumber(10, 30);
		lyingSnow.push({ x, y });
	}
}

function update(dt) {
	if (dt > 1) dt = 1;
	snowflakes.forEach((snowflake) => {
		snowflake.update(dt * speed);
	});
	snowflakes.forEach((snowflake, i) => {
		if (snowflake.deleted) {
			snowflakes.splice(i, 1);
			snowflakes.push(new Snowflake(true));
		}
	});
}

function render() {
	ctx.fillStyle = "#002";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawSnowMan();
	drawLyingSnow();
	snowflakes.forEach((snowflake) => {
		snowflake.render(ctx);
	});
}

function drawSnowMan() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(100, canvas.height - 50, 60, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.arc(100, canvas.height - 130, 47, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.arc(100, canvas.height - 200, 40, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawLyingSnow() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(0, canvas.height - 50);
	for (let i = 0; i <= 10; i++) {
		ctx.quadraticCurveTo(
			30 + 200 * i + lyingSnow[i].x,
			canvas.height - 50 + lyingSnow[i].y,
			100 + 200 * i,
			canvas.height - 50
		);
		ctx.quadraticCurveTo(
			130 + 200 * i + lyingSnow[i].x,
			canvas.height - 50 - lyingSnow[i].y,
			200 + 200 * i,
			canvas.height - 50
		);
	}
	ctx.lineTo(11 * 200, canvas.height);
	ctx.lineTo(0, canvas.height);
	ctx.fill();
	ctx.closePath();
}

preload();
last = Date.now();
play();
