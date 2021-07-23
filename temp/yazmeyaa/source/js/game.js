const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


player = {
    x : 20,
    y : canvas.height  - 20,
    isGround : true,
    dy : 0,
}

function display(){
ctx.clearRect(0,0,canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = "yellow";
ctx.fillRect(player.x, player.y, 20, 20);

ctx.strokeStyle = "red";
ctx.moveTo(player.x, player.y);
ctx.lineTo(mouse.myX, mouse.myY);
ctx.stroke();
}


const keys = [];

const mouse = {
    myX : 0,
    myY : 0,
};

addEventListener("pointermove", function(event){
    mouse.myX = event.clientX;
    mouse.myY = event.clientY;
    console.log('X: ', mouse.myX);
    console.log('Y: ',mouse.myY); 
})


addEventListener("keydown",function(event){ // Считывание события нажатия клавиши
    keys[event.code] = true; 
});

addEventListener("keyup",function(event){// Считывание события отпуска клавиши
    keys[event.code] = false;
})

function actions(dt){ //Изменение refresh()
if(keys["KeyD"] == true && player.x < canvas.width - 20){
    player.x += 300 * dt;
}

if(keys["KeyA"] == true && player.x > 0){
    player.x -= 300 * dt;
}

if(keys["Space"] && player.isGround){
    player.isGround = false;
    player.dy = 25
}


if(!player.isGround){
player.y -= dy * dt;
}

}


var last = Date.now();
function refresh(){ // обновление экрана.
    var now = Date.now();
    display();
    actions((now-last)/1000);
    requestAnimationFrame(refresh);
    last = now;
}
refresh();