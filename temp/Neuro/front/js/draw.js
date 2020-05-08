const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const lineColor = new Color("#EBF02C");
const bgColor = new Color("#104");
const countPixels = 25;
const lineSize = canvas.width / countPixels;
let isMouseDown = false;
let isFirstClick = true;
ctx.lineCap = "round";

canvas.addEventListener('touchstart', (e) => {
   e.preventDefault();
   e.stopPropagation();
   if(isFirstClick){
      setState(3);
      isFirstClick = false;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }
   const x = e.changedTouches[0].clientX - e.target.offsetLeft - e.target.parentNode.offsetLeft ;
	const y = e.changedTouches[0].clientY - e.target.offsetTop - e.target.parentNode.offsetTop;
   isMouseDown = true;
   ctx.beginPath();
   ctx.moveTo(x, y);
}, true);
canvas.addEventListener("touchend", (e)=>{
   e.preventDefault();
   e.stopPropagation();
   isMouseDown = false;
   ctx.closePath();
}, true)
canvas.addEventListener("touchmove", (e)=>{
   e.preventDefault();
   e.stopPropagation();
   const x = e.changedTouches[0].clientX - e.target.offsetLeft - e.target.parentNode.offsetLeft ;
	const y = e.changedTouches[0].clientY - e.target.offsetTop - e.target.parentNode.offsetTop;
   if(isMouseDown){
      ctx.lineJoin = "round";
      ctx.lineWidth = lineSize;
      ctx.strokeStyle = lineColor;
      ctx.fillStyle = lineColor;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
   }
}, true)

canvas.addEventListener("mousedown", (e)=>{
   if(isFirstClick){
      setState(3);
      isFirstClick = false;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }
   const x = e.offsetX;
   const y = e.offsetY;
   isMouseDown = true;
   ctx.beginPath();
   ctx.moveTo(x, y);
})
document.addEventListener("mouseup", (e)=>{
      isMouseDown = false;
      ctx.closePath();
})
canvas.addEventListener("mousemove", (e)=>{
   const x = e.offsetX;
   const y = e.offsetY;
   if(isMouseDown){
      ctx.lineJoin = "round";
      ctx.lineWidth = lineSize;
      ctx.strokeStyle = lineColor;
      ctx.fillStyle = lineColor;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
   }
})

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", ()=>{
   setState(2);
   isFirstClick = true;
   ctx.fillStyle = bgColor;
   ctx.fillRect(0, 0, canvas.width, canvas.height);
})

const addToSampleBtn = document.querySelector("#add_to_sample");
addToSampleBtn.addEventListener("click", ()=>{
   showPopup("objects");
})

const askBtn = document.querySelector("#ask");
askBtn.addEventListener("click",()=>{
   const data = processImage();
   drawGrid(ctx, data);
   isFirstClick = true;
   showPopup("Идет обработка, нужно немного подождать.");
   ask({_id: curId, data: data.input.reduce((acc, val)=>acc.concat(val), [])})
   .then((ans)=>{
      showPopup(`Вероятно, нарисован ${ans.message}.`);
      console.log(ans);
   })
   .catch((err)=>{
      console.log(err.message);
      pushMessage(err.message);
   });
});
const outBtn = document.querySelector("#out_draw"); //Выход из режима обучения
outBtn.addEventListener("click", ()=>{
   const curScene = document.querySelector(".content.active");
   curScene.classList.remove("active");
   const newScene = document.querySelector("#scene1")
   newScene.classList.add("active");
})

const popupContent = document.querySelector("#popup-content");
popupContent.addEventListener("click", (e)=>{
   if(e.target.dataset.obj){
      const trainData = processImage(e.target.dataset.obj);
      hidePopup();
      drawGrid(ctx, trainData);
      addTrainData(trainData);
      isFirstClick = true;
   }
})

const delDataBtn = document.querySelector("#data_container");
delDataBtn.addEventListener("click", (e)=>{
   const id = e.target.dataset.id;
   if(id){
      removeTrainData({
         _id: curId,
         trainData: netArray[curId].trainData[id]
      })
      .then((msg)=>{
         netArray[curId].trainData.splice(id, 1);
         e.target.parentNode.remove();
         const trainDataList = document.querySelectorAll("#data_container div");
         trainDataList.forEach((elem, i)=>{
            elem.querySelector(".del").dataset.id = i;
         });
         if(!netArray[curId].trainData.length){
            setState(5);
         }
         pushMessage(msg.message);
      })
      .catch((err)=>{
         console.log(err.message);
         pushMessage(err.message);
      })
   }
})
const trainBtn = document.querySelector("#train");
trainBtn.addEventListener("click", ()=>{
   setState(6);
   showPopup("Процесс обучения начат, нужно немного подождать.");
   train({_id: curId})
   .then((ans)=>{
      showPopup("Нейронная сеть обучена. Теперь вы можете поставить ей задачу распознавания.");
      netArray[curId].isTrain = true;
      pushMessage(ans.message);
   })
   .catch((err)=>{
      console.log(err)
      pushMessage(err.message);
   });
})
function processImage(trainObj){
   let trainData = [];
   for(let i = 0; i < countPixels; i++){
      trainData[i] = new Array(countPixels).fill(0);
   }
   const stepX = canvas.width / countPixels;//Ищем непустые пиксели
   const stepY = canvas.height / countPixels;
   for(let x = 0; x < canvas.width; x += stepX){
      for(let y = 0; y < canvas.height; y+= stepY){
         let isEmpty = true;
         const data = ctx.getImageData(x, y, stepX, stepY).data;
         for(let i = 0; i < data.length; i+=4*10){
            if(lineColor.compare(data[i], data[i + 1], data[i + 2], data[i + 3])){
               isEmpty = false;
            }
         }
         if(!isEmpty){
            trainData[Math.ceil(y/stepY)][Math.ceil(x/stepX)] = 1;
         }
      }
   }
   trainData = {
      input: trainData,
		output: {
         [trainObj]: 1
      },
   }
   return trainData;
}
function addTrainData(data){
   sendTrainData({
      _id: curId,
      trainData: data
   })
   .then((msg)=>{
      setState(4);
      document.querySelector("#data_container").innerHTML += `
      <div class = "wrapper">
         <a download="${Object.keys(data.output)[0]}.png" href="${canvas.toDataURL().replace("image/png", "image/octet-stream")}">
            <img width = "100" height = "100" src = "${canvas.toDataURL()}" alt = "${Object.keys(data.output)[0]}" title = "${Object.keys(data.output)[0]}">
         </a>
         <input type = "button" class = "del" data-id = "${netArray[curId].trainData.length}" value = "x">
      </div>`;
      netArray[curId].trainData.push(data);
      pushMessage(msg.message);
   })
   .catch((err)=>{
      console.log(err.message);
      pushMessage(err.message);
   })

}
function debugBase64(base64URL){
    var win = window.open();
    win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);

}
function setImages(){
   document.querySelector("#data_container").innerHTML = "";
   netArray[curId].trainData.forEach((data, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      drawGrid(ctx, data);
      document.querySelector("#data_container").innerHTML  += `
         <div class = "wrapper">
            <a download="${Object.keys(data.output)[0]}.png" href="${canvas.toDataURL().replace("image/png", "image/octet-stream")}">
               <img width = "100" height = "100" src = "${canvas.toDataURL()}" alt = "${Object.keys(data.output)[0]}" title = "${Object.keys(data.output)[0]}">
            </a>
            <input type = "button" class = "del" data-id = "${i}" value = "x">
         </div>
      `
   });
   if(netArray[curId].trainData.length){
      setState(4);
   }
}
function drawGrid(ctx, data){
   const arr = data.input;
   const stepX = canvas.width / countPixels;//Ищем непустые пиксели
   const stepY = canvas.height / countPixels;
   ctx.fillStyle = bgColor;//Рисуем квадратики
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   for(let x = 0; x < countPixels; x++){
      for(let y = 0; y < countPixels; y++){

         if(arr[y][x]){
            ctx.fillStyle = lineColor;
            ctx.fillRect(x*stepX, y*stepY, stepX, stepY);
         }
      }
   }
   for(let i = 0; i < countPixels; i++){ //Рисуем сетку
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, i*stepY);
      ctx.lineTo(canvas.width, i*stepY);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(i*stepX, 0);
      ctx.lineTo(i*stepX, canvas.height);
      ctx.stroke();
      ctx.closePath();
   }
}
function openNet(id){
   setState(1);
   if(netArray[id].isTrain){
      setState(7);
   }
   setImages();
   const trainScene = document.querySelector("#scene4");
   const lastActive = document.querySelector(".content.active");
   lastActive.classList.remove("active");
   trainScene.classList.add("active");
   const name_label = trainScene.querySelector(".name_label");
   name_label.innerHTML = netArray[id].name;
   ctx.fillStyle = bgColor;
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = lineColor;
   ctx.font = "italic 30pt Arial";
   ctx.fillText("Клик", canvas.width/2 - 30, canvas.height/2 - 0);
   isFirstClick = true;
}
function setState(state){
   if(state == 1){ //При входе
      document.querySelector("#draw-nav").style.display = "none";
      document.querySelector("#label_data_container").style.display = "none";
      document.querySelector("#data_container").style.display = "none";
      document.querySelector("#train").style.display = "none";
      document.querySelector("#ask").style.display = "none";
   }
   if(state == 2){ //При очистке холста
      document.querySelector("#draw-nav").style.display = "none";
   }
   if(state == 3){ //При первом клике на канвас
      document.querySelector("#draw-nav").style.display = "block";
      document.querySelector("#add_to_sample").style.display = "inline-block";
      if(netArray[curId].isTrain){
         document.querySelector("#ask").style.display = "inline-block";
      }
   }
   if(state == 4){ //Добавили в выборку рисунок
      document.querySelector("#add_to_sample").style.display = "none";
      document.querySelector("#label_data_container").style.display = "block";
      document.querySelector("#data_container").style.display = "flex";
      document.querySelector("#train").style.display = "inline-block";
      document.querySelector("#ask").style.display = "none";
   }
   if(state == 5){ //При удалении последнего trainData
      document.querySelector("#label_data_container").style.display = "none";
      document.querySelector("#data_container").style.display = "none";
      document.querySelector("#train").style.display = "none";

   }
   if(state == 6){//В процессе обучения
      document.querySelector("#train").style.display = "none";
   }
   if(state == 7){//Обучилась
      document.querySelector("#train").style.display = "inline-block";
   }
}
