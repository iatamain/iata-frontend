let countRooms = 0;
let countPlayers = 0;
let listRoomsBody = {
   elementHTML: document.querySelector("#listRoomsBody"),
   elementChildHTML: document.querySelector("#listRoomsBody ul"),
   sizeElement: 11.84,
   elementsPerPage: 8,
   x: 0,
   y: 0,
   dy: 1,
   top: 0,
   left: 0,
   rect: 0,
   stop: true
};
let mapsNames = ["testMap"];
let dataRooms = {}
let rooms = {
   normalize: function(){
      document.querySelector(".activePlayers").innerHTML = "Игроков онлайн: " + countPlayers;
      if(document.querySelector("#listRoomsHeader input").value == "") document.querySelector(".activeRooms").innerHTML = "Активных комнат: " + countRooms;
      else  document.querySelector(".activeRooms").innerHTML = "Результатов поиска: " + countRooms;
      listRoomsBody.elementChildHTML.style.top = listRoomsBody.top + "%";
   },
   search: function(){
      let text = document.querySelector("#listRoomsHeader input").value.trim();
      for(i in dataRooms){
         let searchIndex = dataRooms[i].name.indexOf(text);
         if(searchIndex == -1 && dataRooms[i].isActive){
            document.querySelector("#roomN" + i).style.display = "none";
            countRooms--;
            dataRooms[i].isActive = false;
         }else if(!dataRooms[i].isActive && searchIndex != -1){
            document.querySelector("#roomN" + i).style.display = "block";
            countRooms++;
            dataRooms[i].isActive = true;
         }
         if(searchIndex != -1){
            document.querySelector("#roomN" + i + " p").innerHTML = "";
            let pushText = document.createTextNode(dataRooms[i].name.substr(0, searchIndex));
            document.querySelector("#roomN" + i + " p").appendChild(pushText);
            let font = document.createElement("font");
            font.setAttribute("color", "#0FF");
            pushText = document.createTextNode(dataRooms[i].name.substr(searchIndex, text.length));
            font.appendChild(pushText);
            document.querySelector("#roomN" + i + " p").appendChild(font);
            pushText = document.createTextNode(dataRooms[i].name.substr(searchIndex + text.length, dataRooms[i].name.length));
            document.querySelector("#roomN" + i + " p").appendChild(pushText);
            //document.querySelector("#roomN" + i + " p").innerHTML = dataRooms[i].name.substr(0, searchIndex) + '<font color = "#0ff">' + dataRooms[i].name.substr(searchIndex, text.length) +'</font>' + dataRooms[i].name.substr(searchIndex + text.length, dataRooms[i].name.length);
         }
      }
      if(listRoomsBody.top < -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0))
      listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0);
      this.normalize();
   },
   add: function(roomN, room){
      dataRooms[roomN] = room;
      this.set();
      this.search();
   },
   del: function(room){
         delete dataRooms[room];
         this.set();
         this.search();
   },
   set: function(){
      countRooms = 0;
      countPlayers = 0;
      document.querySelector("#listRoomsBody ul").innerHTML = "";
      for(i in dataRooms){
         let li = document.createElement("li");
         li.id = "roomN" + i;
         let p = document.createElement("p");
         p.className = "nameRoom";
         let text = document.createTextNode(dataRooms[i].name);
         p.appendChild(text);
         li.appendChild(p);
         let p2 = document.createElement("p");
         p2.className = "typeRoom";
         p2.innerHTML = `${dataRooms[i].mode}: ${mapsNames[dataRooms[i].mapId]} ${dataRooms[i].password ? "(Закрытая)" : ""}`;
         li.appendChild(p2);
         let p3 = document.createElement("p");
         p3.className =  "playerInRoom";
         p3.innerHTML = `${dataRooms[i].playersInRoom}/${dataRooms[i].capacity}`;
         li.appendChild(p3);
         let div = document.createElement("div");
         div.id = i;
         div.className = "smallButton goToRoom";
         div.innerHTML = "<span>В бой</span>";
         li.appendChild(div);
         document.querySelector("#listRoomsBody ul").appendChild(li);
         dataRooms[i].isActive = true;
         countRooms++;
         countPlayers += dataRooms[i].playersInRoom;
      }
      this.normalize();
   }
}
function createRoom(){
   let nameRoom = document.querySelector("#createRoom input[type='text']").value.trim();
   let passwordRoom = document.querySelector("#createRoom input[type='password']").value.trim();
   let modeRoom = document.querySelector("#createRoom .shown").innerHTML;
   let mapRoom = 0;
   let isCloseRoom = document.querySelector("#createRoom input[type='checkbox']").checked;
   let isCreated = false;
   let isSelected = true;
   switch (modeRoom) {
      case "Каждый сам за себя":
         modeRoom = "dm";
         break;
      case "Командный бой":
         modeRoom = "tdm";
         break;
      case "Захват флага":
         modeRoom = "ctf";
         break;
      case "Захват точки":
         modeRoom = "cp";
         break;
      default:
         isSelected = false;
   }
   for(i in dataRooms){
      if(dataRooms[i].name == nameRoom){
         isCreated = true;
      }
   }
   if(isCreated){
      msg("Комната с таким именем уже существует");
   }else if(!isSelected){
      msg("Выберите режим игры");
   }else{
      let obj = {
         name: nameRoom,
         mapId: mapRoom,
         mode: modeRoom,
         password: passwordRoom
      }
      if(socketStatus == "connected") socket.emit('/rooms/create', obj);
      else msg("WebSocket не подключен")
   }
}
function goToRoom(id){
   if(dataRooms[id].isClose){
      msg("Введите пароль", "prompt", (password)=>{
         if(socketStatus == "connected") socket.emit('/rooms/connect', id, password);
         else msg("WebSocket не подключен")
         //msg("Пароль не верный", "prompt", testPass, "wrong");
      });
   }else{
     if(socketStatus == "connected") socket.emit('/rooms/connect', id);
     else msg("WebSocket не подключен")
   }
}
function exitFromRoom(){
  if(socketStatus == "connected") socket.emit('/rooms/leave');
  else msg("Соединение Websocket разорвано.");
}
