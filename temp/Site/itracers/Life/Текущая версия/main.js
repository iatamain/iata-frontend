document.addEventListener('DOMContentLoaded', function(){
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.translate(140, 50);


canvas.addEventListener('mousemove', function(e){
	cell.x = (e.pageX - e.target.offsetLeft) / cof_x - 140;
	cell.y = (e.pageY - e.target.offsetTop) / cof_y - 50;
	cell.x = Math.floor(cell.x / 10);
	cell.y = Math.floor(cell.y / 10);	
});
canvas.addEventListener('mousedown', function(e){
	mouse = true;
	cell.x = (e.pageX - e.target.offsetLeft) / cof_x - 140;
	cell.y = (e.pageY - e.target.offsetTop) / cof_y - 50;
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
					if(mental_cells[i][j]){
						if(type_game == 0){
							cells[cell_i][i][j] = mental_cells[i][j];
						}else if(type_game == 1){
							if(active_player == 0) cells[cell_i][i][j] = 'red';
							if(active_player == 1) cells[cell_i][i][j] = 'blue';	
						}
					}
				}
			}
			if(!e.shiftKey){
				for(var i = 0; i < 100; i++){
					for(var j = 0; j < 100; j++){
						mental_cells[i][j] = 0;
					}
				}
			}else{
				shift = true;
			}
		}
	}
});
canvas.addEventListener('mouseup', function(e){
	mouse = false;
	if(type_menu == "game"){
		if(cell.x >= 6 && cell.x <= 8 && cell.y >= -4 && cell.y <= -2){  //Play
			playBut();
		}else if(cell.x >= 1 && cell.x <= 3 && cell.y >= -4 && cell.y <= -2 && speedgame >= 0.125){ //Back arrow
			arrowBut(true);
		}else if(cell.x >= 11 && cell.x <= 13 && cell.y >= -4 && cell.y <= -2 && speedgame <= 32){ //Front arrow
			arrowBut(false);
		}else if(cell.x >= 16 && cell.x <= 18 && cell.y >= -4 && cell.y <= -2){ //Refresh
			refreshBut();
		}else if(cell.x >= 21 && cell.x <= 23 && cell.y >= -4 && cell.y <= -2){ //Pen
			penBut();
		}else if(cell.x >= 26 && cell.x <= 28 && cell.y >= -4 && cell.y <= -2){ //Сolors
			colorBut();
		}else if(cell.x >= 31 && cell.x <= 33 && cell.y >= -4 && cell.y <= -2){ //Gun
			gunBut();
		}else if(cell.x >= -12 && cell.x <= -3 && cell.y >= 1 && cell.y <= 3){  //Select
			selectBut();
		}else if(cell.x >= -14 && cell.x <= -2 && cell.y >= 5 && cell.y <= 7 && selectbutton_state){ //Copy
			copyBut();	
		}else if(cell.x >= -12 && cell.x <= -3 && cell.y >= 5 && cell.y <= 7 && !selectbutton_state){ //Paste
			pasteBut();
		}else if(cell.x >= -12 && cell.x <= -3 && cell.y >= 9 && cell.y <= 11 && selectbutton_state){ //Cut
			cutBut();
		}else if(cell.x >= -13 && cell.x <= -2 && cell.y >= 9 && cell.y <= 11 && !selectbutton_state && !pastebutton_state && type_game == 0){ //Symmetry
			symmentryBut();
		}else if(cell.x >= 102 && cell.x <= 111 && cell.y >= -4 && cell.y <= -2){
			chooseScene("main");
		}else if(cell.x > 56 && cell.x < 61  && cell.y >= 32 && cell.y <= 36 && symmetrybutton_state){//horizontal
			horizontalBut();
		}else if(cell.x > 56 && cell.x < 61  && cell.y >= 37 && cell.y <= 41 && symmetrybutton_state){//vertical
			verticalBut();
		}else if(cell.x >= 43 && cell.x <= 55  && cell.y >= 44 && cell.y <= 48 && symmetrybutton_state){//save symmetry
			saveSymmetryBut();
		}else if(cell.x >= 1 && cell.x <= 7 && cell.y >= 101 && cell.y <= 107 && type_game == 1){ //Выбор игрока 1
			choosePlayer(0);
		}else if(cell.x >= 92 && cell.x <= 98 && cell.y >= 101 && cell.y <= 107 && type_game == 1){ //Выбор игрока 2
			choosePlayer(1);
		}else if(cell.x >= 35 && cell.x <= 48  && cell.y >= 47 && cell.y <= 51 && type_game == 1 && end_battle){ //Еще раз после боя или в меню
			continueBut();
		}else if(cell.x >= 52 && cell.x <= 64 && cell.y >= 47 && cell.y <= 51 && type_game == 1 && end_battle){
			chooseScene("main");
		}else if(active_player == 0 && !player[0].ok || active_player == 1 && !player[1].ok){ //Готовность игрока
			if(cell.x >= 43 && cell.x <= 57  && cell.y >= 103  && cell.y <= 107){
				okBut();
			}
		}
	}
	else if(type_menu == "main"){
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 20 && cell.y <= 30){
			startBut(0);
		}else if(cell.x >= 30 && cell.x <= 70 && cell.y >= 33 && cell.y <= 43){
			startBut(1);
		}else if((cell.x >= 30 && cell.x <= 70 && cell.y >= 46 && cell.y <= 56) || (cell.x >= 30 && cell.x <= 70 && cell.y >= 59 && cell.y <= 69) || (cell.x >= 30 && cell.x <= 70 && cell.y >= 72 && cell.y <= 82)){
			chooseScene("pending");
		}else if(cell.x >= 30 && cell.x <= 70 && cell.y >= 85 && cell.y <= 95){ //Как играть?
			chooseScene("help");
		}
	}
	else if(type_menu == "pending" || type_menu == "help"){
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 95 && cell.y <= 1050){
			chooseScene("main");
		}
	}
	if(selectbutton_state){ //Select finishing
		if(select_x1 != select_x2 && select_y1 != select_y2){
			select_finish = true;
		}else{
			select_finish = false;
		}
	}
	if(!shift && pastebutton_state && cell.x >= 0 && cell.x <= 99 && cell.y >= 0 && cell.y <= 99){
		pastebutton_state = false;
	}
	shift = false;
});
function game(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(width/height > 1280 / 1150){
		$('canvas').css('height', height);
		$('canvas').css('width', height / 1150 * 1280);
		cof_y = height/1150
		cof_x = height / 1150;
	}
	else{
		$('canvas').css('width', width);
		$('canvas').css('height', width / 1280 * 1150);
		cof_x = (width / 1280 * 1150)/1150;
		cof_y = width / 1280;
	}
	var now = Date.now();
	var dt = (now - last)/1000;
	if(type_menu == "main" || type_menu == "pending" || type_menu == "help") render_menu();
	if(type_menu == "game"){
		update(dt);
		render_game();
	}
	last = now;
	requestAnimFrame(game);
}
function found_cells(i, j){
	i += 100;
	j += 100;
	var count = {
		summ: 0,
		red: 0,
		blue: 0
	}
	var temp_cell;
	var temp = 0;
	for(var ii = -1; ii <= 1; ii++){
		for(var jj = -1; jj <= 1; jj++){
			if(jj || ii){ 
				temp_cell = cells[cell_i][(i+ii) % 100][(j + jj) % 100];
				if(temp_cell){
					if(temp_cell == player[0].color) count.red++;
					if(temp_cell == player[1].color) count.blue++;
					count.summ++;
				}
			}
		}
	}
	return count;
}
function update(dt){
	if((player[0].timer || player[1].timer) && !isDown('CONTROL')){
		if(isDown('UP') || isDown('W')){	//Сдвиг вверх
			var temparr;
			if(type_game == 0){
				for(var i = 0; i < 100; i++){
					temparr = cells[cell_i][i][0];
					for(var j = 0; j < 99; j++){
						cells[cell_i][i][j] = cells[cell_i][i][j + 1];
					}
					cells[cell_i][i][99] = temparr;
				}
			}else if(type_game == 1 && active_player == 0){
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][i][0];
					for(var j = 0; j < 49; j++){
						cells[cell_i][i][j] = cells[cell_i][i][j + 1];
					}
					cells[cell_i][i][49] = temparr;
				}
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][i][50];
					for(var j = 50; j < 99; j++){
						cells[cell_i][i][j] = cells[cell_i][i][j + 1];
					}
					cells[cell_i][i][99] = temparr;
				}
			}
			else if(type_game == 1 && active_player == 1){
				if(!isDown("1"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][i][50];
					for(var j = 50; j < 99; j++){
						cells[cell_i][i][j] = cells[cell_i][i][j + 1];
					}
					cells[cell_i][i][99] = temparr;
				}
				if(!isDown("2"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][i][0];
					for(var j = 0; j < 49; j++){
						cells[cell_i][i][j] = cells[cell_i][i][j + 1];
					}
					cells[cell_i][i][49] = temparr;
				}
			}
		}
		if(isDown('Down') || isDown('S')){	//Сдвиг вниз
			var temparr;
			if(type_game == 0){
				for(var i = 0; i < 100; i++){
					temparr = cells[cell_i][i][99];
					for(var j = 99; j > 0; j--){
						cells[cell_i][i][j] = cells[cell_i][i][j - 1];
					}
					cells[cell_i][i][0] = temparr;
				}
			}else if(type_game == 1 && active_player == 0){
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][i][49];
					for(var j = 49; j > 0; j--){
						cells[cell_i][i][j] = cells[cell_i][i][j - 1];
					}
					cells[cell_i][i][0] = temparr;
				}
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][i][99];
					for(var j = 99; j > 50; j--){
						cells[cell_i][i][j] = cells[cell_i][i][j - 1];
					}
					cells[cell_i][i][50] = temparr;
				}
			}else if(type_game == 1 && active_player == 1){
				if(!isDown("2"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][i][49];
					for(var j = 49; j > 0; j--){
						cells[cell_i][i][j] = cells[cell_i][i][j - 1];
					}
					cells[cell_i][i][0] = temparr;
				}
				if(!isDown("1"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][i][99];
					for(var j = 99; j > 50; j--){
						cells[cell_i][i][j] = cells[cell_i][i][j - 1];
					}
					cells[cell_i][i][50] = temparr;
				}
			}
		}
		if(isDown('Left') || isDown('A')){ //Сдвиг влево
			var temparr;
			if(type_game == 0){
				for(var i = 0; i < 100; i++){
					temparr = cells[cell_i][0][i];
					for(var j = 0; j < 99; j++){
						cells[cell_i][j][i] = cells[cell_i][j + 1][i];
					}
					cells[cell_i][99][i] = temparr; 
				}
			}else if(type_game == 1 && active_player == 0){
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][0][i];
					for(var j = 0; j < 49; j++){
						cells[cell_i][j][i] = cells[cell_i][j + 1][i];
					}
					cells[cell_i][49][i] = temparr; 
				}
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][50][i];
					for(var j = 50; j < 99; j++){
						cells[cell_i][j][i] = cells[cell_i][j + 1][i];
					}
					cells[cell_i][99][i] = temparr; 
				}
			}else if(type_game == 1 && active_player == 1){
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][0][i];
					for(var j = 0; j < 49; j++){
						cells[cell_i][j][i] = cells[cell_i][j + 1][i];
					}
					cells[cell_i][49][i] = temparr; 
				}
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][50][i];
					for(var j = 50; j < 99; j++){
						cells[cell_i][j][i] = cells[cell_i][j + 1][i];
					}
					cells[cell_i][99][i] = temparr; 
				}
			}
		}
		if(isDown('Right') || isDown('D')){	//Сдвиг вправо
			var temparr;
			if(type_game == 0){
				for(var i = 0; i < 100; i++){
					temparr = cells[cell_i][99][i];
					for(var j = 99; j > 0; j--){
						cells[cell_i][j][i] = cells[cell_i][j - 1][i];
					}
					cells[cell_i][0][i] = temparr;
				}
			}else if(type_game == 1 && active_player == 0){
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][49][i];
					for(var j = 49; j > 0; j--){
						cells[cell_i][j][i] = cells[cell_i][j - 1][i];
					}
					cells[cell_i][0][i] = temparr;
				}
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][99][i];
					for(var j = 99; j > 50; j--){
						cells[cell_i][j][i] = cells[cell_i][j - 1][i];
					}
					cells[cell_i][50][i] = temparr;
				}
			}else if(type_game == 1 && active_player == 1){
				if(!isDown("1"))
				for(var i = 50; i < 100; i++){
					temparr = cells[cell_i][49][i];
					for(var j = 49; j > 0; j--){
						cells[cell_i][j][i] = cells[cell_i][j - 1][i];
					}
					cells[cell_i][0][i] = temparr;
				}
				if(!isDown("2"))
				for(var i = 0; i < 50; i++){
					temparr = cells[cell_i][99][i];
					for(var j = 99; j > 50; j--){
						cells[cell_i][j][i] = cells[cell_i][j - 1][i];
					}
					cells[cell_i][50][i] = temparr;
				}
			}
		}
	}
	if(!playbutton_state){	//Внесение нчального состояния
		if(!first_start){
			generation = 0;
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					start_cells[i][j] = cells[cell_i][i][j];
				}
			}
			first_start = true;
		}
		if(Math.floor(time * speedgame) != temptime){
			cell_count = 0;
			player[0].count = 0;
			player[1].count = 0;
			if(cell_i > 5){
				cells.splice(0, 1);
				cell_i--;
			}
			cells[cell_i + 1] = []; //Добавление двухмерного массива в последнюю ячейку
			for(var i = 0; i < 100; i++){
					cells[cell_i + 1][i] = [];
			}
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					cells[cell_i + 1][i][j] = cells_temp[i][j];
				}
			}
			
			
			var newcolor = '#' + Math.random().toString(16).slice(2, 8);
			for (var i = 0; i < 100; i++) { //Просчет нового поколения
				for (var j = 0; j < 100; j++) {
					how_found = found_cells(i, j);
					if(cells[cell_i][i][j] != 0 && cells[cell_i][i][j] != "white" && (how_found.summ > 3 || how_found.summ < 2)){
						cells[cell_i + 1][i][j] = 0;
					}
					else if(cells[cell_i][i][j] == 0 && how_found.summ == 3){
						cells[cell_i + 1][i][j] = newcolor;
						if(how_found.red > how_found.blue) cells[cell_i + 1][i][j] = 'red';
						else if(how_found.red < how_found.blue) cells[cell_i + 1][i][j] = 'blue';
					}else{
						cells[cell_i + 1][i][j] = cells[cell_i][i][j];
					}

				}
			}
			cell_i++;
			for (var i = 0; i < 100; i++) {
				for (var j = 0; j < 100; j++) {
					if(cells[cell_i][i][j]){
						cell_count++;
						if(cells[cell_i][i][j] == player[0].color) player[0].count++;
						else if(cells[cell_i][i][j] == player[1].color) player[1].count++;
					}
				}
			}
			if(player[0].count == player[1].count){
				cell_proportion_temp = 0.5;
			}else{
				cell_proportion_temp = Math.round((player[0].count/(player[0].count + player[1].count))*100)/100;
			}
			generation++;
			temptime = Math.floor(time * speedgame);
			if(!start_in_pause){
				cell_proportion = cell_proportion_temp;
			}
			start_in_pause = true;
			if(temptime % 30) end_battle = isEnd() || !player[0].count || !player[1].count || generation > 3000;
			if(end_battle && type_game == 1){
				playbutton_state = true;
				if(player[0].count > player[1].count){
					who_win = 0;
				}else if(player[0].count < player[1].count){
					who_win = 1;
				}else{
					who_win = -1;
				}
			}
		}
	}
	if(cell_proportion < cell_proportion_temp){
		cell_proportion += 0.0025;
	}else if(cell_proportion > cell_proportion_temp){
		cell_proportion -= 0.0025;
	}
	
	if(temptime2 != Math.floor(time)){
		if(player[active_player].timer){
			player[active_player].timer --
		}else if(playbutton_state && !generation){
			okBut();
		}
		console.log("fps: " + frames + "\nПоколение: " + generation + "\nСколько клеточек: " + cell_count + "\nКонец игры?: " + end_battle);
		frames = 0;
		temptime2 = Math.floor(time);
	}
	time += dt;
	frames++;
}
function render_game(){
	if(cell.x >= 0 && cell.y >= 0 && cell.x <= 100 && cell.y <= 100){ //Рисовка при движении мышкой
		if(mouse && !pastebutton_state && !symmetrybutton_state){ 
			if(selectbutton_state){
				select_x2 = cell.x;
				select_y2 = cell.y;
			}else if(cell.x <= 99 && cell.y <= 99){
				var color;
				var temp_x = Math.abs(cell.x-50);
				var temp_y = Math.abs(cell.y-50);
				if(type_game == 1){
					if(type_pen % 2 == 0){
						color = player[active_player].color;
					}else if(type_pen % 2 == 1){
						color = 0;
					}
				}else if(type_game == 0){
					if(type_pen % 3 == 0){
						if(type_game == 0) color = "#FFFF00";
					}else if(type_pen % 3 == 1){
						if(type_game == 0) color = "white";
					}else if(type_pen % 3 == 2){
						color = 0;
					}
				}
				if(type_game == 0 || (player[0].timer || player[1].timer) && (active_player == 0 && (cell.x < 50 && cell.y < 50 || cell.x >= 50 && cell.y >= 50) || active_player == 1 && (cell.x >= 50 && cell.y < 50 || cell.x < 50 && cell.y >= 50))){
					cells[cell_i][cell.x][cell.y] = color;
				}
				if(vertical_symmetry){
					if(cell.x <= 50) cells[cell_i][50 + temp_x - 1][cell.y] = color;
					else cells[cell_i][50 - temp_x - 1][cell.y] = color;
				}
				if(horizontal_symmetry){
					if(cell.y <= 50) cells[cell_i][cell.x][50 + temp_y - 1] = color;
					else cells[cell_i][cell.x][50 - temp_y - 1] = color;
				}
				if(horizontal_symmetry && vertical_symmetry){
					if(cell.x <= 50 && cell.y <= 50) cells[cell_i][50 + temp_x - 1][50 + temp_y - 1] = color;
					else if(cell.x > 50 && cell.y > 50) cells[cell_i][50 - temp_x - 1][50 - temp_y - 1] = color;
					else if(cell.x <= 50 && cell.y > 50) cells[cell_i][50 + temp_x - 1][50 - temp_y - 1] = color;
					else cells[cell_i][50 - temp_x - 1][50 + temp_y - 1] = color;
				}
			}
		}else if(pastebutton_state && !mouse && !symmetrybutton_state){ //Если активен режим вставки
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					mental_cells[i][j] = 0;
				}
			}
			for(var i = 0; i < 100; i++){
				for(var j = 0; j < 100; j++){
					if(type_game == 0){
						mental_cells[(i + cell.x) % 100][(j + cell.y) % 100] = paste[type_paste][i][j];
					}if(type_game == 1){
						if(active_player == 0 && (i + cell.x < 50 && j + cell.y < 50 || (i + cell.x) % 100 >= 50 && (j + cell.y) % 100 >= 50)){
							mental_cells[(i + cell.x) % 100][(j + cell.y) % 100] = paste[type_paste][i][j];
						}
						if(active_player == 1 && ((i + cell.x) % 100 >= 50 && j + cell.y < 50 || i + cell.x < 50 && (j + cell.y) % 100 >= 50)){
							mental_cells[(i + cell.x) % 100][(j + cell.y) % 100] = paste[type_paste][i][j];
						}
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
			if(cells[cell_i][i][j]){
				if(crazy_color > 0){
					context.fillStyle = context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
				}else{
					context.fillStyle = cells[cell_i][i][j];		
				}
				context.fillRect(i * 10, j * 10, 10, 10);
			}
			
			if(mental_cells[i][j] && pastebutton_state){
				context.globalAlpha = 0.5;
				if(type_game == 0) context.fillStyle = mental_cells[i][j];
				if(type_game == 1){
					if(active_player == 0) context.fillStyle = 'red';
					if(active_player == 1) context.fillStyle = 'blue';
				}
				context.fillRect(i * 10, j * 10, 10, 10);
				context.globalAlpha = 1;
			}
			
		}
	}
	
	context.drawImage(temp_canvas, -140, -50); //Прорисовка предпрорисовки
	
	if(select_finish)context.lineWidth = '2'; //Select area
	else context.lineWidth = "1";
	context.strokeStyle = "purple"; 
	context.globalAlpha = 0.5;
	context.fillStyle = "purple"
	context.fillRect(tempselect_x1*10, tempselect_y1*10, (tempselect_x2 - tempselect_x1)*10, (tempselect_y2 - tempselect_y1)*10);
	context.globalAlpha = 1;
	context.strokeRect(tempselect_x1*10, tempselect_y1*10, (tempselect_x2 - tempselect_x1)*10, (tempselect_y2 - tempselect_y1)*10);
		
	if(symmetrybutton_state){ //Прорисовка окна symmentry
		context.fillStyle = "black"; 
		context.strokeStyle = "white";
		context.lineWidth = '3';
		context.font = "25px Times New roman";
		context.fillRect(300, 300, 400, 200);
		context.strokeRect(300, 300, 400, 200);
		context.fillStyle = "white";
		if(cell.x > 56 && cell.x < 61  && cell.y >= 32 && cell.y <= 36) context.strokeStyle = "blue"; //Horizontal
		else context.strokeStyle = "white";
		context.strokeRect(570, 320, 40, 40);
		context.fillText("Горизонтальная:", 370, 350);
		if(cell.x > 56 && cell.x < 61  && cell.y >= 37 && cell.y <= 41) context.strokeStyle = "yellow"; //Vertical
		else context.strokeStyle = "white";
		context.strokeRect(570, 370, 40, 40);
		context.fillText("Вертикальная:", 370, 400);
		if(cell.x >= 43 && cell.x <= 55  && cell.y >= 44 && cell.y <= 48) context.strokeStyle = "green"; //Save
		else context.strokeStyle = "white";
		context.strokeRect(434, 442, 127, 40);
		context.fillText("Сохранить", 440, 470);
		if(temp_horizontal_symmetry)context.fillRect(574, 324, 32, 32);
		if(temp_vertical_symmentry) context.fillRect(574, 374, 32, 32);
	}
	if(end_battle && type_game == 1){//Прорисовка окна выигрыша
		context.fillStyle = "black"; 
		context.strokeStyle = "white";
		context.lineWidth = '3';
		context.font = "25px Times New roman";
		context.fillRect(300, 300, 400, 250);
		context.strokeRect(300, 300, 400, 250);
		if(who_win == 0){ 
			context.fillStyle = "red";
			context.fillText("Победил Игрок 1", 415, 340);
		}else if(who_win == 1){
			context.fillStyle = "blue";
			context.fillText("Победил Игрок 2", 415, 340);
		}else{
			context.fillStyle = "green";
			context.fillText("Ничья", 470, 340);
		}
		context.beginPath();
		context.moveTo(420, 350);
		context.lineTo(595, 350);
		context.stroke();
		context.closePath();
		context.fillStyle = "white";
		context.fillText("Красных клеток: " + player[0].count, 330, 400);
		context.fillText("Синих клеток: " + player[1].count, 330, 430);
		if(cell.x >= 35 && cell.x <= 48  && cell.y >= 47 && cell.y <= 51){ //Еще раз
			if(who_win == 0) context.strokeStyle = "red"; 
			else if(who_win == 1) context.strokeStyle = "blue"; 
			else context.strokeStyle = "green"; 
		}
		else context.strokeStyle = "white";
		context.strokeRect(354, 472, 127, 40);
		context.fillText("Еще раз", 373, 500);
		if(cell.x >= 52 && cell.x <= 64 && cell.y >= 47 && cell.y <= 51){ //В меню
			if(who_win == 0) context.strokeStyle = "red"; 
			else if(who_win == 1) context.strokeStyle = "blue"; 
			else context.strokeStyle = "green"; 
		}
		else context.strokeStyle = "white";
		context.strokeRect(520, 472, 127, 40);
		context.fillText("В меню", 542, 500);
	}
	
	context.fillStyle = "black"; //В меню
	context.fillRect(1020, -40, 100, 30);
	context.fillStyle = "white";
	if(cell.x >= 102 && cell.x <= 111 && cell.y >= -4 && cell.y <= -2 && mouse) context.fillStyle = "grey";
	context.font = "25px Times New roman";
	context.fillText("В меню", 1027, -17);
		
	context.fillStyle = "black";	//Arrow back
	context.fillRect(11, 10 - 50, 30, 30);
	if(mouse && cell.x >= 1 && cell.x <= 3 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	else context.fillStyle = "blue";
	context.beginPath(); 
	context.moveTo (25, 25 -50);	//first subarrow
	context.lineTo(35, 15 - 50);
	context.lineTo(35, 35 - 50);
	context.fill();
	context.moveTo (15, 25 - 50);	//second subarrow
	context.lineTo(25, 15 - 50);
	context.lineTo(25, 35 - 50);
	context.fill();
	context.closePath();
	
	context.fillStyle = "black"; //Play Button
	context.fillRect(60, 10 - 50, 30, 30);
	if(mouse && cell.x >= 6 && cell.x <= 8 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	else if(playbutton_state)context.fillStyle = "yellow";
	else context.fillStyle = "green";
	context.beginPath();			
	if(playbutton_state){
		context.moveTo (85, 25 - 50);
		context.lineTo(70, 15 - 50);
		context.lineTo(70, 35 - 50);
		context.fill();
	}else{
		context.fillRect(67, 18 - 50, 7, 15); 
		context.fillRect(77, 18 - 50, 7, 15);
		
	}
	context.closePath();

	
	context.fillStyle = "black";	//Arrow front
	context.fillRect(109, 10 - 50, 30, 30);
	if(mouse && cell.x >= 11 && cell.x <= 13 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	else context.fillStyle = "blue";
	context.beginPath();              
	context.moveTo (135, 25 - 50);	//first subarrow
	context.lineTo(125, 15 - 50);
	context.lineTo(125, 35 - 50);
	context.fill();
	context.moveTo (125, 25 - 50);	//second subarrow
	context.lineTo(115, 15 - 50);
	context.lineTo(115, 35 - 50);
	context.fill();
	context.closePath();
	
	context.beginPath(); //Restore
	context.fillStyle = "black";	
	context.fillRect(159, 10 - 50, 30, 30);
	if(mouse && cell.x >= 16 && cell.x <= 18 && cell.y >= -4 && cell.y <= -2){
		context.fillStyle = "grey";
		context.strokeStyle = "grey";
	}
	else {
		context.fillStyle = "red";
		context.strokeStyle = "red";
	}
	context.lineWidth = 3;
	context.arc(174, 25 -50, 8, 0.5, 2*3.14 - 1, false);
	context.stroke();
	context.lineWidth = 1;
	context.closePath()
	context.beginPath();
	context.moveTo(33+ 74 + 74, 13 - 50); //arrow refresh
	context.lineTo(36+ 74 + 74, 24 - 50);
	context.lineTo (26 + 148, 24 - 50);	
	context.fill();
	context.closePath();
	
	context.beginPath(); //Pen, NondeadPen, Eraser
	context.fillStyle = "black";
	context.fillRect(209, 10 - 50, 30, 30);
	if(mouse && cell.x >= 21 && cell.x <= 23 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	else context.fillStyle = "white";
	context.fillRect(221 - 3, 13 - 50, 6, 18);
	context.moveTo(221 - 3, 13 + 18 - 50);
	context.lineTo(221 - 3 + 6, 13+18 - 50);
	context.lineTo (221  - 3 + 3, 13 + 24 - 50);
	context.fill();
	context.closePath();
	if(type_game == 1){
		if(type_pen % 2 == 0){
			context.fillStyle = player[active_player].color;
			context.fillRect(227, 13 - 50, 6, 6);
		}else if(type_pen % 2 == 1){
			context.strokeStyle = "grey";
			context.strokeRect(227, 13 - 50, 6, 6);
		}
	}else if(type_game == 0){
		if(type_pen % 3 == 0){
			context.fillStyle = "yellow";
			context.fillRect(227, 13 - 50, 6, 6);
		}else if(type_pen % 3 == 1){
			context.fillStyle = "white";
			context.fillRect(227, 13 - 50, 6, 6);
		}else if(type_pen % 3 == 2){
			context.strokeStyle = "grey";
			context.strokeRect(227, 13 - 50, 6, 6);
		}
	}
	
	context.fillStyle = "black"; //Randomizer color
	context.fillRect(259, 10 - 50, 30, 30);
	context.beginPath();
	context.fillStyle = "yellow";
	if(crazy_color > 0) context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
	if(mouse && cell.x >= 26 && cell.x <= 28 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	context.arc(174+107, 25 - 50, 3, 0, 2*3.141592, false);
	context.fill();
	context.closePath();
	context.beginPath();
	context.fillStyle = "blue";
	if(crazy_color > 0) context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
	if(mouse && cell.x >= 26 && cell.x <= 28 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	context.arc(174+93, 25 - 50, 3, 0, 2*3.141592, false);
	context.fill();
	context.closePath();
	context.beginPath();
	context.fillStyle = "green";
	if(crazy_color > 0) context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
	if(mouse && cell.x >= 26 && cell.x <= 28 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	context.arc(174+100, 18 - 50, 3, 0, 2*3.141592, false);
	context.fill();
	context.closePath();
	context.beginPath();
	context.fillStyle = "red";
	if(crazy_color > 0) context.fillStyle = '#' + Math.random().toString(16).slice(2, 8);
	if(mouse && cell.x >= 26 && cell.x <= 28 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	context.arc(174+100, 32 - 50, 3, 0, 2*3.141592, false);
	context.fill();
	context.closePath();
	
	context.fillStyle = "black"; //Gun
	context.fillRect(309, 10 - 50, 30, 30);
	context.fillStyle = "white";
	if(mouse && cell.x >= 31 && cell.x <= 33 && cell.y >= -4 && cell.y <= -2) context.fillStyle = "grey";
	context.fillRect(309 + 7, 18 - 50, 7, 15); 
	context.fillRect(309 + 7, 18 - 50, 15, 7);
	
	context.fillStyle = "black"; //Select
	context.fillRect(-127, 5, 112, 30);
	if(selectbutton_state) context.fillStyle = "#AF00FF";
	else context.fillStyle = "white";
	if(cell.x >= -12 && cell.x <= -3 && cell.y >= 1 && cell.y <= 3 && mouse) context.fillStyle = "grey";
	context.font = "25px Times New roman";
	context.fillText("Выделить", -125, 28);
	
	if(select_finish && selectbutton_state){
		context.fillStyle = "black"; //Copy
		context.fillRect(-137, 45, 130, 30);
		context.fillStyle = "white";
		if(cell.x >= -14 && cell.x <= -2 && cell.y >= 5 && cell.y <= 7 && mouse) context.fillStyle = "grey";
		context.font = "25px Times New roman";
		context.fillText("Копировать", -135, 68);
		
		context.fillStyle = "black"; //Cut
		context.fillRect(-125, 85, 107, 30);
		context.fillStyle = "white";
		if(cell.x >= -12 && cell.x <= -3 && cell.y >= 9 && cell.y <= 11 && mouse) context.fillStyle = "grey";
		context.font = "25px Times New roman";
		context.fillText("Вырезать", -123, 108);
	}else if(selectbutton_state){
		context.fillStyle = "black";
		context.font = "20px Times New roman";
		context.fillText("Выделите", -113, 60);
		context.fillText("область", -103, 80);
	}else{
		context.fillStyle = "black"; //Paste
		context.fillRect(-126, 45, 109, 30);
		if(pastebutton_state) context.fillStyle = "#AF00FF";
		else context.fillStyle = "white";
		if(cell.x >= -12 && cell.x <= -3 && cell.y >= 5 && cell.y <= 7 && mouse) context.fillStyle = "grey";
		context.font = "25px Times New roman";
		context.fillText("Вставить", -122, 68);
	}
	if(!selectbutton_state && !pastebutton_state && type_game == 0){ //Symmetry
		context.fillStyle = "black";  
		context.fillRect(-131, 85, 120, 30);
		context.fillStyle = "white";
		if(cell.x >= -13 && cell.x <= -2 && cell.y >= 9 && cell.y <= 11 && mouse) context.fillStyle = "grey";
		context.font = "22px Times New roman";
		context.fillText("Симметрия", -124, 108);
	}
	
	
	if(type_game == 1){
		if(active_player == 0 && !player[0].ok || active_player == 1 && !player[1].ok){ //Кнопочка
			if(cell.x >= 43 && cell.x <= 57  && cell.y >= 103  && cell.y <= 107) context.strokeStyle = "green"; 
			else context.strokeStyle = "white";
			context.fillStyle = "black";
			context.fillRect(434, 972 + 60, 147, 40);
			context.strokeRect(434, 972 + 60, 147, 40);
			context.fillStyle = "white";
			context.fillText("Готов (" + player[active_player].timer + ")", 450, 1060);
			
		}
		if(!playbutton_state || end_battle){	//Баланс
			context.fillStyle = "Blue"; 
			context.fillRect(130, 1025, 740, 50);
			context.fillRect(925, 1010, 65, 65);
			context.fillStyle = "Red";
			context.fillRect(130, 1025, cell_proportion*740, 50);
			context.fillRect(10, 1010, 65, 65);
			if(cell_proportion > 0.5) context.strokeStyle = "DarkRed";
			else if(cell_proportion < 0.5) context.strokeStyle = "DarkBlue";
			else context.strokeStyle = "DarkGreen";
			context.lineWidth = "3";
			context.beginPath();
			context.moveTo(500, 1020);
			context.lineTo(500, 1080);
			context.stroke();
			context.closePath();
		}
		context.fillStyle = "Black";
		context.font = "20px Times New roman";
		context.fillText("Игрок1" ,10, 1093)
		context.fillText("Игрок2" ,925, 1093)
		context.drawImage(player[0].img, 13, 1013, 59, 59);
		context.drawImage(player[1].img, 928, 1013, 59, 59);
		if(player[0].ok){ //Обводка первого игрока
			context.strokeStyle = "green";
			context.lineWidth = "2";
			context.strokeRect(8, 1008, 69, 69);
		}
		if(player[1].ok){ //Обводка второго игрока 
			context.strokeStyle = "green";
			context.lineWidth = "2";
			context.strokeRect(923, 1008, 69, 69);
		}
		if(cell.x >= 1 && cell.x <= 7 && cell.y >= 101 && cell.y <= 107){ //Стрелочка над первым игроком
			context.fillStyle = "green";
			var x = 5;
			var y = 0;
			context.beginPath();
			context.moveTo(25, 990);
			context.lineTo(55, 990);
			context.lineTo(40, 1010);
			context.fill();
			context.closePath();
		}
		if(cell.x >= 92 && cell.x <= 98 && cell.y >= 101 && cell.y <= 107){	//Стрелочка над вторым игроком
			context.fillStyle = "green";
			var x = 922;
			var y = 0;
			context.beginPath();
			context.moveTo(20 + x, 990);
			context.lineTo(50 + x, 990);
			context.lineTo(35 + x, 1010);
			context.fill();
			context.closePath();
		}
		
	}
	context.fillStyle = "white"; //Скорость игры
	context.font = "30px Times New roman";
	context.fillText("Скорость", 1010, 30);
	context.fillText("игры", 1035, 60);
	//context.fillText(speedgame, 1060, 90);
	var x;
	if((speedgame + "").length == 1) x = 1060;
	if((speedgame + "").length == 2) x = 1050;
	if((speedgame + "").length == 3) x = 1047;
	if((speedgame + "").length == 4) x = 1040;
	if((speedgame + "").length == 5) x = 1033;
	if((speedgame + "").length == 6) x = 1025;
	context.fillText(speedgame, x, 90);
}
function render_menu(){
	if(type_menu == "main"){
		context.fillStyle = "black";
		context.fillRect(-140, - 50, 1280, 1150);
		context.lineWidth = 4;
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 20 && cell.y <= 30) context.strokeStyle = "yellow";
		else context.strokeStyle = "white";
		context.strokeRect(300, 200, 400, 100); //Творческий режим
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 33 && cell.y <= 43) context.strokeStyle = "green";
		else context.strokeStyle = "white";
		context.strokeRect(300, 330, 400, 100); //Игра на двоих
		context.strokeStyle = "white";
		context.strokeRect(300, 460, 400, 100); //Рейтинг
		context.strokeStyle = "white";
		context.strokeRect(300, 590, 400, 100);	//Магазиг
		context.strokeStyle = "white";
		context.strokeRect(300, 720, 400, 100);	//Достижения
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 85 && cell.y <= 95) context.strokeStyle = "darkorange";
		else context.strokeStyle = "white";
		context.strokeRect(300, 850, 400, 100); //Как играть?
		context.fillStyle = "green";
		context.font = "90px Times New roman";
		context.fillText("Жизнь", 380, 100); 
		context.fillStyle = "white";
		context.font = "40px Times New roman";
		context.fillText("Творческий режим", 336, 260); //Творческий режим
		context.fillText("Битва", 442, 390);	//Игра на двоих
		context.fillText("Рейтинг", 426, 520);	//Рейтинг
		context.fillText("Магазин", 426, 650);	//Магазин
		context.fillText("Достижения", 397, 790); //Достижения
		context.fillText("Как играть?", 403, 920); //Как играть?
	}
	if(type_menu == "pending"){
		context.fillStyle = "black";
		context.fillRect(-140, - 50, 1280, 1150);
		context.lineWidth = 4;
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 95 && cell.y <= 1050) context.strokeStyle = "yellow";
		else context.strokeStyle = "white";
		context.strokeRect(300, 950, 400, 100); 
		context.fillStyle = "white"; 
		context.font = "100px Times New roman";
		context.fillText("В разработке", 226, 500);
		context.font = "40px Times New roman";
		context.fillText("В меню", 426, 1010);		
	}
	if(type_menu == "help"){
		context.fillStyle = "black";
		context.fillRect(-140, - 50, 1280, 1150);
		context.lineWidth = 4;
		if(cell.x >= 30 && cell.x <= 70 && cell.y >= 95 && cell.y <= 1050) context.strokeStyle = "yellow";
		else context.strokeStyle = "white";
		context.strokeRect(300, 950, 400, 100); 
		context.fillStyle = "white";
		context.font = "40px Times New roman";
		context.fillText("В меню", 426, 1010); 
		context.fillText("Ctrl + A — Выделить все", -70, 210); 
		context.fillText("Ctrl + X — Вырезать", -70, 270); 
		context.fillText("Ctrl + С — Копировать", -70, 270+60); 
		context.fillText("Ctrl + V — Вставть", -70, 270+120); 
		context.fillText("R — Очистить", -70, 270+180); 
		context.fillText("W (↑), A (←), S (↓), D (→) — Сдвиг поля", -70, 270+240); 
		context.font = "90px Times New roman";
		context.fillText("Горячие клавиши и сочетания:", -80, 100); 
	}
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
last = Date.now();
game();  
}, false);
/*	
	Разворот фигуры
	Количество живых клеток в данный момент
	Макисмальное количество клеток
	Начальное количество клеток
	Текущее поколение
	Меню со сменой режима игры, где нужно будет обнулять симметрию
	Исправить баг с сеткой
	Больше фигур
*/