var pressedKeys = {};
function setKey(event, status) {
	var code = event.keyCode;
	var key;
	switch(code) {
		case 17:
			key = 'CONTROL';
			break;
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
	if(type_menu == "game"){
		if(e.keyCode == 82) clearBut();
		if(e.keyCode == 67 && e.ctrlKey) copyBut();
		if(e.keyCode == 86 && e.ctrlKey) pasteBut();
		if(e.keyCode == 88 && e.ctrlKey) cutBut();
		if(e.keyCode == 65 && e.ctrlKey) selectAllBut();
	}
	if(e.keyCode == 27) chooseScene("main");
	console.log(e);
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
function preRender(){
	temp_context.clearRect(0, 0, 1220, 1150);
	temp_context.strokeStyle = 'green'; //Прорисовка симметричных линий
	temp_context.lineWidth = '1';
	if(horizontal_symmetry){ 
		temp_context.beginPath();
		temp_context.moveTo(0, 500);
		temp_context.lineTo(1000, 500);
		temp_context.stroke();
		temp_context.closePath();
	}
	if(vertical_symmetry){
		temp_context.beginPath();
		temp_context.moveTo(500, 0);
		temp_context.lineTo(500, 1000);
		temp_context.stroke();
		temp_context.closePath();
	}
	var my_gradient = temp_context.createLinearGradient(0,0,0,1000); //Панелька
	my_gradient.addColorStop(0,"grey");
	my_gradient.addColorStop(1,"lightblue");
	temp_context.fillStyle = my_gradient;
	temp_context.fillRect(0, -50, 1100, 50);
	temp_context.fillRect(-140, -50, 140, 1150);
	temp_context.fillRect(1000, -50, 140, 1150);
	temp_context.fillRect(-140, 1000, 1240, 100);
	
	temp_context.fillStyle = "DarkGreen";
	temp_context.font = "40px Times New roman";
	temp_context.fillText("Жизнь", -127, 38 - 50); //Жизнь
	
	temp_context.lineWidth = "0.65";
	temp_context.strokeStyle = "grey";
	if(type_game == 0 || !playbutton_state || player[0].ok && player[1].ok){
		for(var i = 0; i < 100; i++){	//Вертикальные
			temp_context.beginPath();
			temp_context.moveTo (i * 10, 0);
			temp_context.lineTo(i * 10, 1000);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath(); //Горизонтальные
			temp_context.moveTo (0, i * 10);
			temp_context.lineTo(1000, i * 10);
			temp_context.stroke();
			temp_context.closePath();
		}
	}else if(type_game == 1 && active_player == 0){
		for(var i = 0; i < 51; i++){	
			temp_context.beginPath();	//Вертикальные
			temp_context.moveTo (i * 10, 0);
			temp_context.lineTo(i * 10, 500);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Горизонтальные
			temp_context.moveTo (0, i * 10);
			temp_context.lineTo(500, i * 10);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Вертикальные
			temp_context.moveTo ((i + 50) * 10, 500);
			temp_context.lineTo((i + 50) * 10, 1000);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Горизонтальные
			temp_context.moveTo (500, (i + 50) * 10);
			temp_context.lineTo(1000, (i + 50) * 10);
			temp_context.stroke();
			temp_context.closePath();
		}
		var my_gradient = temp_context.createLinearGradient(0,0,0,1000); //Серые квадраты
		my_gradient.addColorStop(0,"grey");
		my_gradient.addColorStop(1,"lightblue");
		temp_context.fillStyle = my_gradient;
		temp_context.fillRect(500, 0, 500, 500);
		temp_context.fillRect(0, 500, 500, 500);
		
		temp_context.lineWidth = "2"; //Красная обводка
		temp_context.strokeStyle = "red";
		temp_context.strokeRect(0, 0, 500, 500);
		temp_context.strokeRect(500, 500, 500, 500);
	}else if( type_game == 1 && active_player == 1){
		for(var i = 0; i < 51; i++){	
			temp_context.beginPath();	//Вертикальные
			temp_context.moveTo (i * 10, 500);
			temp_context.lineTo(i * 10, 1000);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Горизонтальные
			temp_context.moveTo (500, i * 10);
			temp_context.lineTo(1000, i * 10);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Вертикальные
			temp_context.moveTo ((i + 50) * 10, 0);
			temp_context.lineTo((i + 50) * 10, 500);
			temp_context.stroke();
			temp_context.closePath();
			temp_context.beginPath();	//Горизонтальные
			temp_context.moveTo (0, (i + 50) * 10);
			temp_context.lineTo(500, (i + 50) * 10);
			temp_context.stroke();
			temp_context.closePath();
		}
		var my_gradient = temp_context.createLinearGradient(0,0,0,1000); //Сервые квадраты
		my_gradient.addColorStop(0,"grey");
		my_gradient.addColorStop(1,"lightblue");
		temp_context.fillStyle = my_gradient;
		temp_context.fillRect(0, 0, 500, 500);
		temp_context.fillRect(500, 500, 500, 500);
		
		temp_context.lineWidth = "2";
		temp_context.strokeStyle = "blue";
		temp_context.strokeRect(0, 500, 500, 500);
		temp_context.strokeRect(500, 0, 500, 500);
	}
	temp_context.strokeStyle = 'black'; //Прорисовка ободка игры
	temp_context.lineWidth = '1';
	temp_context.strokeRect(-1, -1, 1001, 1001);
}
function playBut(){
	if(type_game == 1){
		player[0].ok = true;
		player[0].timer = 0;
		player[1].ok = true;
		player[1].timer = 0;
	}
	start_in_pause = false;
	playbutton_state = !playbutton_state;
	preRender();
}
function arrowBut(arg){
	if(arg){
		if(speedgame >= 0.125) speedgame /= 2;
	}else{
		if(speedgame <= 32) speedgame *= 2;
	}
} 
function refreshBut(){
	playbutton_state = true;
	continueBut();
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			cells[cell_i][i][j] = start_cells[i][j];
		}
	}
}
function penBut(){
	type_pen++;
}
function colorBut(){
	crazy_color = (crazy_color + 1) % 2;
}
function gunBut(){
	type_paste = "gun";
	selectbutton_state = false;
	select_finish = false;
	select_x1 = 0;
	select_x2 = 0;
	select_y1 = 0;
	select_y2 = 0;						
	pastebutton_state = !pastebutton_state;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			mental_cells[i][j] = paste.gun[i][j]
		}
	}
}
function selectBut(){ //Выделить
	selectbutton_state = !selectbutton_state;
	pastebutton_state = false;
	if(!selectbutton_state){
		select_finish = false;
		select_x1 = 0;
		select_x2 = 0;
		select_y1 = 0;
		select_y2 = 0;
	}
}
function selectAllBut(){ //Выделить все
	selectBut();
	if(selectbutton_state){
		select_finish = true;
		select_x1 = 0;
		select_x2 = 100;
		select_y1 = 0;
		select_y2 = 100;
	}
}
function clearBut(){ //Очистить область
	if(select_finish){
		if(select_x1 > select_x2){
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
		for(var i = tempselect_x1; i < tempselect_x2; i++){
			for(var j = tempselect_y1; j < tempselect_y2; j++){
				if(type_game == 0 || ((i < 50 && j < 50 || i >= 50 && j >= 50) && active_player == 0) || ((i < 50 && j >= 50 || i >= 50 && j < 50) && active_player == 1)){
					cells[cell_i][i][j] = 0;
				}
			}
		}
		select_finish = false;
		selectbutton_state = false;
		select_x1 = 0;
		select_x2 = 0;
		select_y1 = 0;
		select_y2 = 0;
	}else{
		selectAllBut();
		clearBut();
	}
}
function copyBut(){ //Копировать
	if(select_finish){
		if(select_x1 > select_x2){
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
		for(var i = 0; i < 100; i++){
			for(var j = 0; j < 100; j++){
				paste.buffer[i][j] = 0;
			}
		}
		for(var i = tempselect_x1; i < tempselect_x2; i++){
			for(var j = tempselect_y1; j < tempselect_y2; j++){
				if(type_game == 0 || ((i < 50 && j < 50 || i >= 50 && j >= 50) && active_player == 0) || ((i < 50 && j >= 50 || i >= 50 && j < 50) && active_player == 1)){
					paste.buffer[i - tempselect_x1][j - tempselect_y1] = cells[cell_i][i][j];
				}
			}
		}
		select_finish = false; //Снять выделение
		selectbutton_state = false;
		select_x1 = 0;
		select_x2 = 0;
		select_y1 = 0;
		select_y2 = 0;
	}
}
function pasteBut(){ //Вставить
	type_paste = "buffer";
	pastebutton_state = !pastebutton_state;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			mental_cells[i][j] = paste[type_paste][i][j];
		}
	}
}
function cutBut(){ //Вырезать
	if(select_finish){
		if(select_x1 > select_x2){
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
		for(var i = 0; i < 100; i++){
			for(var j = 0; j < 100; j++){
				paste.buffer[i][j] = 0;
			}
		}
		
		for(var i = tempselect_x1; i < tempselect_x2; i++){
			for(var j = tempselect_y1; j < tempselect_y2; j++){
				if(type_game == 0 || ((i < 50 && j < 50 || i >= 50 && j >= 50) && active_player == 0) || ((i < 50 && j >= 50 || i >= 50 && j < 50) && active_player == 1)){
					paste.buffer[i - tempselect_x1][j - tempselect_y1] = cells[cell_i][i][j];
					cells[cell_i][i][j] = 0;
				}
			}
		}
		select_finish = false;
		selectbutton_state = false;
		select_x1 = 0;
		select_x2 = 0;
		select_y1 = 0;
		select_y2 = 0;
	}
}
function symmentryBut(){ //Кнопка вызова окна настроек симметрии
	symmetrybutton_state = true;
}
function horizontalBut(){ //Горизонтальная симметрия
	temp_horizontal_symmetry = !temp_horizontal_symmetry;
}
function verticalBut(){ //Вертикальная симметрия
	temp_vertical_symmentry = !temp_vertical_symmentry;
}
function saveSymmetryBut(){ //Кнопка созранения настроек симметрии
	vertical_symmetry = temp_vertical_symmentry;
	horizontal_symmetry = temp_horizontal_symmetry;
	symmetrybutton_state = false;
	preRender();
}
function continueBut(){ //Кнопка продолжения после победы после победы
	cells.splice(1, cell_i - 1);
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			cells[0][i][j] = 0;
		}
	}
	cell_i = 0;
	end_battle = false;
	first_start = false;
	start_in_pause = false;
	player[0].ok = false;
	player[0].timer = 120;
	player[1].ok = false;
	player[1].timer = 120;
	who_win = -1;
	generation = 0;
	preRender();
}
function choosePlayer(arg){  //Смена игрока 
	if(!player[arg].ok){
		active_player = arg;
		preRender();
	}
}
function okBut(){ //Кнопка подтверждения готовности
	player[active_player].ok = true;
	player[active_player].timer = 0;
	choosePlayer((active_player + 1) % 2)
	if(player[0].ok && player[1].ok){
		playBut();
	}
}
function isEnd(){ //Проверка на зацикленность игры
	for(var k = 1; k <= cell_i; k++){
		var flag = false;
		for(var i = 0; i < 100; i++){
			for(var j = 0; j < 100; j++){
				if(cells[cell_i - k][i][j] != cells[cell_i][i][j]) flag = true
			}
		}
		if(!flag){
			return true;
		}
	}
	return false;
}
/*Кнопки для меню*/
function startBut(arg){ //Начать игру
	type_game = arg;
	type_menu = "game";
	first_start = false;
	start_in_pause = false;
	end_battle = false;
	playbutton_state = true;
	selectbutton_state = false;
	pastebutton_state = false;
	symmetrybutton_state = false;
	select_finish = false;
	temp_horizontal_symmetry = false;
	temp_vertical_symmentry = false;
	horizontal_symmetry = false;
	vertical_symmetry = false;
	who_win = -1;
	max_cell_count = 0;
	start_cell_count = 0;
	cell_count = 0;
	cell_i = 0
	generation = 0;
	cell_proportion = 0.5;
	type_pen = 0;
	active_player = 0;
	time = 0;
	temptime = 0;
	temptime2 = 0;
	speedgame = 1;
	crazy_color = 0;
	player[0].count = 0;
	player[0].ok = false;
	player[0].timer = 120;
	player[1].count = 0;
	player[1].ok = false;
	player[1].timer = 120;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			cells[0][i][j] = 0;
		}
	}
	preRender();
}
function chooseScene(arg){ //Выбор сцены
	type_menu = arg;
}
preRender();
