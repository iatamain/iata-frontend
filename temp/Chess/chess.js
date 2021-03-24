var map;
var divSquare = '<div id="s$coord" class="square $color"></div>';
var divFigure = '<div id="f$coord" class="figure">$figure</div>';

$(function (){
	start();
});

function start(){
	map = new Array(64);
	addSquares();
	showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
}

function setDraggable() {
	$('.figure').draggable();
}

function setDroppable(){
	$('.square').droppable({
		drop: 	function(event, ui){
					var frCoord = ui.draggable.attr('id').substring(1);
					var toCoord = this.id.substring(1);
					moveFigure(frCoord, toCoord);
				}
	});
}

function moveFigure(frCoord, toCoord){
	console.log('move from ' + frCoord + ' to ' + toCoord);
	figure = map[frCoord];
	showFigureAt(frCoord,'1');
	showFigureAt(toCoord, figure);
}

function addSquares(){
	console.log('addSquares');
	$('.board').html('');
	for (var coord = 0; coord < 64; coord++)
		$('.board').append(divSquare
			.replace('$coord', coord)
			.replace('$color', 
				isBlackSquareAt(coord) ? 'black': 'white'));
	setDroppable();
}

function showFigures(figures) {
	for(var coord = 0; coord < 64; coord++)
		showFigureAt(coord, figures.charAt(coord));
}

function showFigureAt(coord, figure) {
	map[coord] = figure;
	$('#s' + coord).html(divFigure
		.replace('$coord', coord)
		.replace('$figure', getChessSymbol(figure)));
	setDraggable();
}

function getChessSymbol(figure) {
	switch(figure) {
		case 'K' :return '&#9812;';
		case 'Q' :return '&#9813;';
		case 'R' :return '&#9814;';
		case 'B' :return '&#9815;';
		case 'N' :return '&#9816;';
		case 'P' :return '&#9817;';
		case 'k' :return '&#9818;';
		case 'q' :return '&#9819;';
		case 'r' :return '&#9820;';
		case 'b' :return '&#9821;';
		case 'n' :return '&#9822;';
		case 'p' :return '&#9823;';
		default : return '';
	}
}

function isBlackSquareAt(coord) {
	return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function showFiguresPHP(){
	
}