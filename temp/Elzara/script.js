var ctx;
var em;
var ID, ID1;
var t, x1;
var imData;


function house() {

em.fillRect(0,0,1300,550);
em.fillStyle ="grey";
em.fillRect(810,300,350,180);

em.fillStyle = "#8B4513";
var gr1 = em.createLinearGradient(810, 300, 985, 120);
gr1.addColorStop(0, "#CD853F");
gr1.addColorStop(1, "#8B4513");
em.fillStyle = gr1;
em.beginPath();
em.moveTo(810,300);
em.lineTo(985,120);
em.lineTo(1160,300);
em.fill();
em.closePath();
em.stroke();

em.clearRect(950,350, 70, 70);

em.strokeStyle ="black";
em.beginPath();
em.moveTo(985,350);
em.lineTo(985,420);
em.stroke();
em.moveTo(950,385);
em.lineTo(1020,385);
em.closePath();
em.stroke();

em.fillStyle ="green";
em.beginPath();
em.moveTo(0,550);
em.quadraticCurveTo(150, 450, 400, 550);
em.moveTo(380,550);
em.bezierCurveTo(450,550, 1200,355, 1300, 550);
em.fill();
}


function zabor(){
em.fillStyle ="#800000";
em.strokeStyle="#FF0000";
for (var i=780; i<1200; i+=20){

em.fillRect(i,400,20,140);
em.strokeRect(i,400,20,140);
em.beginPath();
em.moveTo(i,400);
em.lineTo(i+10,390);
em.lineTo(i+20,400);
em.fill();
em.stroke();
}

}
function tree(){

em.fillStyle ="brown";
em.fillRect(100,400,20,140);
var gradient = em.createRadialGradient(120,150,100,120,100,30);
gradient.addColorStop(0, "darkgreen");
gradient.addColorStop(1, "#7FFF00");
em.fillStyle = gradient;

gradient = em.createRadialGradient(120,220,180,120,100,30);
gradient.addColorStop(0, "darkgreen");
gradient.addColorStop(1, "#7FFF00");
em.fillStyle = gradient;
em.strokeStyle="#6B8E23";
em.beginPath();
em.moveTo(100,430);
em.quadraticCurveTo(30, 380, 70, 350);


em.quadraticCurveTo(20, 340, 40, 300);

em.quadraticCurveTo(5, 280, 30, 200);

em.quadraticCurveTo(1, 170, 60, 100);

em.quadraticCurveTo(100, 40, 120, 90);

em.quadraticCurveTo(150, 10, 190, 140);

em.quadraticCurveTo(250, 150, 190, 270);

em.quadraticCurveTo(300, 290, 170, 400);

em.quadraticCurveTo(200, 430, 120, 435);


em.fill();
em.stroke();
}

var arr=[414, 10, 30, 0, 1150, 77, 300, 44, 500, 90, 200, 30, 250, 130, 550, 60, 1270, 70, 650, 40, 700, 25, 560, 130, 780, 20, 830, 110, 860, 80, 870, 170, 930, 100, 960, 90, 930, 30, 1000, 50, 1200, 150, 1250, 30, 1100, 120];

function star(x, y){
em.fillStyle ="#FFD700";
em.beginPath();
em.moveTo(x,y);
em.lineTo(x+4,y+10);
em.lineTo(x+14,y+11);
em.lineTo(x+6,y+17);
em.lineTo(x+9,y+30);
em.lineTo(x,y+24);
em.lineTo(x-9,y+30);
em.lineTo(x-6,y+17);
em.lineTo(x-14,y+11);
em.lineTo(x-3,y+10);
em.closePath();
em.fill();
}

function moon(){
em.putImageData(imData, 0,0);
var z= 140*Math.cos(t);
if (t<Math.PI/2) t=t+0.1;
em.fillStyle ="white";
em.beginPath();

em.moveTo(500+t*140,100+z);
em.quadraticCurveTo(600+t*140, 150+z, 500+t*140, 220+z);
em.quadraticCurveTo(550+t*140, 150+z, 500+t*140,100+z);


em.closePath();
em.fill();
setTimeout(function() {
requestAnimationFrame(moon);
}, 1000 / 1); //время на кадр


ID=requestAnimationFrame(moon);
}

var x1 = 20;
function fallen_star() {

em.putImageData(imData, 0,0);

em.fillStyle ="#FFD700";

em.fillStyle ="#FFD700";

em.beginPath();
em.moveTo(200+x1,30+x1);
em.lineTo(204+x1,40+x1);
em.lineTo(214+x1,41+x1);
em.lineTo(206+x1,47+x1);
em.lineTo(209+x1,60+x1);
em.lineTo(200+x1,54+x1);
em.lineTo(191+x1,60+x1);
em.lineTo(194+x1,47+x1);
em.lineTo(186+x1,41+x1);
em.lineTo(197+x1,40+x1);
em.closePath();
em.fill();

em.fillStyle ="red";
//em.fillRect(185+x1,30+x1,28,30);
x1+=10;
//delay(fallen_star, 1000)

if (x1 < 400) requestAnimationFrame(fallen_star);

}
setTimeout(fallen_star,1000);





function Init(){
ctx=document.getElementById("tutorial");
em=ctx.getContext('2d');
em.clearRect(0,0,1300,500);
t=-Math.PI/2;
x1=20;
house();
zabor();
tree();
for (var i=0; i<46;i+=2){
star(arr[i], arr[i+1]);
}
//moon();

imData=em.getImageData(0,0, 1300,500);
//setTimeout(fallen_star,10000);
}
function start(){

ID=requestAnimationFrame(moon);

}
 
function stop(){
cancelAnimationFrame(ID);

}