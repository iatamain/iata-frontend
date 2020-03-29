var x = 0;
var y = 12;
var color_gun = "#FFFF00";
paste.gun[x][y] = color_gun;
paste.gun[x + 1][y] = color_gun;
paste.gun[x][y + 1] = color_gun;
paste.gun[x + 1][y + 1] = color_gun;

paste.gun[x + 11][y] = color_gun;
paste.gun[x + 11][y + 1] = color_gun;
paste.gun[x + 11][y + 2] = color_gun;
paste.gun[x + 12][y + 3] = color_gun;
paste.gun[x + 13][y + 4] = color_gun;
paste.gun[x + 14][y + 3] = color_gun;
paste.gun[x + 15][y + 2] = color_gun;
paste.gun[x + 15][y + 1] = color_gun;
paste.gun[x + 15][y] = color_gun;
paste.gun[x + 16][y + 2] = color_gun;
paste.gun[x + 16][y + 1] = color_gun;
paste.gun[x + 16][y] = color_gun;
paste.gun[x + 12][y - 1] = color_gun;
paste.gun[x + 13][y - 2] = color_gun;
paste.gun[x + 14][y - 1] = color_gun;

paste.gun[x + 21][y] = color_gun;
paste.gun[x + 21][y - 1] = color_gun;
paste.gun[x + 21][y - 2] = color_gun;
paste.gun[x + 22][y] = color_gun;
paste.gun[x + 23][y] = color_gun;
paste.gun[x + 24][y] = color_gun;
paste.gun[x + 22][y - 2] = color_gun;
paste.gun[x + 23][y - 2] = color_gun;
paste.gun[x + 24][y - 2] = color_gun;
paste.gun[x + 24][y - 1] = color_gun;
paste.gun[x + 22][y - 3] = color_gun;
paste.gun[x + 23][y - 3] = color_gun;
paste.gun[x + 24][y - 3] = color_gun;
paste.gun[x + 25][y - 3] = color_gun;
paste.gun[x + 25][y - 4] = color_gun;
paste.gun[x + 22][y + 1] = color_gun;
paste.gun[x + 23][y + 1] = color_gun;
paste.gun[x + 24][y + 1] = color_gun;
paste.gun[x + 25][y + 1] = color_gun;
paste.gun[x + 25][y + 2] = color_gun;

paste.gun[x + 34][y - 1] = color_gun;
paste.gun[x + 34][y - 2] = color_gun;
paste.gun[x + 35][y - 1] = color_gun;
paste.gun[x + 35][y - 2] = color_gun;

paste.gun[x + 6][y - 10] = color_gun;
paste.gun[x + 6][y - 11] = color_gun;
paste.gun[x + 7][y - 11] = color_gun;
paste.gun[x + 6][y - 8] = color_gun;
paste.gun[x + 6][y - 7] = color_gun;
paste.gun[x + 8][y - 7] = color_gun;
paste.gun[x + 9][y - 7] = color_gun;
paste.gun[x + 9][y - 9] = color_gun;
paste.gun[x + 7][y - 9] = 'white';
paste.gun[x + 8][y - 9] = 'white';
paste.gun[x + 7][y - 8] = 'white';
paste.gun[x + 8][y - 8] = 'white';

function speed(param){
	if(param && speedgame <= 32){
		speedgame *= 2;
	}else if(speedgame >= 0.125){
		speedgame /= 2;
	}
}
function play(){
	playbutton_state = !playbutton_state;
}
function stop(){
	playbutton_state = true;
	first_start = false;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			cells[i][j] = start_cells[i][j];
			cells2[i][j] = 0;
		}
	}
}
function pen(){
	type_pen++;
}
function stylee(){
	crazy_color = (crazy_color + 1) % 2;
	
}
function setFigure(type){
	type_paste = type;
	selectbutton_state = false;
	select_finish = false;
	select_x1 = 0;
	select_x2 = 0;
	select_y1 = 0;
	select_y2 = 0;						
	pastebutton_state = !pastebutton_state;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			if(paste[type_paste][i][j] == "white"){
				mental_cells[i][j] = "purple"
			}else{
				mental_cells[i][j] = paste[type_paste][i][j];
			}
		}
	}
}
function selectt(){
	selectbutton_state = !selectbutton_state;
	if(!selectbutton_state){
		select_finish = false;
		select_x1 = 0;
		select_x2 = 0;
		select_y1 = 0;
		select_y2 = 0;
	}
}
function copy(){
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
				paste.buffer[i - tempselect_x1][j - tempselect_y1] = cells[i][j];
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
function pastee(){
	type_paste = "buffer";
	pastebutton_state = !pastebutton_state;
	for(var i = 0; i < 100; i++){
		for(var j = 0; j < 100; j++){
			if(paste[type_paste][i][j] == "white"){
				mental_cells[i][j] = "purple"
			}else{
				mental_cells[i][j] = paste[type_paste][i][j];
			}
		}
	}
}
function cut(){
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
			paste.buffer[i - tempselect_x1][j - tempselect_y1] = cells[i][j];
			cells[i][j] = 0;
			cells2[i][j] = 0;
		}
	}
	select_finish = false;
	selectbutton_state = false;
	select_x1 = 0;
	select_x2 = 0;
	select_y1 = 0;
	select_y2 = 0;
}
