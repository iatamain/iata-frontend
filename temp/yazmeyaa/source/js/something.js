//by yazmeyaa
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(mn, mx){
return Math.floor(mn + Math.random() * (mx - mn + 1));
};

// Tophead
class circle {
    constructor (x,y,radius, startX, direction, limit, color){
this.x = rand(100,canvas.width);
this.y = rand(0, canvas.height);
this.radius = rand(60, 200);
this.startX = this.x;
this.direction = true;
this.limit = rand(30,350);
this.color = rand(15,360);
this.speed = rand(100, 370);
    }
    render(){
        ctx.beginPath();
        ctx.strokeStyle = 'hsl(' + this.color + ', 50%, 50%';
        ctx.arc(this.x + 50, this.y + 50, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    updateMe(dt){
        this.y += dt * this.speed;
        if(this.y >= canvas.height + this.radius){
            this.y = 0 - this.radius;
            this.x = Math.floor(200 + Math.random() * (canvas.width - 300 - 200 + 1));
            this.startX = this.x;
        }
    
    
        this.color += 1;
        if(this.color >= 360){
            this.color = 0;
        }
    
    
            if(this.direction == true){
                this.x += dt * 100;
                if(this.x >= this.startX + this.limit){
                    this.direction = false;
                };
            };
    
            if(!this.direction){
                this.x -= dt*100;
                if(this.x <= this.startX - this.limit){
                    this.direction = true;
                }
            }
    }
}

function clearCanvas(){
ctx.fillStyle = "black";                      
ctx.fillRect(0,0,canvas.width, canvas.height);
}

circles = [];

for(i = 0; i < rand(15, 55); i++){
    circles.push(new circle);
}

function render(){
        
        clearCanvas();
        for(i = 0; i < circles.length; i++){
            circles[i].render();
        }
};

let last = Date.now();

function update(dt){
for(i = 0; i < circles.length; i++){
    circles[i].updateMe(dt);
}
};



function play(){
let now = Date.now();
    render();
update((now-last)/1000);
requestAnimationFrame(play);
last = now;
};

play();