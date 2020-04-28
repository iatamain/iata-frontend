{
const canvas = document.querySelector("#background");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const blue1 = "#104" //"#000928";
const blue2 = "#04295E";
const blue3 = "#3582B9";
const white = "#F5EBFF";
const yellow = "#EBF02C";
const minDistance = 200;
const countParticles = 100;
document.addEventListener('mousemove', (e)=>{
	let x = e.x;
	let y = e.y
	particles[0].x = x;
	particles[0].y = y;
	particles[0].dx = 0;
	particles[0].dy = 0;
	particles[0].size = 0;
});
document.addEventListener('click', (e)=>{
	let x = e.x;
	let y = e.y
	particles.push( new Particle(
			x,
			y,
			Math.random() + 1,
			(Math.random() - 0.5)/8,
			(Math.random() - 0.5)/8
		)
	);
});
window.addEventListener('resize', (e)=>{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
class Particle{
	constructor(x, y, size, dx, dy){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.size = size;
	}
	move(dt){
		if(this.x < 0) this.x = canvas.width;
		if(this.x > canvas.width) this.x = 0;
		if(this.y < 0) this.y = canvas.height;
		if(this.y > canvas.height) this.y = 0;
		this.x += this.dx * dt;
		this.y += this.dy * dt;
	}
}
var particles = [];
var lastTime = Date.now();
function play(){
	let newTime = Date.now();
	let dt = Math.min(newTime - lastTime, 55);
	update(dt);
	render()
	lastTime = newTime;
	requestAnimationFrame(play);
}
function update(dt){
	particles.forEach((particle, i)=>{
		if((particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.width ) && particles.length > countParticles){
			particles.splice(i, 1);
		}else{
			particle.move(dt);
		}
	});
}
function render(){
	ctx.fillStyle = blue1;
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = yellow;
	ctx.globalAlpha = 1;
	for(particle of particles){
		ctx.beginPath();
		ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI *2);
		ctx.closePath();
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	ctx.strokeStyle = yellow;
	for(let i = 0; i < particles.length - 1; i++){
		for(let j = i + 1; j < particles.length; j++){
			let distance = Math.sqrt((particles[i].x - particles[j].x) ** 2 + (particles[i].y - particles[j].y) ** 2);
			if(distance < minDistance){
				ctx.globalAlpha = (minDistance - distance) / (minDistance * 6); // /*65
 				ctx.beginPath();
				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
				ctx.closePath();
				ctx.stroke();
				ctx.globalAlpha = 1;
			}
		}
	}
}
function preload(){
	ctx.fillStyle = blue1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < countParticles; i++){
		particles.push( new Particle(
				Math.random() * canvas.width,
				Math.random() * canvas.height,
				Math.random() + 1,
				(Math.random() - 0.5)/8,
				(Math.random() - 0.5)/8
			)
		);
		lastTime = Date.now();
	}
}
preload();
play();
}
