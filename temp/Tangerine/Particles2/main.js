var canvas = document.querySelector("#background canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var blue1 = "#000928";
var blue2 = "#04295E";
var blue3 = "#3582B9";
var white = "#F5EBFF";
var yellow = "#EBF02C";
var minDistance = 150;
var speed = 100;
var countParticles = 50;
document.addEventListener('mousemove', (e)=>{
	let x = e.offsetX;
	let y = e.offsetY
	particles[0].x = x;
	particles[0].y = y;
	particles[0].dx = 0;
	particles[0].dy = 0;
	particles[0].size = 0;
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
var time = 0;
checkTime = 0;
var colorEdges = {
	r: 255,
	g: 255,
	b: 255
}
var currentColorEdges = {
	r: 255,
	g: 255,
	b: 255
}
function getRandomColor(){
	return {
			r: Math.floor(Math.random() * 255),
			g: Math.floor(Math.random() * 255),
			b: Math.floor(Math.random() * 255)
		}
}
function rgbToHex(rgb){
	let r = rgb.r.toString(16);
	let g = rgb.g.toString(16);
	let b = rgb.b.toString(16);
	while(r.length < 2) r = "0" + r;
	while(g.length < 2) g = "0" + g;
	while(b.length < 2) b = "0" + b;
	return "#" + r + g + b;
}

function play(){
	let newTime = Date.now();
	let dt = (newTime - lastTime)/1000;
	update(dt);
	render()
	lastTime = newTime;
	requestAnimationFrame(play);
}
function update(dt){
	time += dt;
	if(Math.trunc(time) != checkTime && Math.trunc(time) % 2 == 0){
		colorEdges = getRandomColor();
		checkTime = Math.trunc(time);
	}
	if(currentColorEdges.r < colorEdges.r) currentColorEdges.r += 500*dt;
	if(currentColorEdges.g < colorEdges.g) currentColorEdges.g += 500*dt;
	if(currentColorEdges.b < colorEdges.b) currentColorEdges.b += 500*dt;
	if(currentColorEdges.r > colorEdges.r) currentColorEdges.r -= 500*dt;
	if(currentColorEdges.g > colorEdges.g) currentColorEdges.g -= 500*dt;
	if(currentColorEdges.b > colorEdges.b) currentColorEdges.b -= 500*dt;
	for(particle of particles){
		particle.move(dt);
	}
}
function render(){
	ctx.fillStyle = blue1;
	//ctx.fillRect(0,0, canvas.width, canvas.height * 0.8);
	ctx.fillStyle = blue2;
	//ctx.fillRect(0,canvas.height * 0.8, canvas.width, canvas.height * 0.8);
	ctx.fillStyle = yellow;
	ctx.globalAlpha = 0;
	for(particle of particles){
		ctx.beginPath();
		ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI *2);
		ctx.closePath();
		ctx.fill();
	}
	ctx.globalAlpha = 1;
	for(let i = 0; i < particles.length - 1; i++){ //Рисуем связи
		for(let j = i + 1; j < particles.length; j++){
			let distance = Math.sqrt((particles[i].x - particles[j].x) ** 2 + (particles[i].y - particles[j].y) ** 2);
			if(distance < minDistance){
				ctx.strokeStyle = rgbToHex(currentColorEdges);
				ctx.globalAlpha = (minDistance - distance) / (minDistance * 65); // /*65
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
				Math.random() * speed - speed/2,
				Math.random() * speed - speed/2
			)
		);
		lastTime = Date.now();
	}
	console.log(particles);
}
preload();
play();