
var cof_x = 600/1000;
var cof_y = 600/1000;
var mouse = false;
var first_start = false;
var playbutton_state = true;
var selectbutton_state = false;
var pastebutton_state = false;
var select_finish = false;
var tempselect_x1, tempselect_x2, tempselect_y1, tempselect_y2;
var select_x1, select_y1, select_x2, select_y2;
var test = 0;
var type_paste = "buffer";
var type_pen = 0;
var frames = 0;
var time = 0;
var temptime = 0;
var temptime2 = 0;
var speedgame = 1;
var crazy_color = 0;
var cell = {
	x: 0,
	y: 0
}
var paste = {
	buffer : [],
	gun: []
}
var start_cells = [];
var mental_cells = [];
var cells = [];
var cells2 = [];
for(var i = 0; i < 100; i++){
	paste.buffer[i] = [];
	paste.gun[i] = [];
	start_cells[i] = []
	mental_cells[i] = [];
	cells[i] = [];
	cells2[i] = [];
}
for(var i = 0; i < 100; i++){
	for(var j = 0; j < 100; j++){
		start_cells[i][j] = 0;
		paste.buffer[i][j] = 0;
		paste.gun[i][j] = 0;
		mental_cells[i][j] = 0;
		cells[i][j] = 0;
		cells2[i][j] = 0;
	}
}

document.addEventListener('DOMContentLoaded', function () { 
var canvas = document.getElementById('canvas');
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
canvas.addEventListener('mousemove', function(e){
		if(mouse || pastebutton_state){
			cell.x = (e.pageX - e.target.offsetLeft) / cof_x;
			cell.y = (e.pageY - e.target.offsetTop) / cof_y;
			cell.x = Math.floor(cell.x / 10);
			cell.y = Math.floor(cell.y / 10);			
		}
	}
);
canvas.addEventListener('mousedown', function(e){
		mouse = true;
		cell.x = (e.pageX - e.target.offsetLeft) / cof_x;
		cell.y = (e.pageY - e.target.offsetTop) / cof_y;
		cell.x = Math.floor(cell.x / 10);
		cell.y = Math.floor(cell.y / 10);
		if(cell.x >= 0 && cell.x <= 99 && cell.y >= 0 && cell.y <= 99){
			if(selectbutton_state){
				select_finish = false;
				select_x1 = cell.x;
				select_y1 = cell.y;
			}else if(pastebutton_state){
				for(var i = 0; i < 100; i++){
					for(var j = 0; j < 100; j++){
						if(mental_cells[i][j] == "purple"){
							cells[i][j] = "white";
						}else if(mental_cells[i][j]){
							cells[i][j] = "#FFFF00";
						}
					}
				}
				for(var i = 0; i < 100; i++){
					for(var j = 0; j < 100; j++){
						mental_cells[i][j] = 0;
					}
				}
			}
		}
	}
);
canvas.addEventListener('mouseup', function(e){
		console.log(event.which);
		mouse = false;
		if(selectbutton_state){ //Select finishing
			if(select_x1 != select_x2 && select_y1 != select_y2){
				select_finish = true;
			}else{
				select_finish = false;
			}
		}
		if(pastebutton_state && cell.x >= 0 && cell.x <= 99 && cell.y >= 0 && cell.y <= 99){
			pastebutton_state = false;
		}
	}
);


function game(){
	var now = Date.now();
	var dt = (now - last)/1000;
	update(dt);
	render();
	last = now;
	requestAnimFrame(game);
}


function found_cells(i, j){
	i += 100;
	j += 100;
	var count = 0;
	if(cells[i % 100][(j + 1) % 100]) count++;		//i, j + 1
	if(cells[(i+1) % 100][(j + 1) % 100]) count++;	//i + 1, j + 1	
	if(cells[(i-1) % 100][(j + 1) % 100]) count++;	// i - 1, j + 1
	if(cells[(i+1) % 100][(j - 1) % 100]) count++;	// i + 1, j - 1
	if(cells[i % 100][(j - 1) % 100]) count++;		// i, j - 1
	if(cells[(i-1) % 100][(j - 1) % 100]) count++;	//i - 1, j - 1
	if(cells[(i+1) % 100][j % 100]) count++;		// i + 1, j
	if(cells[(i-1) % 100][j % 100]) count++;		// i - 1, j
	return count;
}

function update(dt){
	var temparr;
	if(isDown('UP') || isDown('W')){
		for(var i = 0; i < 100; i++){
			temparr = cells[i][0];
			for(var j = 0; j < 99; j++){
				cells[i][j] = cells[i][j + 1];
			}
			cells[i][99] = temparr;
		}
	}
	if(isDown('Down') || isDown('S')){
		for(var i = 0; i < 100; i++){
			temparr = cells[i][99];
			for(var j = 99; j > 0; j--){
				cells[i][j] = cells[i][j - 1];
			}
			cells[i][0] = temparr;
		}
	}
	if(isDown('Left') || isDown('A')){
		for(var i = 0; i < 100; i++){
			temparr = cells[0][i];
			for(var j = 0; j < 99; j++){
				cells[j][i] = cells[j + 1][i];
			}
			cells[99][i] = temparr; 
		}
	}
	if(isDown('Right') || isDown('D')){
		for(var i = 0; i < 100; i++){
			temparr = cells[99][i];
			for(var j = 99; j > 0; j--){
				cells[j][i] = cells[j - 1][i];
			}
			cells[0][i] = temparr;
		}
	}

	if(!playbutton_state){
		if(!first_start){
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					start_cells[i][j] = cells[i][j];
				}
			}
			first_start = true;
		}
		if(Math.floor(time * speedgame) != temptime){
		var newcolor = '#' + Math.random().toString(16).slice(2, 8);
			for (var i = 0; i < 100; i++) {
				for (var j = 0; j < 100; j++) {
					if(cells[i][j] != 0 && cells[i][j] != "white" && (found_cells(i, j) > 3 || found_cells(i, j) < 2)){
						cells2[i][j] = 0;
					}
					else if(cells[i][j] == 0 && found_cells(i, j) == 3){
						cells2[i][j] = newcolor;
					}else{
						cells2[i][j] = cells[i][j];
					}

				}
			}
			for (var i = 0; i < 100; i++) {
				for (var j = 0; j < 100; j++) {
					cells[i][j] = cells2[i][j];

				}
			}
		}
	temptime = Math.floor(time * speedgame);
	}
	if(temptime2 != Math.floor(time)){
		temptime2 = Math.floor(time);
		console.log(frames);
		frames = 0;
	}
	time += dt;
	frames += 1;
}

function render() {
	if(cell.x >= 0 && cell.y >= 0 && cell.x <= 100 && cell.y <= 100){ //Рисовка при движении мышкой
		if(mouse && !pastebutton_state){
			if(selectbutton_state){
				select_x2 = cell.x;
				select_y2 = cell.y;
			}else if(cell.x <= 99 && cell.y <= 99){
				if(type_pen % 3 == 0){
					cells[cell.x][cell.y] = "#FFFF00";
				}else if(type_pen % 3 == 1){
					cells[cell.x][cell.y] = "white";
				}else if(type_pen % 3 == 2){
					cells[cell.x][cell.y] = 0;
				}
			}
		}else if(pastebutton_state && !mouse){
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					mental_cells[i][j] = 0;
				}
			}
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					if(paste[type_paste][i][j] == "white"){
						mental_cells[(i + cell.x) % 100][(j + cell.y) % 100] = "purple";
					}else{
						mental_cells[(i + cell.x) % 100][(j + cell.y) % 100] = paste[type_paste][i][j];
					}
				}
			}
		}
	}
	
	
	if(select_x1 > select_x2){ //Расстановка углов прямоугольника выделения
		tempselect_x1 = select_x2;
		tempselect_x2 = select_x1;
	}else{
		tempselect_x1 = select_x1;
		tempselect_x2 = select_x2;
	}
	if(select_y1 > select_y2){
		tempselect_y1 = select_y2;
		tempselect_y2 = select_y1;
	}else{
		tempselect_y1 = select_y1;
		tempselect_y2 = select_y2;
	}
	
	context.fillStyle = "black";
	context.fillRect(0, 0, 1000, 1000);
	for(var i = 0; i < 100; i++){	//Прорисовка клеточек
		for(var j = 0; j < 100; j++){
			if(cells[i][j]){
				if(crazy_color > 0){
					context.fillStyle = context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
				}else{
					context.fillStyle = cells[i][j];		
				}
				context.fillRect(i * 10, j * 10, 10, 10);
			}
			
			if(mental_cells[i][j] && pastebutton_state){
				context.globalAlpha = 0.5;
				if(mental_cells[i][j] == "purple"){
					context.fillStyle = "white";
				}else{
					context.fillStyle = "#FFFF00";
				}
				context.fillRect(i * 10, j * 10, 10, 10);
				context.globalAlpha = 1;
			}
		}
	}

	context.lineWidth = "0.65";
	context.strokeStyle = "grey";
	for(var i = 0; i < 100; i++){	//Вертикальные
		context.beginPath();
		context.moveTo (i * 10, 0);
		context.lineTo(i * 10, 1000);
		context.stroke();
		context.closePath();
		context.beginPath(); //Горизонтальные
		context.moveTo (0, i * 10);
		context.lineTo(1000, i * 10);
		context.stroke();
		context.closePath();
	}
	if(select_finish)context.lineWidth = '2'; //Select area
	else context.lineWidth = "1";
	context.strokeStyle = "purple"; 
	context.globalAlpha = 0.5;
	context.fillStyle = "purple"
	context.fillRect(tempselect_x1*10, tempselect_y1*10, (tempselect_x2 - tempselect_x1)*10, (tempselect_y2 - tempselect_y1)*10);
	context.globalAlpha = 1;
	context.strokeRect(tempselect_x1*10, tempselect_y1*10, (tempselect_x2 - tempselect_x1)*10, (tempselect_y2 - tempselect_y1)*10);
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
$('canvas').css('height', 600);
$('canvas').css('width', 600);
last = Date.now();
game();
/*
	Количество живых клеток в данный момент
*/
}, false);