var socketStatus = "disconnected";
var socket;
function connectToSocket(){
   console.log("Подключение к WebSocket...")
   socket = io('wss://itracers.xyz:4443', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 5,
      query: {
         auth_key: snsPlayerInf.authKey|| "5cb788743808b2b92665b5e9eed204b1",
         viewer_id: snsPlayerInf.viewerId || "135534097",
         snsName: session.snsName
      }
   });
   socket.on('connect', ()=>{
      socketStatus = "connected";
      showContent();
      socket.on('/rooms/list', (answ)=>{
         console.log(answ)
         dataRooms = {};
         for(i in answ){
            dataRooms[i] = {
               name: answ[i].name,
               isClosed: answ[i].password, //Проверять
               mapId: answ[i].mapId,
               mode: answ[i].mode,
               capacity: 8,
               playersInRoom: answ[i].usersCount,
               isActive: true
            }
         }
         rooms.set();
      });
      socket.on('/rooms/create', (roomN, answ)=>{
         console.log("Комната создана", roomN, answ);
         rooms.add(roomN,{
            name: answ.name,
            isClosed: answ.password,
            mapId: answ.mapId,
            mode: answ.mode,
            capacity: 8,
            playersInRoom: 0,
            isActive: true
         });
      })
      socket.on('/rooms/my', (roomN, dataRoom)=>{
         gameData.roomN = roomN;
         gameData.dataRoom = dataRoom;
         if(roomN != "roomnull" && !Game.isPlay){
            startGame();
         }
         console.log("Моя комната", roomN, dataRoom);
      })
      socket.on('/rooms/connect', (roomN, user)=>{
         if(user.id == mainPlayerInf.id){
            socket.emit('/rooms/my');
         }else{
            dataRooms[roomN].playersInRoom++;
            countPlayers++;
            rooms.update(roomN);
         }
         if(roomN == gameData.roomN){
            Game.addPlayer(user);
         }
         console.log("Произошло подключение к комнате.", roomN, user);
      })
      socket.on('/rooms/leave', (roomN, user)=>{
         if(user.id == mainPlayerInf.id){
            socket.emit('/rooms/my');
            socket.emit('/rooms/list');
            stopGame();
         }else{
            if(roomN == gameData.roomN){
               Game.removePlayer(user);
            }else{
               dataRooms[roomN].playersInRoom--;
               countPlayers--;
               rooms.update(roomN);
            }
         }
         console.log("Кто-то вышел из комнаты.", roomN, user);
      })
      socket.on('/rooms/deleted', (roomN)=>{
         console.log("Комната удалена", roomN);
         rooms.del(roomN);
      })
      socket.on('clientError', (error, roomN)=>{
         console.log("Возникла ошибка", error, roomN);
         if(error == "Unauthorized"){
            goToRoom(roomN, "wrong");
         }
         if(error == "Room state is not lobby."){
            msg("В этой комнате уже идет игра");
         }
      });
      socket.emit('/rooms/list');
      socket.emit('/rooms/my');
   });
   socket.on('disconnect', ()=>{
      socketStatus = "disconnected";
      msg("Соединение прервано");
   });
   socket.on('error', (e)=>{
      socketStatus = "error";
      msg("Ошибка подключения к WebSocket");
      console.log("Ошибка подключения к сокету", e);
   });
}
