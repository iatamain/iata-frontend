function checkButtons(){
	if(buttons[0].isActive){
		//console.log("Пауза");
	}
	if(buttons[1].isActive){
		console.log("Пуск");
		isPlay = true;
	}
	if(buttons[2].isActive){
		//console.log("Стоп");
		stop();
	}
	if(megaButton.isUp){
		//console.log("Вверх");
	}
	if(megaButton.isDown){
		//console.log("Вниз");
	}
	if(megaButton.isLeft){
		//console.log("Влево");
	}
	if(megaButton.isRight){
		//console.log("Вправо");
	}
}
canvas.addEventListener("mousedown", (e)=>{
	checkButtons();
	let x = e.offsetX;
	let y = e.offsetY;
	if(currentFigure.check(x, y)){
		currentFigure.move("Rotate");
	}
});
document.addEventListener("keydown", (e)=>{
	checkButtons();
})
class Tetramino{
	constructor(type, color){
		this.type = type;
		this.color = color;
		this.x = 7 * sizeCell;
		this.y = -3*sizeCell + 290 % sizeCell;
		this.cellX = this.x/sizeCell;
		this.cellY = this.y/sizeCell;
		this.dy = 90;//90;
		if(type == "O"){
			this.map = [[1, 1], 
						[1, 1]];
		}
		if(type == "L"){
			this.map = [[1, 0], 
						[1, 0], 
						[1, 1]];
		}
		if(type == "J"){
			this.map = [[0, 1], 
						[0, 1], 
						[1, 1]];
		}
		if(type == "I"){
			this.map = [[1], 
						[1], 
						[1],
						[1]];
		}
		if(type == "Z"){
			this.map = [[1, 1, 0],
						[0, 1, 1]];
		}
		if(type == "S"){
			this.map = [[0, 1, 1], 
						[1, 1, 0]];
		}
		if(type == "T"){
			this.map = [[1, 1, 1], 
						[0, 1, 0]];
		}
	}
	move(dt){
		if(dt === "Right"){
			this.cellX = Math.floor(this.x/sizeCell);
			this.cellY = Math.floor((this.y + 290 % sizeCell)/sizeCell);
			let isCanMove = true;
			for(let i = 0; i < this.map.length; i++){
				for(let j = 0; j < this.map[i].length; j++){
					if(this.map[i][j] != 0){
						if(this.cellY + i >= 0 && this.cellY + i < 15 && this.cellX + j < 19){
							if(map[this.cellY + i][this.cellX + j + 1] == 1) isCanMove = false;
						}else{
							isCanMove = false;
						}
					}
				}
			}
			if(isCanMove) this.x += sizeCell;
		}else if(dt === "Left"){
			this.cellX = Math.floor(this.x/sizeCell);
			this.cellY = Math.floor((this.y + 290 % sizeCell)/sizeCell);
			let isCanMove = true;
			for(let i = 0; i < this.map.length; i++){
				for(let j = 0; j < this.map[i].length; j++){
					if(this.map[i][j] != 0){
						if(this.cellY + i >= 0 && this.cellX + j - 1 >= 0&& this.cellY + i < 15){
							if(map[this.cellY + i][this.cellX + j - 1] == 1) isCanMove = false;
						}else{
							isCanMove = false;
						}
					}
				}
			}
			if(isCanMove) this.x -= sizeCell;
		}else if(dt === "Rotate"){
			let tempArr = [];
			for(let i = 0; i < this.map[0].length; i++){
				tempArr[i] = [];
			}
			for(let i = 0; i < this.map.length; i++){
				for(let j = 1; j <= this.map[i].length; j++){
					tempArr[this.map[i].length - j][i] = this.map[i][j-1];
				}
			}
			this.map = tempArr;
				
		}else{
			this.cellX = Math.floor(this.x/sizeCell);
			this.cellY = Math.floor((this.y + 290 % sizeCell)/sizeCell);
			let isCanMove = true;
			for(let i = 0; i < this.map.length; i++){
				for(let j = 0; j < this.map[i].length; j++){
					if(this.map[i][j] != 0){
						if(this.cellY + i + 1>= 0 && this.cellX + j >= 0 && this.cellY + i + 1 < 15){
							if(map[this.cellY + i + 1][this.cellX + j] == 1) isCanMove = false;
						}else if(this.cellY + i + 1 >= 15){
							isCanMove = false;
						}
					}
				}
			}
			if(isCanMove){ //Если можем двигать фигуру -- двигаем
				this.y += this.dy * dt;
				return true;
			}else{
				for(let i = 0; i < this.map.length; i++){ //Иначе, производим установку фигуры и больше ее не двигаем
					for(let j = 0; j < this.map[i].length; j++){
						if(this.map[i][j] != 0){
							if(this.cellY + i >= 0 && this.cellX + j >= 0 && this.cellY + i < 15)
								map[this.cellY + i][this.cellX + j] = 1;
						}
					}
				}
				return false;
			}
		}
	}
	render(){
		for(let i = 0; i < this.map.length; i++){
			for(let j = 0; j < this.map[i].length; j++){
				if(this.map[i][j] != 0){
					ctx.fillStyle = this.color;
					ctx.strokeStyle = "#000";
					ctx.lineWidth = 1;
					ctx.fillRect(this.x + j * sizeCell + 50, this.y + i * sizeCell + 80, sizeCell, sizeCell);
					ctx.strokeRect(this.x + j * sizeCell + 50, this.y + i * sizeCell + 80, sizeCell, sizeCell);
				}
			}
		}
	}
	check(x, y){
		x-=50;
		y-=80;
		//console.log(x, y, this.x, this.y);
		for(let i = 0; i < this.map.length; i++){
			for(let j = 0; j < this.map[i].length; j++){
				if(this.map[i][j] != 0){
					let isX = x >= this.x + j * sizeCell && x <= this.x + (j + 1) * sizeCell;
					let isY = y >= this.y + i * sizeCell && y <= this.y + (i + 1) * sizeCell;
					if(isX && isY){
						return true;
					}
				}
			}
		}
		return false;
	}
}
var sizeCell = 20; //Размер кубика
var figures = ["O", "L", "J", "I", "Z", "S", "T"]; //Виды всех фигур
var currentFigure;
var map = [];
var isPlay = false;
let last = Date.now();
function play(){
	let now = Date.now();
	let dt = (now-last)/1000;
	update(dt);
	render();
	last = now;
	requestAnimationFrame(play);
}
let allTime = 0;
let lastFixedTime = 0;
let lastFixedTime2 = 0;
function update(dt){
	allTime += dt;
	if(isPlay){
		let moveStatus = currentFigure.move(dt); //Двигаем вниз текущую фигуру
		if(!moveStatus){//Если сдвигнуть вниз не удалось ...
			let figure = figures[Math.floor(Math.random() * 7)];
			currentFigure = new Tetramino(figure, "yellow"); //Создаем новую фигуру
			for(let i = 0; i < 15; i++){ //Проверяем заполненность линий
				let tempCount = 0;
				for(let j = 0; j < 20; j++){
					if(map[i][j] == 1) tempCount++;
				}
				if(i == 0 && tempCount > 0){ //Если заполнена верхняя лирния - останавливаем игру
					stop();
				}else if(tempCount == 20){ //Если заполнена линия -- сдвигаем на нее верхние линии
					for(let k = i; k > 0; k--){
						for(let j = 0; j < 20; j++){
							map[k][j] = map[k - 1][j];
						}
					}
				}
			}
		}
		if(lastFixedTime != Math.floor(allTime*16)){ //Ограничение по времени для движения
			if(megaButton.isRight){
				currentFigure.move("Right");
			}
			if(megaButton.isLeft){
				currentFigure.move("Left");
			}
			if(megaButton.isDown){
				currentFigure.move(dt * 5);
			}
			lastFixedTime =  Math.floor(allTime*16);
		}
		if(lastFixedTime2 != Math.floor(allTime*8)){
			
			if(megaButton.isUp || buttons[0].isActive){
				currentFigure.move("Rotate");
			}
			lastFixedTime2 =  Math.floor(allTime*8);
		}
	}
} 
function render(){ //Отрисовка всего.-.
	if(isPlay){
		ctx.fillStyle = "rgb(196, 233, 189)";  //Дисплей
		ctx.fillRect(50, 80, 400, 290);
		ctx.lineWidth = 2;
		ctx.strokeRect(50, 80, 400, 290);
		currentFigure.render();
		renderMap();
		ctx.fillStyle = "rgb(96, 199, 156)"; //Перкрытие того, что вылезает за границы дисплея
		ctx.lineWidth = 2;
		ctx.fillRect(0, 0, 500, 80);
		ctx.fillRect(50+400, 0, 50, 290+80);
		ctx.fillRect(0, 80+290, 500, 40);
		ctx.strokeRect(50, 80, 400, 290);
	}
}
function renderMap(){ //Отрисовка карты блоков
	for(let i = 0; i < 15; i++){
		for(let j = 0; j < 20; j++){
			if(map[i][j] != 0){
				ctx.fillStyle = "#0ff";
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 1;
				ctx.fillRect(j * sizeCell + 50, (i - 1) * sizeCell + 80 + 290 % sizeCell, sizeCell, sizeCell);
				ctx.strokeRect(j * sizeCell + 50, (i - 1) * sizeCell + 80 + 290 % sizeCell, sizeCell, sizeCell);
			}
		}
	}
}
function preload(){ //Создание карты блоков и стартовой фигуры
	for(let i = 0; i < 15; i++){
		map[i] = [];
		for(let j = 0; j < 20; j++){
			map[i][j] = 0;
		}
	}
	let figure = figures[Math.floor(Math.random() * 7)];
	currentFigure = new Tetramino(figure, "yellow");
}
function stop(){
	isPlay = false;
	drawDisplay();
	preload();
}
preload();
play();