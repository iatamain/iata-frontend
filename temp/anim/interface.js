function chooseCount(){
	count = parseInt(document.querySelector("#count").value);
	while(count > snowFail.length){
		snowFail.push(new snowBall(false));
	}
	console.log("2")
	while(count < snowFail.length){
		snowFail.splice(snowFail.length - 1, 1);
	}
}
function chooseFurry(){
	furry = parseInt(document.querySelector("#furry").value);
}
function chooseSize(){
	size = parseInt(document.querySelector("#size").value);
}
function chooseSpeed(){
	speed = document.querySelector("#speed").value * 1;
	console.log(speed);
}
document.addEventListener("DOMContentLoaded", ()=>{
	chooseCount();
	chooseFurry();
	chooseSize();
	chooseSpeed();
	console.log("Запустилось")
}, false)
