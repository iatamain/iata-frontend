const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 40;

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);

var meow = 0;

var clrBtn = document.querySelector(".clearButton");
clrBtn.onclick = function(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

const mouse = {
    mX : 0,
    mY : 0,
    nmX : 0,
    nmY : 0,
    brushSize : 0,
    drawing : false,
}

ctx.lineCap = "round";

var brushSize = document.querySelector(".bSize");
var bsOut = document.querySelector(".bSizeOut");
brushSize.oninput = function() {
    bsOut.textContent = brushSize.value;
  }

ctx.strokeStyle = 'hsl(`+ ${meow} +`,100%,50%)';
addEventListener("pointerup", function(event){
mouse.drawing = false;
ctx.closePath();
});


addEventListener("pointerdown", function(event){
    mouse.drawing = true;
    ctx.beginPath();
    mouse.mX = event.layerX;
    mouse.mY = event.layerY;
    ctx.lineWidth = brushSize.value;
});
 
addEventListener("pointermove", function(event){
    if(mouse.drawing){
        ctx.beginPath()
        ctx.strokeStyle = 'hsl('+ meow +',100%,50%)';
            ctx.moveTo(mouse.mX, mouse.mY);
            ctx.lineTo(event.layerX, event.layerY);
            ctx.stroke();
            mouse.mX = event.layerX;
            mouse.mY = event.layerY;
            ctx.closePath();
            meow++;
            if(meow >=360) meow = 0;
    }
});

const clear = [];

addEventListener("keydown", function(event){
    if(event.code == "KeyR"){
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
})

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    
    var light = (max + min) / 2;
    var H;
    var sat;
    
    if(max == min){
        hue = 0;
        sat = 0;
    } else {
        var c = max - min;
        sat = c / (1 - Math.abs(2 * light - 1));
        switch(max){
            case r:
                break;
            case g:
                hue = (b-r) / c + 2;
                break;
            case b: 
            hue = (r-g) / c + 4;
            break;
        }
    }
    hue = Math.round(hue*60);
    sat = Math.round (sat*100);
    light = Math.round(light * 100);
    return [hue, sat, light];
    
    }