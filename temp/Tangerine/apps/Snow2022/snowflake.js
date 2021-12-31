const dxMax = 60;
const dxMin = -60;
const dyMax = 100;
const dyMin = 20;
class Snowflake {
	constructor(start) {
		let dx = randomNumber(dxMin, dxMax);
		let dy = randomNumber(dyMin, dyMax);
		this.size = randomNumber(4, 6);
		this.fluffiness = randomNumber(fluffiness, fluffiness + 8);
		this.rad = randomNumber(0, 2 * Math.PI);
		this.dRad = Math.random() - 0.5;
		this.x = randomNumber(0, canvas.width);
		this.y = start ? -size * this.size : randomNumber(0, canvas.height);
		this.dx = dx;
		this.dy = dy;
		this.dxt = dx;
		this.dyt = dy;
		this.ddx = 60;
		this.sizeX = 0.1;
		this.sizeY = 0.1;
		this.options = [];
		this.allTime = 0;
		this.tempTime = 0;
		this.deleted = false;
		for (let i = 0; i < this.fluffiness; i++) {
			this.options.push({
				len: randomNumber(10, 30),
				withS: randomNumber(7, 10),
				y: randomNumber(10, 70),
				angle: randomNumber(1, 4),
			});
		}
	}

	update(dt) {
		this.allTime += dt;
		this.x += this.dxt * dt;
		this.y += this.dyt * dt;
		this.rad += this.dRad * dt;
		if (Math.floor(this.allTime) != this.tempTime) {
			this.dx = Math.floor(-60 + Math.random() * (60 + 60 + 1));
		}
		if (this.dxt < this.dx) {
			this.dxt += this.ddx * dt;
		} else if (this.dxt > this.dx) {
			this.dxt -= this.ddx * dt;
		}
		if (
			this.y > canvas.width + this.size * size ||
			this.x < -this.size * size ||
			this.x > canvas.width + this.size * size
		) {
			this.deleted = true;
		}
		this.tempTime = Math.floor(this.allTime);
	}

	render(ctx) {
		const currentSize = (this.size * size) / 100;
		const options = JSON.parse(JSON.stringify(this.options));
		for (let j in options) {
			for (let k in options[j]) {
				if (k != "angle") options[j][k] *= currentSize;
			}
		}
		ctx.save();
		ctx.fillStyle = "white";
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rad);
		ctx.beginPath(); // 1. Круг
		ctx.arc(0, 0, 20 * currentSize, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		for (let i = 0; i < 6; i++) {
			// 2. Основания
			const angle = (2 * Math.PI) / 6;
			const len = 100 * currentSize;
			const withS = 7 * currentSize;
			ctx.rotate(angle);
			ctx.beginPath();
			ctx.moveTo(-withS, 0);
			ctx.lineTo(0, len);
			ctx.lineTo(withS, 0);
			ctx.fill();
			ctx.closePath();

			for (let j in options) {
				// 3. Наращиваем на основания
				ctx.beginPath(); // Нарост слева от основания
				ctx.moveTo(0, options[j].y + options[j].withS);
				ctx.lineTo(
					options[j].len,
					options[j].y + options[j].withS * options[j].angle
				);
				ctx.lineTo(0, options[j].y);
				ctx.fill();
				ctx.closePath();
				ctx.beginPath(); // Нарост справа от основания
				ctx.moveTo(0, options[j].y + options[j].withS);
				ctx.lineTo(
					-options[j].len,
					options[j].y + options[j].withS * options[j].angle
				);
				ctx.lineTo(0, options[j].y);
				ctx.fill();
				ctx.closePath();
			}
		}
		ctx.restore();
	}
}
