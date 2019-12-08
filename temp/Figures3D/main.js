//3. Пирамида перед кубом
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width/2, canvas.height/2);
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
class Face{ //Класс граней
	static faces = [];
	constructor(){
			this.vertices = [...arguments];
			this.verticesForRender = [...this.vertices];
			Face.faces.push(this);
			this.x;
			this.y;
			this.z;
			this.color = "#" + Math.random().toString(16).slice(2,8);
	}
	render(){ //Отрисовка грани
		if(this.minZ > 0){
			ctx.fillStyle = this.color;
			ctx.strokeStyle = "#50f";
			ctx.beginPath();
			let tempVector = this.verticesForRender[0].getProjection(500);
			ctx.moveTo(tempVector.x, tempVector.y);
			for(let vertex of this.verticesForRender){
				tempVector = vertex.getProjection(500);
				ctx.lineTo(tempVector.x, tempVector.y);
			}
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}
	update(x, y, z, degX, degY, degZ){ //Замена векторон на повернутые и сдвинутые:D
		this.verticesForRender = this.vertices.map((vertex)=>vertex.move(0 + x, 0 + y, -900 + z));
		this.verticesForRender = this.verticesForRender.map((vertex)=>vertex.rotate(degX, degY, degZ));
		this.verticesForRender = this.verticesForRender.map((vertex)=>vertex.move(0 - x, 0 - y, 900 - z));
		this.verticesForRender = this.verticesForRender.map((vertex)=>vertex.move(x, y, z));
	}
	get minZ(){ //Получение минимальной точки Z у грани. В данном случае, Z - Глубина, Y - Высота, X - Ширина
		let min = this.verticesForRender[0].z;
		for(let vertex of this.verticesForRender){
			if(vertex.z < min){
				min = vertex.z;
			}
		}
		return min;
	}
	get maxZ(){ //Получение максимальной точки Z у грани. 
		let max = this.verticesForRender[0].z;
		for(let vertex of this.verticesForRender){
			if(vertex.z > max){
				max = vertex.z;
			}
		}
		return max;
	}
	get minX(){ //Получение минимальной точки Z у грани. В данном случае, Z - Глубина, Y - Высота, X - Ширина
		let min = this.verticesForRender[0].x;
		for(let vertex of this.verticesForRender){
			if(vertex.x < min){
				min = vertex.x;
			}
		}
		return min;
	}
	get maxX(){ //Получение максимальной точки Z у грани. 
		let max = this.verticesForRender[0].x;
		for(let vertex of this.verticesForRender){
			if(vertex.x > max){
				max = vertex.x;
			}
		}
		return max;
	}
}
class Polygon{ //Класс фигур состоящих из граней
	constructor(){
		this.faces = [...arguments];
	}
	render(){
		for(let face of this.faces){ //Вызываем метод отрисовки для каждой грани
			face.render();
		}
	}
	update(x, y, z, degX, degY, degZ){ //Присвоение новых координат и угла поворота
		for(let face of this.faces){
			face.update(x, y, z, degX, degY, degZ);
		}
	}
	get minZ(){ //Получение минимальной точки Z у фигуры !НЕ ПРИГОДИЛОСЬ
		let min = this.faces[0].minZ;
		for(let face of this.faces){
			if(face.minZ < min){
				min = face.minZ;
			}
		}
		return min;
	}
	get maxZ(){ //Получение максимальной точки Z у фигуры !НЕ ПРИГОДИЛОСЬ
		let max = this.faces[0].maxZ;
		for(let face of this.faces){
			if(face.maxZ > max){
				max = face.maxZ;
			}
		}
		return max;
	}
}
var triangle = new Polygon(
	new Face(
		new Vector3d(-100, 0, -100),
		new Vector3d(100, 0, -100),
		new Vector3d(100, 0, 100),
		new Vector3d(-100, 0, 100)
	),
	new Face(
		new Vector3d(0, -150, 0),
		new Vector3d(100, 0, -100),
		new Vector3d(100, 0, 100)
	),
	new Face(
		new Vector3d(0, -150, 0),
		new Vector3d(100, 0, 100),
		new Vector3d(-100, 0, 100)
	),
	new Face(
		new Vector3d(0, -150, 0),
		new Vector3d(-100, 0, 100),
		new Vector3d(-100, 0, -100)
	),
	new Face(
		new Vector3d(0, -150, 0),
		new Vector3d(100, 0, -100),
		new Vector3d(-100, 0, -100)
	)
);

var rectangle = new Polygon(
	new Face(
		new Vector3d(-100, -100, 100),
		new Vector3d(100, -100, 100),
		new Vector3d(100, 100, 100),
		new Vector3d(-100, 100, 100)
	),
	new Face(
		new Vector3d(-100, -100, -100),
		new Vector3d(100, -100, -100),
		new Vector3d(100, -100, 100),
		new Vector3d(-100, -100, 100)
	),
	new Face(
		new Vector3d(-100, -100, -100),
		new Vector3d(-100, 100, -100),
		new Vector3d(-100, 100, 100),
		new Vector3d(-100, -100, 100)
	),
	new Face(
		new Vector3d(100, -100, -100),
		new Vector3d(100, 100, -100),
		new Vector3d(100, 100, 100),
		new Vector3d(100, -100, 100)
	),
	new Face(
		new Vector3d(-100, -100, -100),
		new Vector3d(100, -100, -100),
		new Vector3d(100, 100, -100),
		new Vector3d(-100, 100, -100)
	),
	new Face(
		new Vector3d(-100, 100, -100),
		new Vector3d(100, 100, -100),
		new Vector3d(100, 100, 100),
		new Vector3d(-100, 100, 100)
	),
);
function update(){
	let x = 0;
	let y = 100;
	let z = 400;
	let degY = parseFloat(document.querySelector("#degY").value);
	triangle.update(x, y, z+200, 0, degY, 0);
	rectangle.update(x, y-70, 700+500, 0, degY, 0);
	Face.faces.sort((b, a)=>{
		a = Math.sqrt(a.maxZ**2 + a.maxX**2);
		b = Math.sqrt(b.maxZ**2 + b.maxX**2);
		return a - b;
	});
	render();
}
function render(){
	ctx.fillStyle = "#000";
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	Face.faces.forEach(face => face.render());

}
update();
render();