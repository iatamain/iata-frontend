const ctx = document.querySelector("canvas").getContext("2d");
let currentScene = "main";
const canvHeight = 650;
const canvWidth = 900;
let cof_x = 0;
let cof_y = 0;
var gameObj = {
		x: 0,
		y: 0,
		dx: 200,
		dy: 200,
		sizeX: 50,
		sizeY: 50
}
function game(){
	let width = window.innerWidth;
	let height = window.innerHeight;
	if(width/height > canvWidth / canvHeight){
		document.querySelector("canvas").style.height = height + "px";
		document.querySelector("canvas").style.width = (height / canvHeight * canvWidth) + "px";
		cof_y = height/650
		cof_x = height / 650;
	}
	else{
		document.querySelector("canvas").style.width = width + "px";
		document.querySelector("canvas").style.height = (width / canvWidth * canvHeight) + "px";
		cof_x = (width / canvWidth * canvHeight)/canvHeight;
		cof_y = width / canvWidth;
	}
	let now = Date.now();
	let dt = (now - last)/1000;
	if(dt < 0.1){
		update(dt);
		render(currentScene);
	}
	last = now;
	requestAnimFrame(game);
}
var maxdt = 0;
function update(dt){
	if(dt > maxdt){
	console.log(dt);
	maxdt=dt;
	}
	gameObj.x += gameObj.dx * dt;
	gameObj.y += gameObj.dy * dt;
	if(gameObj.x +  gameObj.sizeX / 2 > canvWidth){
		gameObj.x = canvWidth - gameObj.sizeX / 2;
		gameObj.dx *= -1;
	}
	if(gameObj.x - gameObj.sizeX / 2 < 0){
		gameObj.x = gameObj.sizeX / 2;
		gameObj.dx *= -1;
	}
	if(gameObj.y + gameObj.sizeY / 2 > canvHeight){
		gameObj.y = canvHeight - gameObj.sizeY / 2;
		gameObj.dy *= -1;
	}
	if(gameObj.y - gameObj.sizeY / 2 < 0){
		gameObj.y = gameObj.sizeY / 2;
		gameObj.dy *= -1;
	}
}

function render(scene){
	ctx.clearRect(0, 0, canvWidth, canvHeight)
	ctx.fillStyle = "#03E6EF"; 
	ctx.fillRect(gameObj.x - gameObj.sizeX / 2, gameObj.y - gameObj.sizeY / 2, gameObj.sizeX, gameObj.sizeY);
}
let requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 50);
	};
})();
last = Date.now();
game();
