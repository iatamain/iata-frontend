let count = 30;
let fluffiness = 2;
let speed = 1;
let size = 8;

function chooseCount(){
	count = parseInt(document.querySelector("#count").value);
	while(count > snowflakes.length){
		snowflakes.push(new Snowflake(false));
	}
	while(count < snowflakes.length){
		snowflakes.splice(snowflakes.length - 1, 1);
	}
}

function chooseFluffiness(){
	fluffiness = parseInt(document.querySelector("#fluffiness").value);
}

function chooseSize(){
	console.log(size, "test");
	size = parseInt(document.querySelector("#size").value);
	console.log(size, "test");
}

function chooseSpeed(){
	speed = document.querySelector("#speed").value * 1;
}

document.addEventListener("DOMContentLoaded", ()=>{
	chooseCount();
	chooseFluffiness();
	chooseSize();
	chooseSpeed();
}, false)
