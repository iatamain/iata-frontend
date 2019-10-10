let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "yellow";
ctx.strokeStyle = "yellow";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function change(){
	
}
class Vector{
	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
	add(vector){ //Сложить два вектора
		this.x += vector.x;
		this.y += vector.y;
	}
	getMagnitude(){ //Получить длину вектора
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	getAngle(){ //Получить угол вектора
		return Math.atan2(this.y,this.x);
	}
	static fromAngle(angle, magnitude){ //Получить новый вектор исходя из угла и размеров
		return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
	}
}
class Particle{
	constructor(point, speed, acceleration){
		this.position = point || new Vector(0, 0);
		this.speed = speed || new Vector(0, 0);
		this.acceleration = acceleration || new Vector(0, 0);
		this.size = 1;
		this.color = "#00f";
	}
	move(){ //Двигать частицы
		//Добавить ускорение к скорости
		this.speed.add(this.acceleration);
		//Добавить скорость к координатам
		this.position.add(this.speed);
	}
	submitToFields(){ //Влияние гравитационных полей на частицу
		// стартовое ускорение в кадре
		let totalAcceleration = new Vector(0, 0)
		//Цикл по гравитационным полям
		fields.forEach((field)=>{
			//Расстояние от гравитационного поля до частицы.
			let vector = new Vector(field.position.x - this.position.x, field.position.y - this.position.y);
			let force = field.mass / Math.pow(vector.x*vector.x+vector.y*vector.y,1.5);
			//Аккумулируем ускорение в кадре произведением силы на расстояние
			totalAcceleration.add(new Vector(vector.x * force, vector.y * force));
		})
		//Обновляем ускорение частицы
		this.acceleration = totalAcceleration;
	}
}
class Emitter{ //Излучатели частиц
	constructor(point, speed, spread){
		this.position = point;
		this.speed = speed;
		this.spread = spread || Math.PI / 32; //Возможный угол = скорость +/- разброс.
		this.color = "#00f";
	}
	emitParticle(){ //Создание новой частицы по параметрам излучателя
		// Использование случайного угла для формирования потока частиц позволит нам получить своего рода "спрей";
		let angle = this.speed.getAngle() + this.spread - (Math.random() * this.spread * 2);
		//Магнитуда скорости излучателя
		let magnitude = this.speed.getMagnitude();
		//Координаты излучателя
		let position = new Vector(this.position.x, this.position.y);
		// Обновлённая скорость, полученная из вычисленного угла и магнитуды
		let speed = Vector.fromAngle(angle, magnitude);
		//Возвращаем частицу
		return new Particle(position, speed);
	}
}
class Field{
	constructor(point, mass){
		this.position = point;
		this.color = "#00a";
		this.mass = mass;	
	}
	set mass(mass){ //Сеттер. Вызывается при попытке записать что-то в this.mass;
		this.massValue = mass;
		this.color = mass < 0 ? "#a00" : "#aa0";
	}
	get mass(){ //Геттер. Вызывается при попытке получить значение из this.mass. В качестве значения отдаcт this.massValue
		return this.massValue;
	}
}
let midX = canvas.width/2;
let midY = canvas.height/2;
var particles = [];
var emitters = [
  //new Emitter(new Vector(midX, midY), Vector.fromAngle(1, 1)),
  new Emitter(new Vector(midX-100, midY-200), Vector.fromAngle(0, 1)),
  new Emitter(new Vector(midX-100, midY-200), Vector.fromAngle(Math.PI/1.7, 2))
];
var fields = [
  new Field(new Vector(midX + 100, midY), 130),
  //new Field(new Vector(midX + 100, midY + 200), 100),
  new Field(new Vector(midX + 100, midY - 200), -100),
  new Field(new Vector(midX - 200, midY + 200), -50),
];
var maxParticles = 3000; //Максимальное кол-во отображаемых частиц
var emissionRate = 4;	//Количество частиц излучаемых за кадр
function play(){
	update();	
	render();
	requestAnimationFrame(play);
}
play();
function update(){
	addNewParticles(); //Заставляем сработать излучатели
	plotParticles(canvas.width, canvas.height); //Обработка частиц вышедших за пределы холста
	
}
function render(){
	ctx.fillStyle = "black"
	ctx.fillRect(0,0, canvas.width, canvas.height);
	drawParticles();
	drawEmitters();
	drawFields();
}
function addNewParticles(){
	if(particles.length >= maxParticles) return;
	for(let i in emitters){
		for(let j = 0; j < emissionRate; j++){
			particles.push(emitters[i].emitParticle());
		}
	}
}
function plotParticles(boundX, boundY){
	let currentParticles = [];
	for(let i in particles){
		let particle = particles[i];
		let pos = particle.position;
		//Если частица за пределами, то пропускаем ее и переходим к следующей.
		let flag = false;
		if(pos.x < 0 || pos.x > boundX || pos.y < 0 || pos.y > boundY) flag = true;
		for(j in fields){
			if(Math.abs(fields[j].position.x - particles[i].position.x) < 5 && Math.abs(fields[j].position.y - particles[i].position.y)< 5) flag = true;
		}
		if(flag) continue;
		particle.submitToFields()
		particle.move();
		currentParticles.push(particle);
	}
	// Замена глобального массива частиц на массив без вылетевших за пределы холста частиц
	particles = currentParticles;
}
function drawParticles(){
	particles.forEach((particle)=>{
		ctx.fillStyle = particle.color;
		ctx.fillRect(particle.position.x, particle.position.y, particle.size, particle.size);
	});
}
function drawEmitters(){
	emitters.forEach((emitter)=>{
		ctx.fillStyle = emitter.color;
		ctx.beginPath();
		ctx.arc(emitter.position.x, emitter.position.y, 5, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	});
}
function drawFields(){
	fields.forEach((field)=>{
		var gradient1 = ctx.createRadialGradient(field.position.x, field.position.y, Math.abs(field.mass)/2, field.position.x, field.position.y, 0);
		gradient1.addColorStop(0,"rgba(0, 0, 0, 0)");
		gradient1.addColorStop(1, field.color);
		ctx.fillStyle = gradient1;
		ctx.fillRect(field.position.x-Math.abs(field.mass)/2, field.position.y-Math.abs(field.mass)/2, Math.abs(field.mass), Math.abs(field.mass));
	})
}