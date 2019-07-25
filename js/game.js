const ctx = document.querySelector("canvas").getContext("2d");
let currentScene = "main";
const canvHeight = 650;
const canvWidth = 900;
var gameObj = {
		x: 0,
		y: 0,
		dx: 100,
		dy: 100,
		sizeX: 50,
		sizeY: 50
}
function game(){
	let now = Date.now();
	let dt = (now - last)/1000;
	if(dt < 0.1){ //Нужно вместо этого чекать возможность перескока сквозь стены.
		update(dt);
		render(currentScene);
	}
	last = now;
	requestAnimFrame(game);
}

function update(dt){
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
	ctx.fillStyle = " #003A3C";
	ctx.fillRect(0, 0, canvWidth, canvHeight);
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
