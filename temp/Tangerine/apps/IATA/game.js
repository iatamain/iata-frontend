document.addEventListener('DOMContentLoaded', function () { 
var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');


var pressedKeyscheck = false;
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



var person = {		//Параметры персонажа
	x: 370,			
	y: 250,
	dx: 300,		
	dy: 300,
};


var speedparam = {	//Параметры анимаций
	fall: 20,
	run: 20,
	stand: 7,
	jump: 50
}

var fallanim = 3;   //Кадры анимаций
var runanim = 5;
var standanim = 4;
var jump = 0;
var gameTime = 0;
var lastTime;



runimg = new Image();
runimg.src = 'p_e_goo.png';

standimg = new Image();
standimg.src = 'p_e_stoit.png';

fallimg = new Image();
fallimg.src = 'p_e_padenie.png';

landingimg = new Image();
landingimg.src = 'p_e_prizeml.png';

var fonimg = new Image();
fonimg.src = 'fonstart.png';

fonimg.onload = function(){
	lastTime = Date.now();
	game();
}


function game(){
	var now = Date.now();
	var dt = (now - lastTime)/1000
	update(dt);
	render();
	lastTime = now;
	requestAnimFrame(game);
}



function update(dt){
	if(Math.round(fallanim) > 2 || person.y < 460){	//Ходит
		if(isDown('LEFT') || isDown('a')) {
			person.x -= person.dx * dt;
			runanim += speedparam.run * dt;
			if(person.x <= 80){
				person.x = 80;
			}	
			if(Math.round(runanim) >= 5){
				runanim = 0;
			}
		}

		if(isDown('RIGHT') || isDown('d')) {
			person.x += person.dx * dt;
			runanim-= speedparam.run * dt;
			if(person.x >= 660){
				person.x = 660;
			}
			if(Math.round(runanim) <= 0) {
				runanim = 5;
			}
		}
	}
	if(Math.round(fallanim) > 2 && (jump || person.y >= 460)){             //Физика прыжжка
		if(isDown('SPACE') || isDown('UP') || isDown('w')){
			person.y -= person.dy * dt;
			jump += speedparam.jump * dt;
		}
		if(jump > 10){
			jump = 0;
		}
	}
	if(!isDown('SPACE') && !isDown('UP') && !isDown('w')){
		jump = 0;
	}

	pressedKeyscheck = false;
	for(i in pressedKeys){
		if(pressedKeys[i] == true){
			pressedKeyscheck = true; //true -- в движении
		}
	}
	if(!pressedKeyscheck){			//Стоит на месте
		standanim += speedparam.stand * dt;
	}
	if(person.y < 460 && !jump){	//Падение
		person.y += person.dy * dt;
		fallanim = 0;
	}
	if(Math.round(fallanim) < 3){		//Приземление
		fallanim += speedparam.fall * dt;
	}
	
	
	
	
}

function render(){
	//$('canvas').css('width', window.innerWidth);
	//$('canvas').css('height', window.innerHeight);
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(width/height > 800/600){
		//Подгоняем высоту
		$('canvas').css('height', height);
		$('canvas').css('width', height/600*800);
	}else{
		//Подгоняем ширину
		$('canvas').css('width', width);
		$('canvas').css('height', width/800*600);
	}
	ctx.drawImage(fonimg, 0, 0, 800, 600);
	if(person.y < 460){
		ctx.drawImage(fallimg, person.x, person.y-55, 60, 120) //0.625
	}else if(Math.round(fallanim) < 3){
		ctx.drawImage(landingimg, 192 * (Math.round(fallanim) % 3), 0, 192, 96, person.x - 30, person.y, 120, 60); //, 96, 0, 96, 96
	}else{
		if(pressedKeyscheck){
			ctx.drawImage(runimg, 96 * (Math.round(runanim) % 5), 0, 96, 96, person.x, person.y, 60, 60);
		}else{
			ctx.drawImage(standimg, 96 * (Math.round(standanim) % 4), 0, 96, 96, person.x, person.y, 60, 60);
		}
	}
}

var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 50);
	};
})();
}, false);
/*Список необнуляемых и неограниченных переменных
	standanim
*/