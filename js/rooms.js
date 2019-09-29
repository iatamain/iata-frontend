let countRooms = 0;
let lastIdRoom = 0;
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
   add: function(room){
      dataRooms[lastIdRoom++] = room;
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
         li.setAttribute("id", "roomN" + i);
         let p = document.createElement("p");
         p.setAttribute("class", "nameRoom");
         let text = document.createTextNode(dataRooms[i].name);
         p.appendChild(text);
         li.appendChild(p);
         let p2 = document.createElement("p");
         p2.setAttribute("class", "typeRoom");
         p2.innerHTML = `${dataRooms[i].mode}: ${dataRooms[i].map} ${dataRooms[i].isClose ? "(Закрытая)" : ""}`;
         li.appendChild(p2);
         let p3 = document.createElement("p");
         p3.setAttribute("class", "playerInRoom");
         p3.innerHTML = `${dataRooms[i].playersInRoom}/${dataRooms[i].capacity}`;
         li.appendChild(p3);
         let div = document.createElement("div");
         div.setAttribute("onclick", `goToRoom(${i})`);
         div.setAttribute("class", "smallButton goToRoom");
         div.innerHTML = "<span>В бой</span>";
         li.appendChild(div);
         document.querySelector("#listRoomsBody ul").appendChild(li);
         dataRooms[i].isActive = true;
         countRooms++;
         countPlayers += dataRooms[i].playersInRoom;
      }
   }
}
function createRoom(){
   let nameRoom = document.querySelector("#createRoom input[type='text']").value.trim();
   let passwordRoom = document.querySelector("#createRoom input[type='password']").value.trim();
   let modeRoom = document.querySelector("#createRoom .shown").innerHTML;
   let mapRoom = "TestMap";
   let isCloseRoom = document.querySelector("#createRoom input[type='checkbox']").checked;
   let isCreated = false;
   let isSelected = true;
   switch (modeRoom) {
      case "Каждый сам за себя":
         modeRoom = "DM";
         break;
      case "Командный бой":
         modeRoom = "TDM";
         break;
      case "Захват флага":
         modeRoom = "CTF";
         break;
      case "Захват точки":
         modeRoom = "CP";
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
      msg("Комната успешно создана");
      //socket.emit('/rooms/create', "testName", 42, 1, "deathmatch", "");
      rooms.add({
         name: nameRoom,
         password: passwordRoom,
         mode: modeRoom,
         map: mapRoom,
         capacity: 14,//Вместимость (Хранится на серве)
         playersInRoom: 0, //Вычисляется на серве
         isBought: true, //Куплена ли комната (Хранится на серве)
         isActive: true, //Только на фронте
         isClose: isCloseRoom //Является ли комната запароленной
      });
   }
}
function goToRoom(id){
   if(dataRooms[id].isClose){
      let password = 3;
      msg("Введите пароль", "prompt", function testPass(arg){
         password = arg;
         if(password == dataRooms[id].password){
            msg("Пароль верный");
         }else{
            msg("Пароль не верный", "prompt", testPass, "wrong");
         }
      });
   }else{
      startGame();
   }
}
