
function parseGet(getHref){
	try {
		let arr = getHref.split("?")[1].split("&");
		let obj = {};
		for(let i = 0; i < arr.length; i++){
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		return obj;
	}catch (e){
		return 0;
	}
}
var game = document.querySelector("#game"); //Создание поля
var size = parseGet(window.location.href) && parseGet(window.location.href).size || 20;
for(let i = 0; i < size; i++){
   for(let j = 0; j < size; j++){
      var newCell = document.createElement("div");
      newCell.setAttribute("class", "cell death");
      newCell.setAttribute("style", `width: ${100/size}%; height: ${100/size}%;`);
      newCell.setAttribute("id", `num${i}_${j}`);
      game.appendChild(newCell);
   }
}
game.addEventListener("mousedown", (e)=>{
   if(e.target.getAttribute("class") == "cell death"){
      e.target.setAttribute("class", "cell live");
   }else{
      e.target.setAttribute("class", "cell death");
   }
   let id = e.target.getAttribute("id");
   id = id.split("num")[1].split("_");
   x = id[0];
   y = id[1];
   if(mapCurrent[x][y] == 1) mapCurrent[x][y] = 0;
   else mapCurrent[x][y] = 1;
});
var mapCurrent = [];
var mapNew = [];
var speed = 0;
var isPause = 0;
for(var i = 0; i < size; i++){
   mapCurrent[i] = [];
   mapNew[i] = [];
}
function changeSpeed(){
   speedGame = document.querySelector("#speedInp").value;
   document.querySelector("#speed").innerHTML = speedGame;
}
function start(){
   console.log(isPause);
   if(isPause < 2){
      document.querySelector("#start").value = "Пауза";
      for(var i = 0; i < size; i++){
         for(var j = 0; j < size; j++){
            let cell = document.querySelector(`#num${i}_${j}`);
            if(cell.getAttribute("class") == "cell death"){
               mapCurrent[i][j] = 0;
            }else{
               mapCurrent[i][j] = 1;
            }
         }
      }
      if(isPause == 0){
         isPause = 2;
         play();
      } else{
         isPause = 2;
      }
   }else{
      document.querySelector("#start").value = "Пуск";
      isPause = 1;
   }
}
var last = Date.now();
function play(){
   let now = Date.now();
   let dt = (now - last)/1000;
   update(dt);
   render();
   last = now;
   requestAnimationFrame(play);
}
let time = 0;
let checkTime = 0;
let speedGame = 1;
function update(dt){
   time += dt;
   if(Math.floor(time * speedGame) != checkTime && isPause >= 2){
      checkTime = Math.floor(time * speedGame);
      for(var i = 0; i < size; i++){
         for(var j = 0; j < size; j++){
            mapNew[i][j] = mapCurrent[i][j];
         }
      }
      for(var i = 0; i < size; i++){
         for(var j = 0; j < size; j++){
            let countCell = checkCell(i, j)
            if(mapCurrent[i][j] == 0 && countCell == 3){
               mapNew[i][j] = 1;
            }else if(mapCurrent[i][j] == 1 && (countCell < 2 || countCell > 3)){
               mapNew[i][j] = 0;
            }
         }
      }
      //log(mapCurrent, mapNew);
      for(var i = 0; i < size; i++){
         for(var j = 0; j < size; j++){
            mapCurrent[i][j] = mapNew[i][j];
         }
      }
   }
}
function render(){
   for(let i = 0; i < size; i++){
      for(var j = 0; j < size; j++){
         let cell = document.querySelector(`#num${i}_${j}`);
         if(mapCurrent[i][j] == 1){
            cell.setAttribute("class", "cell live")
         }else{
            cell.setAttribute("class", "cell death")
         }
      }
   }
}
function checkCell(x, y){
   let countLivingCell = 0;
   for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
         if(i != 0 || j!= 0){
            if(x + i >= 0 && x + i < size && y + j >= 0 && y + j < size && mapCurrent[x+i][y+j] === 1){
               countLivingCell++;
            }
         }
      }
   }
   return countLivingCell;
}
var countLogs = 0;
function log(){
   if(countLogs < 1000){
      console.log(...arguments);
      countLogs++;
   }
}
