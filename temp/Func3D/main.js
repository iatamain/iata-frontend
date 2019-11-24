class Vector2d{ 
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	move(mx, my){
		let x = this.x + mx;
		let y = this.y + my;
		return new Vector2d(x, y);
	}
	scale(w){
		let x = this.x * w;
		let y = this.y * w;
		return new Vector2d(x, y);
	}
	rotate(angle){
		let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
		let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
		return new Vector2d(x, y);
	}
	static copy(vector){
		return new Vector2d(vector.x, vector.y);
	}
}
class Vector3d{
	constructor(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;
	}
	getProjection(dist){ //Получение проекции точек на плоскость
		let x = this.x*dist/this.z;
		let y = this.y*dist/this.z;
		return new Vector2d(x, y);
	}
	move(mx, my, mz){
		let x = this.x + mx;
		let y = this.y + my;
		let z = this.z + mz;
		return new Vector3d(x, y, z);
	}
	scale(w){
		let x = this.x * w;
		let y = this.y * w;
		let z = this.z * w;
		return new Vector3d(x, y, z);
	}
	rotate(angleX, angleY, angleZ){
		let x, y, z;
		let temp = new Vector3d(this.x, this.y, this.z);
		//Вращение вокруг оси 0Y
		x = temp.x * Math.cos(angleY) + (temp.z)* Math.sin(angleY);
		y = temp.y;
		z = -temp.x * Math.sin(angleY) + (temp.z) * Math.cos(angleY);
		temp.x = x; temp.y = y; temp.z = z;
		//Вращение вокруг оси 0X
		x = temp.x;
		y = temp.y  * Math.cos(angleX) + temp.z * Math.sin(angleX);
		z = -temp.y * Math.sin(angleX) + temp.z * Math.cos(angleX);
		temp.x = x; temp.y = y; temp.z = z;
		//Вращение вокруг оси 0Z
		x = temp.x  * Math.cos(angleZ) + temp.y * Math.sin(angleZ);
		y = -temp.x * Math.sin(angleZ) + temp.y * Math.cos(angleZ);
		z = temp.z;
		temp.x = x; temp.y = y; temp.z = z;
		return temp;
	}
	static copy(vector){
		return new Vector3d(vector.x, vector.y, vector.z);
	}
}
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1)
ctx.fillStyle = "#ff0";
ctx.strokeStyle = "#a0f";


let last = Date.now();
function play(){
	let now = Date.now();
	let dt = (now-last)/1000;
	update(dt);
	render();
	last = now;
	requestAnimationFrame(play);
}


let deg = 0;//Угол поворота графика
let deg2 = 0.3;
function update(dt){
	deg=(deg+dt/2)%(Math.PI*2);
}
function chooseDeg(){
	deg2 = document.querySelector("#deg2").value;
}
let step = 0.4; //Частота квадратиков на графике:D
let x = -1, y = -1, z = 12 //Сдвиг графика
let disp = 4; //Диапазон
function render(){
	ctx.fillStyle = "#000";
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	ctx.fillStyle = "#ff0";
	function draw(xi ,yi){ //Рисуем клеточку для точки (xi, yi);
			ctx.beginPath();
			let p1 = f(xi, yi).rotate(deg2, deg, 0).move(x, y, z).getProjection(500); 
			let p2 = f(xi - step, yi).rotate(deg2,deg, 0).move(x, y, z).getProjection(500); 
			let p3 = f(xi - step, yi + step).rotate(deg2,deg, 0).move(x , y, z).getProjection(500); 
			let	p4 = f(xi, yi + step).rotate(deg2,deg, 0).move(x, y, z).getProjection(500); 
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.lineTo(p3.x, p3.y);
			ctx.lineTo(p4.x, p4.y);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
	}
	if(deg <= 2.6 && deg >= Math.PI / 4){ //Определяем, с какого угла начать прорисовку графика
		for(let xi = -disp; xi <= disp; xi += step){ 
			for(let yi = -disp; yi <= disp; yi += step){
				draw(xi, yi);
			}
		}
	}else if(deg > 2.6 && deg < 4){
		for(let yi = -disp; yi <= disp; yi += step){ 
			for(let xi = -disp; xi <= disp; xi += step){
				draw(xi, yi);
			}
		}
	}else if(deg > 3 && deg < 5){
		for(let xi = disp; xi >= -disp; xi -= step){ 
			for(let yi = disp; yi >= -disp; yi -= step){
				draw(xi, yi);
			}
		}
	}else{
		for(let yi = disp; yi >= -disp; yi -= step){ 
			for(let xi = disp; xi >= -disp; xi -= step){
				draw(xi, yi);
			}
		}
	}
}
function f(x, y) { // функция, которую нужно построить, возвращает точку в трехмерном пространстве
    return new Vector3d(x, Math.sin(x*x + y*y)/(x*x + y*y), y);
  }
play();

