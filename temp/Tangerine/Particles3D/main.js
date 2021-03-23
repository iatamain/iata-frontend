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
class Basis{
	constructor(begin, end){
		this.begin = Vector3d.copy(begin);
		this.end = Vector3d.copy(end);
		this.dist = 500;
		
	}
	render(){
		let beginProjection = this.begin.getProjection(this.dist);
		let endProjection = this.end.getProjection(this.dist);
		ctx.beginPath();
		ctx.moveTo(beginProjection.x, beginProjection.y);
		ctx.lineTo(endProjection.x, endProjection.y);
		ctx.closePath();
		console.log(beginProjection, endProjection)
		ctx.stroke();
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

var basis = [
	new Basis(new Vector3d(0, 0, 0), new Vector3d(300, 0, 0)),
	new Basis(new Vector3d(0, 0, 0), new Vector3d(0, 300, 0)),
	new Basis(new Vector3d(0, 0, 0), new Vector3d(0, 0, 300))
];
var func = [];
let last = Date.now();
function play(){
	let now = Date.now;
	let dt = (now-last)/1000;
	update(dt);
	render();
	last = now;
	requestAnimationFrame(play);
}
function preload(){
	basis.forEach((elem)=>{
		let deg = 0.1;
		elem.begin = elem.begin.rotate(0, deg, 0);
		elem.end = elem.end.rotate(0, deg, 0);
		elem.begin = elem.begin.move(-200, -200, 500);
		elem.end = elem.end.move(-200, -200, 500);
	});
	for(let x = 0; x <= 5; x += 0.05){
		for(let z = 0; z <= 5; z += 0.05){
			func.push(new Vector3d(x, Math.sin(x+z)/(x+z), z));
		}
	}
	play();
}
function update(){
	
}
var deg = 0.1;
function render(){
	ctx.fillStyle = "#000";
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	/*
	basis.forEach((elem)=>{
		elem.render();
	})
	*/
	ctx.fillStyle = "#ff0";
	for(let i = 0; i < func.length; i++){
		let fun = Vector3d.copy(func[i]);
		fun = fun.rotate(0, deg+=0.1, 0);
		fun = fun.move(-1, -1, 10);
		let projection = fun.getProjection(500);
		//console.log(projection, func[i])
		ctx.fillRect(projection.x, projection.y, 1, 1);
	}
	
}
preload();

