var temp_canvas = document.createElement('canvas');
temp_canvas.width = 1280;
temp_canvas.height = 1150;
var temp_context = temp_canvas.getContext('2d'); 
temp_context.translate(140, 50);
var shift = false;
var mouse = false;
var first_start = false;
var start_in_pause = false;
var end_battle = false;
var playbutton_state = true;
var selectbutton_state = false;
var pastebutton_state = false;
var symmetrybutton_state = false;
var select_finish = false;
var temp_horizontal_symmetry = false;
var temp_vertical_symmentry = false;
var horizontal_symmetry = false;
var vertical_symmetry = false;
var canvasWidth;
var canvasHeight;
var tempselect_x1, tempselect_x2, tempselect_y1, tempselect_y2;
var select_x1, select_y1, select_x2, select_y2;
var who_win = -1;
var max_cell_count = 0; //Максимальное количество клеточек
var start_cell_count = 0; //Стартовое количество клеточек
var cell_count = 0;//Количество клеточек в текущий момент
var cell_i = 0
var generation = 0;//Пройденых поколений
var cell_proportion = 0.5;
var cell_proportion_temp = 0.5;
var type_paste = "buffer";
var type_pen = 0;
var type_menu = "main";
var type_game = 0;
var active_player = 0;
var frames = 0;
var time = 0;
var temptime = 0;
var temptime2 = 0;
var speedgame = 1;
var crazy_color = 0;
var player = [];
var paste_size_min_x = -1;
var paste_size_max_x = -1;
var paste_size_min_y = -1;
var paste_size_max_y = -1;
player[0] = {
	count: 0,
	ok: false,
	color: "red",
	img: new Image(),
	timer: 120
	
}
player[1] = {
	count: 0,
	ok: false,
	color: "blue",
	img: new Image(),
	timer: 120
}

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
cells[0] = [];
cells_temp = [];
for(var i = 0; i < 100; i++){
	paste.buffer[i] = [];
	paste.gun[i] = [];
	start_cells[i] = []
	mental_cells[i] = [];
	cells_temp[i] = [];
	cells[0][i] = [];
}
for(var i = 0; i < 100; i++){
	for(var j = 0; j < 100; j++){
		start_cells[i][j] = 0;
		paste.buffer[i][j] = 0;
		paste.gun[i][j] = 0;
		mental_cells[i][j] = 0;
		cells_temp[i][j] = 0;
		cells[0][i][j] = 0;
	}
}	
player[0].img.src = "player1.jpg";
player[1].img.src = "player2.jpg";
var cof_x = 1;
var cof_y = 1;

paste.gun = [
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1],
[1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
[1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var color_gun = "#FFFF00";
for(var i = 0; i < 100; i++){
	if(typeof(paste.gun[i]) == "undefined") paste.gun[i] = [];
	for(var j = 0; j < 100; j++){
		if(typeof(paste.gun[i][j]) == "undefined") paste.gun[i][j] = 0;
		else if(paste.gun[i][j]) paste.gun[i][j] = color_gun;
	}
}