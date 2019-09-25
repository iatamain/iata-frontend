var speed = 1;
var size = 8;
var furry = 2;
var count = 30;
let dxMax = 60, dxMin = -60;
let dyMax = 100, dyMin = 20;
let mouseX, mouseY;
document.querySelector("canvas").addEventListener('mousedown', function(e){
	document.querySelector(".inputs").style.display = "block";
	mouseX = e.pageX - e.target.offsetLeft;
	mouseY = e.pageY - e.target.offsetTop;
	let minI = -1;
	let minDist = -1;
	let dist = 0;
	console.log(mouseX, mouseY);
	for(i in snowFail){
		dist = Math.sqrt((mouseX - snowFail[i].x)*(mouseX - snowFail[i].x) + (mouseY - snowFail[i].y)*(mouseY - snowFail[i].y));
		if(snowFail[i].size * size > dist){
			if(dist < minDist || minDist == -1){
				minDist = dist;
				minI = i;
			}
		}
	}
	if(minI != -1){ snowFail.splice(minI, 1);
		document.querySelector("#count").value--;
	}
});
class snowBall{
	constructor(start){
		let dx = Math.floor(dxMin + Math.random() * (dxMax - dxMin + 1));
		let dy = Math.floor(dyMin + Math.random() * (dyMax - dyMin + 1));
		this.size = Math.floor(4 + Math.random() * (6 - 4 + 1));
		this.furriness = Math.floor(furry + Math.random() * (furry + 8 - furry + 1));
		this.rad = Math.floor(0 + Math.random() * (2 * Math.PI - 0 + 1));
		this.dRad = Math.random() -0.5;
		this.x = Math.floor(0 + Math.random() * (800 - 0 + 1)),
		this.y = start ? -size * this.size : Math.floor(0 + Math.random() * (800 - 0 + 1)),
		this.dx = dx,
		this.dy = dy,
		this.dxt = dx,
		this.dyt = dy,
		this.ddx = 60,
		this.sizeX = 0.1,
		this.sizeY = 0.1,
		this.options = []
		for(let i = 0; i < this.furriness; i++){
			this.options.push({
				len: Math.floor(10 + Math.random() * (30 - 10 + 1)),
				withS: Math.floor(7 + Math.random() * (10 - 7 + 1)),
				y: Math.floor(10 + Math.random() * (70 - 10 + 1)),
				cute: Math.floor(1 + Math.random() * (4 - 1 + 1))
			})
		}
	}
}
let ctx = document.querySelector("canvas").getContext("2d"); //Получаем контекст
var snowFail = [];
var snowDown = [];
let last;
let allTime = 0;
let tempTime = 0;
function play(){
	let now = Date.now();
	let dt = (now - last)/1000;
	update(dt);
	render(dt);
	last = now;
	requestAnimFrame(play);
}
function preload(){
	for(let i = 0; i < 30; i++){ //SnowFall
		snowFail.push(new snowBall(false));
	}
	for(let i = 0; i <= 10; i++){ //SnowDown
		let min = 10;
		let max = 30;
		let a = Math.floor(min + Math.random() * (max - min + 1));
		let b = Math.floor(min + Math.random() * (max - min + 1));
		snowDown.push({
			x: a,
			y: b
		});
	}
}
function update(dt){
	dt *= speed;
	allTime += dt;
	for(i in snowFail){
		snowFail[i].x += snowFail[i].dxt * dt;
		snowFail[i].y += snowFail[i].dyt * dt;
		snowFail[i].rad += snowFail[i].dRad * dt;
		if(Math.floor(allTime) != tempTime){
			snowFail[i].dx = Math.floor(-60 + Math.random() * (60 + 60 + 1));
		}
		if(snowFail[i].dxt < snowFail[i].dx){
			snowFail[i].dxt += snowFail[i].ddx*dt;
		}else if(snowFail[i].dxt > snowFail[i].dx){
			snowFail[i].dxt -= snowFail[i].ddx*dt;
		}
		if(snowFail[i].y > 600 + snowFail[i].size * size || snowFail[i].x < -snowFail[i].size * size || snowFail[i].x > 800 + snowFail[i].size * size){
			snowFail.splice(i, 1);
			snowFail.push(new snowBall(true));
		}
	}
	tempTime = Math.floor(allTime);
}
function render(){
	ctx.clearRect(0,0, 800, 600);
	ctx.fillStyle = "#002";
	ctx.fillRect(0, 0, 800, 600);
	
	ctx.fillStyle = "white";
	ctx.beginPath(); //Снеговик, body
	ctx.arc(100,550,60,0,2*Math.PI);
	ctx.closePath();
	ctx.arc(100,470,47,0,2*Math.PI);
	ctx.closePath();
	ctx.arc(100,400,40,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath(); //Снег, который лежит
	ctx.moveTo(0, 550);
	for(let i = 0; i <= 10; i++){
		ctx.quadraticCurveTo(30 + 200 * i + snowDown[i].x, 550 + snowDown[i].y, 100+200 * i, 550);
		ctx.quadraticCurveTo(130 + 200 * i + snowDown[i].x, 550 - snowDown[i].y, 200+200 * i, 550);
	}
	ctx.lineTo(11 * 200, 600);
	ctx.lineTo(0, 600);
	ctx.fill();
	ctx.closePath();
	
	ctx.fillStyle = "#fff"; //Снег, который падает
	for(i in snowFail){
		ctx.beginPath();
		drawSnowflake(snowFail[i].x, snowFail[i].y, snowFail[i].size*size, ctx, snowFail[i].rad, snowFail[i].options);
		ctx.closePath();
		ctx.fill();
	}
}
function drawSnowflake(x, y, size, ctx, rad, prm){
	size/=100;
	let param;
	if(prm){
		param = JSON.parse(JSON.stringify(prm));
	}else{
		param = [
			{
				len: 20,
				withS: 10,
				y: 60,
				cute: 2
			},
			{
				len: 10,
				withS: 7,
				y: 52,
				cute: 2
			},
			{
				len: 10,
				withS: 7,
				y: 45,
				cute: 2
			},
			{
				len: 30,
				withS: 10,
				y: 35,
				cute: 2
			},
			{
				len: 18,
				withS: 7,
				y: 20,
				cute: 2
			}
		]
	}
	for(j in param){
		for(k in param[j]){
			if(k != "cute")
			param[j][k]*=size;
		}
	}
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rad);
	ctx.fillStyle = "#fff";
	ctx.beginPath(); //Круг
	ctx.arc(0,0,20 * size,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	for(let i = 0; i < 6; i++){
		let angle = 2*Math.PI/6;
		let len = 100*size;
		let withS = 7*size;
		ctx.rotate(angle);
		ctx.beginPath();
		ctx.moveTo(-withS, 0);
		ctx.lineTo(0, len);
		ctx.lineTo(withS, 0);
		ctx.fill();
		ctx.closePath();
		
		for(j in param){
			ctx.beginPath(); //Left midle1
			ctx.moveTo(0, param[j].y + param[j].withS);
			ctx.lineTo(param[j].len, param[j].y + param[j].withS * param[j].cute);
			ctx.lineTo(0, param[j].y);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath(); //Right midle2
			ctx.moveTo(0, param[j].y + param[j].withS);
			ctx.lineTo(-param[j].len, param[j].y + param[j].withS * param[j].cute);
			ctx.lineTo(0, param[j].y);
			ctx.fill();
			ctx.closePath();
		}
		
	}
	ctx.restore(); 
}
var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 50);
	};
})();

preload();
last = Date.now();
play();