const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const yellow = "#EBF02C";
const lineColor = yellow;
const lineSize = 20;

let isMouseDown = false;
canvas.addEventListener("mousedown", (e)=>{
   let x = e.offsetX;
   let y = e.offsetY;
   isMouseDown = true;
   ctx.beginPath();
   ctx.fillStyle = lineColor;
   ctx.arc(x, y, lineSize/2, 0, Math.PI * 2);
   ctx.fill();
   ctx.closePath();
   ctx.beginPath();
   ctx.moveTo(x, y);
})
document.addEventListener("mouseup", (e)=>{
   if(isMouseDown){
      let x = e.offsetX;
      let y = e.offsetY;
      isMouseDown = false;
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = lineColor;
      ctx.arc(x, y, lineSize/2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
   }
})
canvas.addEventListener("mousemove", (e)=>{
   let x = e.offsetX;
   let y = e.offsetY;
   if(isMouseDown){
      ctx.lineJoin = "round";
      ctx.lineWidth = lineSize;
      ctx.strokeStyle = lineColor;
      ctx.fillStyle = lineColor;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = lineColor;
      ctx.arc(x, y, lineSize/2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(x, y);
   }
})
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", ()=>{
   ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let trainVector = [];
let addToSampleBtn = document.querySelector("#add_to_sample");
addToSampleBtn.addEventListener("click", ()=>{

})
