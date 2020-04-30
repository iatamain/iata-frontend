const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const yellow = "#EBF02C";
const lineColor = yellow;
const lineSize = 20;
let isMouseDown = false;
let isFirstClick = true;

canvas.addEventListener("mousedown", (e)=>{
   if(isFirstClick){
      document.querySelector("#draw-nav").style.display = "block";
      isFirstClick = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
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
   openNet(curId); //Обнулить все на сцене
   ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let trainVector = [];
let addToSampleBtn = document.querySelector("#add_to_sample");
addToSampleBtn.addEventListener("click", ()=>{
   showPopup("objects");
})
let askBtn = document.querySelector("#ask");
askBtn.addEventListener("click",()=>{
   alert("Сначала нужно обучить");
});
let outBtn = document.querySelector("#out_draw");
outBtn.addEventListener("click", ()=>{
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let curScene = document.querySelector(".content.active");
   curScene.classList.remove("active");
   let newScene = document.querySelector("#scene1")
   newScene.classList.add("active");
})

function openNet(id){
   document.querySelector("#draw-nav").style.display = "none";
   let trainScene = document.querySelector("#scene4");
   let lastActive = document.querySelector(".content.active");
   lastActive.classList.remove("active");
   trainScene.classList.add("active");
   let name_label = trainScene.querySelector(".name_label");
   name_label.innerHTML = netArray[id].name;
   ctx.fillStyle = lineColor;
   ctx.font = "italic 30pt Arial";
   ctx.fillText("Клик", canvas.width/2 - 30, canvas.height/2 - 0);
   isFirstClick = true;
}
