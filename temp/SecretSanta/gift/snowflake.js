document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', canvas.clientWidth);
    canvas.setAttribute('height', canvas.clientHeight);
    let context = canvas.getContext('2d');
    let snowflakesCount = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 50;
    let smallScreen = canvas.width < 480;
    let snowflakes = new Set();
    let time = Date.now();
    let logo = new Logo(context, smallScreen ? 20 : (canvas.width / 2 - 128), canvas.height / (smallScreen?3:2) - 32, smallScreen ? 32 : 64, 'Happy new 2021');
    logo.opacity = 0.8;
    let descriptionLines = `It appears you have received gift from Santa :D
	Not going to write yet another poem like in all such cards
	Just let this year rock 🤘
	

	PS. Yes, I know it causes eyes bleeding.
	Let it be the last thing doing that this year :D
    	`
	.split('\n')
	.map((line, i) => new Logo(context, smallScreen ? 20 : (canvas.width / 2 - 128), canvas.height / (smallScreen?3:2) + 24 * (i+1), smallScreen ? 12 : 24, line.trim()));

    for (let descriptionLine of descriptionLines) {
	descriptionLine.color = [0xff, 0xff, 0xff];
    	descriptionLine.opacity = 0.8;
    	descriptionLine.offset = 1;
    }
    canvas.addEventListener('click', ev => {
        let { clientX, clientY } = ev;
        for (let snowflake of snowflakes) {
            if (clientX > snowflake.x - snowflake.size / 3 && clientY > snowflake.y - snowflake.size / 3
                && clientX < snowflake.x + snowflake.size + snowflake.size / 3 && clientY < snowflake.y + snowflake.size + snowflake.size / 3) {
                snowflake.fading = true;
                break;
            }
        }
    })

    let render = function () {
        let now = Date.now();
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.strokeStyle = '#FFF';

        while (snowflakes.size < snowflakesCount) {
            let rX = Math.random() * canvas.width;
            let rMode = ~~(Math.random() * 4) || 1;
            let rAngleDelta = Math.random() * 5;
            let rVelocity = Math.random() * 300;
            if (rVelocity < 80) {
                rVelocity += 80;
            }
            let rDirection = ~~(Math.random() * 2) ? 1 : -1;

            let type = Math.random() > 0.5 ? 1 : 0;
            if (type) {
                snowflakes.add(new RecursiveSnowflake(context, rX, 0, rMode * 10, rVelocity, rDirection, rMode, rMode, rAngleDelta));
            }
            else {
                snowflakes.add(new RandomStickSnowflake(context, rX, 0, rMode * 10, rVelocity, rDirection, rMode, rMode, rAngleDelta));
            }
        }
        if ((now - time) > 50) {
            let dt = (now - time) / 1000;
            for (let snowflake of snowflakes) {
                if (snowflake.y > canvas.height || snowflake.x > canvas.width || snowflake.x < 0) {
                    snowflakes.delete(snowflake);
                }
                snowflake.y += snowflake.velocity * dt;
                snowflake.x += snowflake.velocity * dt * snowflake.direction / 2;
                snowflake.angle += snowflake.velocity * dt * snowflake.direction / 100;
                if (snowflake.fading && (snowflake.size -= dt * 100) <= 0) {
                    snowflakes.delete(snowflake);
                }
                time = now;
            }
            logo.moveOffset();
        }
        for (let snowflake of snowflakes) {
            snowflake.render();
        }

        logo.render();
        if (logo.opacity < 1) {
            logo.opacity += 0.001;

            if (logo.opacity > 1) {
                logo.opacity = 1;
            }
        }

	for (let descriptionLine of descriptionLines) descriptionLine.render();

        requestAnimationFrame(render);
    }
    render();
});

class BaseSnowflake {
    constructor(context, x, y, size, velocity, direction) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
        this.direction = direction;
        this.fading = false;
    }
}

class RecursiveSnowflake extends BaseSnowflake {
    constructor(context, x, y, size, velocity, direction, maxDepth = 3, cuteness = 2, angle = 0) {
        super(context, x, y, size, velocity, direction);
        this.maxDepth = maxDepth;
        this.cuteness = cuteness;
        this.angle = angle;
    }

    render(params) {
        let context = this.context;
        let angle = this.angle;

        let { x, y, size, maxDepth, depth, cuteness } = params || {};
        if (!x) {
            x = this.x;
        }
        if (!y) {
            y = this.y;
        }
        if (!size) {
            size = this.size;
        }
        if (!maxDepth) {
            maxDepth = this.maxDepth;
        }
        if (!cuteness) {
            cuteness = this.cuteness;
        }

        if (!depth) {
            depth = this.depth || 0;
        }


        if (depth < maxDepth) {
            // context.save();
            // context.translate(x + size / 2, y + size / 2);
            // context.rotate(angle);

            context.beginPath();
            context.moveTo(x, y + size / 2);
            context.lineTo(x + size, y + (size / 2));

            context.moveTo(x + size / 2, y);
            context.lineTo(x + size / 2, y + size);

            if (depth < cuteness) {
                context.moveTo(x, y);
                context.lineTo(x + size / 2, y + size / 2);
                context.lineTo(x + size, y);

                context.moveTo(x + size / 2, y + size / 2);
                context.lineTo(x + size, y + size);

                context.moveTo(x + size / 2, y + size / 2);
                context.lineTo(x, y + size);
            }

            context.stroke();
            context.closePath();

            let reduceCoef = 3;
            let innerSize = size / reduceCoef;
            let commonParams = { maxDepth: maxDepth, depth: depth + 1, cuteness: cuteness };

            this.render({ x: x + innerSize, y: y - innerSize, size: innerSize, ...commonParams });
            this.render({ x: x - innerSize, y: y + innerSize, size: innerSize, ...commonParams });
            this.render({ x: x + innerSize * reduceCoef, y: y + innerSize, size: innerSize, ...commonParams });
            this.render({ x: x + innerSize, y: y + innerSize * reduceCoef, size: innerSize, ...commonParams });

            if (depth < cuteness) {
                let offsetCoef = 0.25;

                this.render({ x: x + size * (1 - offsetCoef), y: y - innerSize * offsetCoef, size: innerSize, ...commonParams });
                this.render({ x: x - innerSize * offsetCoef, y: y - innerSize * offsetCoef, size: innerSize, ...commonParams });
                this.render({ x: x - innerSize * offsetCoef, y: y + size * (1 - offsetCoef), size: innerSize, ...commonParams });
                this.render({ x: x + size * (1 - offsetCoef), y: y + size * (1 - offsetCoef), size: innerSize, ...commonParams });
                this.render({ x: x + innerSize, y: y + innerSize, size: innerSize, ...commonParams });
            }

            // context.restore();
        }
    }
}

/**
 * Based on code by Tangerine(ITracers, https://github.com/TangerineNe)
 */
class RandomStickSnowflake extends BaseSnowflake {
    constructor(context, x, y, size, velocity, direction, maxDepth = 3, cuteness = 5, angle = 0) {
        super(context, x, y, size, velocity, direction);
        this.maxDepth = maxDepth;
        this.cuteness = cuteness;
        this.angle = angle;

        size /= 2;
        this.data = new Array(~~(Math.random() * cuteness))
            .fill({ len: 1, withS: 1, y: 1 })
            .map(c => ({ len: ~~(Math.random() * size), withS: ~~(Math.random() * size), y: ~~(Math.random() * size) }));
    }

    render() {
        let { context, x, y, size, angle, cuteness, data } = this;
        size /= 100;

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillStyle = "#fff";
        context.beginPath();
        if (size > 0) {
            context.arc(0, 0, 20 * size, 0, 2 * Math.PI);
        }
        context.fill();
        context.closePath();
        for (let i = 0; i < 6; i++) {
            let angle = 2 * Math.PI / 6;
            let len = 100 * size;
            let withS = 7 * size;
            context.rotate(angle);
            context.beginPath();
            context.moveTo(-withS, 0);
            context.lineTo(0, len);
            context.lineTo(withS, 0);
            context.fill();
            context.closePath();

            for (let j in data) {
                context.beginPath();
                context.moveTo(0, data[j].y + data[j].withS);
                context.lineTo(data[j].len, data[j].y + data[j].withS * cuteness);
                context.lineTo(0, data[j].y);
                context.fill();
                context.closePath();
                context.beginPath();
                context.moveTo(0, data[j].y + data[j].withS);
                context.lineTo(-data[j].len, data[j].y + data[j].withS * cuteness);
                context.lineTo(0, data[j].y);
                context.fill();
                context.closePath();
            }

        }
        context.restore();
    }

}

class Logo {
    constructor(context, x, y, size, text) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.size = size;
        this.text = text;
        this.opacity = 0;
        this.color = [0xff, 0xff, 0xff];
        this.offset = 0;
        this.rotateOffset = true;
    }

    moveOffset() {
        if (this.rotateOffset) {
            this.offset += 0.03;

            if (this.offset > 1) {
                this.offset = 1;
                this.rotateOffset = false;
            }
        }
        else {
            this.offset -= 0.03;

            if (this.offset < 0) {
                this.offset = 0;
                this.rotateOffset = true;
            }

        }
    }

    render() {
        let [r, g, b] = this.color;
        let { context, opacity, size } = this;

        var grd = context.createLinearGradient(this.x, this.y + 32, this.x + 320, this.y + 32);
        grd.addColorStop(0, `#${this.zeroPad((~~(r * opacity * this.offset)).toString(16), 2)}${this.zeroPad((~~(g * opacity)).toString(16), 2)}${this.zeroPad((~~(b * opacity * (1 - this.offset))).toString(16), 2)}`);
        grd.addColorStop(0.5, `#${this.zeroPad((~~(r * opacity * (1 - this.offset))).toString(16), 2)}${this.zeroPad((~~(g * opacity * this.offset)).toString(16), 2)}${this.zeroPad((~~(b * opacity * (1 - this.offset))).toString(16), 2)}`);
        grd.addColorStop(1, `#${this.zeroPad((~~(r * opacity * (1 - this.offset))).toString(16), 2)}${this.zeroPad((~~(g * opacity)).toString(16), 2)}${this.zeroPad((~~(b * opacity * this.offset)).toString(16), 2)}`);
        context.fillStyle = grd;

        context.font = `${size}px verdana`;
        context.fillText(this.text, this.x, this.y);
        context.fillStyle = 'rgba(0,0,0,0.5)';
        context.fillRect(this.x, this.y - size, this.text.length * size / 2, size+size/2);

    }

    zeroPad(num, places) {
        return String(num).padStart(places, '0');
    }

}
