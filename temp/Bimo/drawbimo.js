var canvas= document.querySelector('canvas');
ctx = canvas.getContext('2d');
var mouse = {
	x: 0, 
	y: 0,
	isDown: false
}
document.addEventListener("keydown", (e)=>{
	if(e.keyCode == 87 || e.keyCode == 38 || e.keyCode == 32){//W, ArrowUp, Space
		megaButton.isUp = true;
	}
	if(e.keyCode == 83 || e.keyCode == 40){//S, ArrowDown
		megaButton.isDown = true;
	}
	if(e.keyCode == 65 || e.keyCode == 37){//A, ArrowLeft
		megaButton.isLeft = true;
	}
	if(e.keyCode == 68 || e.keyCode == 39){//D, ArrowRight
		megaButton.isRight = true;
	}
	if(e.keyCode == 80){//P
		buttons[0].isActive = true;
		buttons[0].render();
	}
	if(e.keyCode == 82){//R
		buttons[1].isActive = true;
		buttons[1].render();
	}
	if(e.keyCode == 81){//Q
		buttons[2].isActive = true;
		buttons[2].render();
	}
	
	megaButton.render();
});
document.addEventListener("keyup", (e)=>{
	if(e.keyCode == 87 || e.keyCode == 38 || e.keyCode == 32){//W, ArrowUp, Space
		megaButton.isUp = false;
	}
	if(e.keyCode == 83 || e.keyCode == 40){//S, ArrowDown
		megaButton.isDown = false;
	}
	if(e.keyCode == 65 || e.keyCode == 37){//A, ArrowLeft
		megaButton.isLeft = false;
	}
	if(e.keyCode == 68 || e.keyCode == 39){//D, ArrowRight
		megaButton.isRight = false;
	}
	if(e.keyCode == 80){//P
		buttons[0].isActive = false;
		buttons[0].render();
	}
	if(e.keyCode == 82){//R
		buttons[1].isActive = false;
		buttons[1].render();
	}
	if(e.keyCode == 81){//Q
		buttons[2].isActive = false;
		buttons[2].render();
	}
	megaButton.render();
});
canvas.addEventListener("mousedown", (e)=>{
	mouse.isDown = true;
	for(buttonessa of buttons){
		buttonessa.check(mouse.x, mouse.y);
		buttonessa.render();
	}
	megaButton.check(mouse.x, mouse.y);
	megaButton.render();
})
canvas.addEventListener("mouseup", (e)=>{
	mouse.isDown = false;
	for(buttonessa of buttons){
		buttonessa.isActive = false;
		buttonessa.render();
	}
	megaButton.resetButtons();
	megaButton.render();
});
canvas.addEventListener("mousemove", (e)=>{
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
	for(buttonessa of buttons){
		buttonessa.check(mouse.x, mouse.y);
		buttonessa.render();
	}
	megaButton.check(mouse.x, mouse.y);
	megaButton.render();
});
function drawCircle(x, y, size, color){
		ctx.fillStyle = color; 
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
}
function renderText(){
	ctx.fillStyle = "#000"
	ctx.font = "bold 15px serif";
	ctx.fillText("Пуск", 394, 585);
	ctx.font = "bold 20px serif";
	ctx.fillText("Стоп", 302, 645);
};
class Button{
	constructor(x, y, size, size2,  color, color2){
		this.size = size;
		this.size2 = size2;
		this.x = x;
		this.y = y;
		this.color = color;
		this.color2 = color2;
		this.isActive = false;
	}
	render(){
		drawCircle(this.x, this.y, this.size, "#000");
		if(this.isActive){
			drawCircle(this.x, this.y, this.size2, this.color2);
		}else{
			drawCircle(this.x, this.y, this.size2, this.color);
		}
		renderText();
	}
	check(x, y){
		if(Math.sqrt((x - this.x)**2 + (y - this.y)**2) <= this.size && mouse.isDown){
			return this.isActive = true;
		}else{
			return this.isActive = false;
		}
	}
}
var megaButton = { //Крестик
	isDown: false,
	isUp: false,
	isLeft: false,
	isRight: false,
	render: function(){
		ctx.fillStyle = "#000"; //Сам крестик
		ctx.fillRect(80, 525, 90, 35);
		ctx.fillRect(107, 525-27,35, 90);
		ctx.fillStyle = "#ff0";
		ctx.fillRect(87, 525 + 7,90 - 14, 35 - 14);
		ctx.fillRect(114, 525-27 + 7,35- 15, 90 - 14);
		let x, y; //Тени
		if(this.isDown){ //Нижняя тень
			x = 114;
			y = 553;
			let gradient = ctx.createLinearGradient(x, y + 20, x, y); 
			gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)'); 
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, 20, 28);
		}
		if(this.isUp){ //Верхняя тень
			x = 114;
			y = 505;
			gradient = ctx.createLinearGradient(x, y, x, y + 20); 
			gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)'); 
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, 20, 28);
		}
		if(this.isLeft){ //Левая тень
			y = 532;
			x = 87;
			gradient = ctx.createLinearGradient(x, y, x+28, y); 
			gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)'); 
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, 28, 21);
		}
		if(this.isRight){ //Правая тень
			y = 532;
			x = 135;
			gradient = ctx.createLinearGradient(x+28, y, x, y); 
			gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)'); 
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(x, y, 28, 21);
		}
	},
	check: function(x, y){
		if(x >= 114 && x <= 114 + 20 && y >= 553 && y <= 553 + 28 && mouse.isDown){
			this.isDown = true;
		}else{
			this.isDown = false;
		}
		if(x >= 114 && x <= 114 + 20 && y >= 505 && y <= 505 + 28 && mouse.isDown){
			this.isUp = true;
		}else{
			this.isUp = false;
		}
		if(x >= 87 && x <= 87 + 28 && y >= 532 && y <= 532 + 21 && mouse.isDown){
			this.isLeft = true;
		}else{
			this.isLeft = false;
		}
		if(x >= 135 && x <= 135 + 28 && y >= 532 && y <= 532 + 21 && mouse.isDown){
			this.isRight = true;
		}else{
			this.isRight = false;
		}
	},
	resetButtons: function(){
		this.isDown = false;
		this.isUp = false;
		this.isLeft = false;
		this.isRight = false;
	}
}
var buttons = [];
buttons.push(new Button(400, 440, 18, 12, "rgb(32, 53, 142)", "#00f"));
buttons.push(new Button(410, 580, 30, 23, "rgb(74, 206, 45)", "#0f0"));
buttons.push(new Button(325, 640, 37, 30, "rgb(248, 50, 85)", "#f00"));


for(buttonessa of buttons){
	buttonessa.render();
}
megaButton.render();
function drawDisplay(){
	ctx.fillStyle = "rgb(196, 233, 189)";  //Дисплей
	ctx.fillRect(50, 80, 400, 290);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.strokeRect(50, 80, 400, 290);

	drawCircle(170, 200, 35, "#000");//Глаза
	drawCircle(330, 200, 35, "#000");
	drawCircle(155, 185, 6, "rgb(196, 233, 189)");
	drawCircle(155 + 9, 185 + 9, 3, "rgb(196, 233, 189)")
	drawCircle(155 + 160, 185, 6, "rgb(196, 233, 189)")
	drawCircle(155 + 160 + 9, 185 + 9, 3, "rgb(196, 233, 189)")


	ctx.beginPath(); //Рот
	ctx.bezierCurveTo(230, 205, 250, 270, 270, 205);
	ctx.stroke();

	ctx.fillStyle = "#000" //Дисковод
	ctx.fillRect(60, 410,230,30);
	ctx.fillStyle = "rgb(26, 63, 46)";
	ctx.fillRect(60+7, 410+7,230-14,30-14);
}
drawDisplay();
