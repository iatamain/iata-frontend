/*jslint browser: true, devel: true, node: true, maxerr: 7*/
var ctx;
var em;
var ID, ID1;
var t = 0.0,
x, y, x_max, x_min, y_max, y_min, w, h;
var x_1 = [];
var y_1 = [];
var imData, timer;
var mov = 0,
sc = 0,
an = 0,
mov1, sc1, an1, x1, y1;

function coordinate() {
em.strokeStyle = "grey";
em.beginPath();
for (var i = 0; i < 1300; i += 215) {
for (var j = 0; j < 600; j += 100) {
em.strokeRect(i, j, 215, 100);
}
}
//em.closePath();
//em.stroke();


em.strokeStyle = "black";
em.beginPath();
em.moveTo(645, 0);
em.lineTo(645, 600);
em.stroke();

em.beginPath();
em.moveTo(0, 300);
em.lineTo(1300, 300);
em.stroke();


}

var k = 0;
function grafic() {
	em.fillStyle = "olive";
	em.fillRect(x_1[k]*sc + mov, y_1[k]*sc + mov, 2, 2);
	k++;
	if(k <= x_1.length) requestAnimationFrame(grafic)
}


function Init() {
	ctx = document.getElementById("tutorial");
	em = ctx.getContext('2d');
}

function start() {
	ID = requestAnimationFrame(grafic);
	mov = parseInt(document.querySelector("#move").value);
	sc = document.querySelector("#scal").value;
	an = document.querySelector("#angl").value;
	
	for(let i = 0; i < 2 * Math.PI; i+=0.05){
		x = 2 * Math.cos(i) + Math.cos(2 * i);
		y = 2 * Math.sin(i) - Math.sin(2 * i);
		y_1.push(y);
		x_1.push(x);
	}
	x_max = Math.max(...x_1);
	x_min = Math.min(...x_1);
	y_max = Math.max(...y_1);
	y_min = Math.min(...y_1);
}
function change(){
	mov = parseInt(document.querySelector("#move").value);
	sc = document.querySelector("#scal").value;
	an = document.querySelector("#angl").value;
}
function stop() {
cancelAnimationFrame(ID);

}