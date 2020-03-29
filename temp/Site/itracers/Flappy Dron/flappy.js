var canvas = document.getElementById('can');
var context = canvas.getContext('2d');



var pressedKeys = {};
function setKey(event, status) {
	var code = event.keyCode;
	var key;
	
	switch(code) {
		case 32:
			key = 'SPACE'; break;
		case 37:
			key = 'LEFT'; break;
		case 38:
			key = 'UP'; break;
		case 39:
			key = 'RIGHT'; break;
		case 40:
			key = 'DOWN'; break;
		default:  
			key = String.fromCharCode(code); // Convert ASCII codes to letters
	}
	pressedKeys[key] = status;
}

document.addEventListener('keydown', function(e) {
	setKey(e, true);
	if (e.keyCode === 32){
		jump += 30;
	}
});

document.addEventListener('keyup', function(e) {
	setKey(e, false);
});

window.addEventListener('blur', function() {
	pressedKeys = {};
});

function isDown(key){
	return pressedKeys[key.toUpperCase()];
}




var dron = {
	x: 40,
	y: 300,
	dy: 350,
	dx: 350
}

var fon = [
	{
		x: 0,
		y: 0,
		dx: 500
	},
	{
		x: 2113,
		y: 0,
		dx: 500
	},
	{
		x: 2113 + 2113,
		y: 0,
		dx: 500
	}
]


var dronimg = new Image()
dronimg.src = 'Sprite/Dron.png'

var fonimg = new Image(); //”îí
fonimg.src = '1.jpg';

fonimg.onload = function(){
	game()
}

var lastTime = Date.now();
function game(){
	var now = Date.now();
	var dt = (now - lastTime)/1000;
	
	update(dt);
	render();
	lastTime = now;
	requestAnimFrame(game);
}

jump = 0;

function update(dt){

	for(i in fon){
		fon[i].x -= fon[i].dx * dt;
		if(fon[i].x < - 3113){
			fon.splice(i, 1);
			fon.push({
				x: fon[fon.length - 1].x + 2113,
				y: 0,
				dx: 500
			});
		}
	}
	
	if(isDown('LEFT') || isDown('a')){
		dron.x -= dron.dx * dt;
	}
	if(isDown('RIGHT') || isDown('d')){
		dron.x += dron.dx * dt;
	}
	
	if(jump > 0){
		dron.y -= dron.dy * dt;
		jump--;
	}
	
	if(!isDown('SPACE') && !isDown('UP') && !isDown('w') && (jump <= 0)){
		dron.y += dron.dy * dt;
	}

}

function render(){
	for(i in fon){
		context.drawImage(fonimg, fon[i].x, fon[i].y, 2109, 600);
	}
	context.drawImage(dronimg, dron.x, dron.y, 40, 25);
}

var requestAnimFrame = (function(){
	return window.requestAnimationFrame    ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();
