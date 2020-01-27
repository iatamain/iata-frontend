var socketStatus = "disconnected";
var socket = io('wss://itracers.xyz:4443', {
   transports: ['websocket'],
   reconnection: true,
   reconnectionDelay: 1000,
   reconnectionDelayMax : 5000,
   reconnectionAttempts: 5,
   query: {
      auth_key: snsPlayerInf.authKey || "5cb788743808b2b92665b5e9eed204b1",
      viewer_id: snsPlayerInf.viewerId || "135534097",
      snsName: session.snsName
   }
});
socket.on('connect', ()=>{
   socketStatus = "connected";
   socket.on('/rooms/list', (answ)=>{
      console.log(answ)
      dataRooms = {};
      for(i in answ){
         dataRooms[i] = {
   			name: answ[i].name,
   			password: answ[i].password, //Проверять
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
         password: answ.password, //Проверять
         mapId: answ.mapId,
         mode: answ.mode,
         capacity: 8,
         playersInRoom: 1,
         isActive: true
      });
   })
   socket.emit('/rooms/list');
   //socket.emit('/rooms/connect', roomN, password(nullable))
   // '/rooms/my'
   socket.on('/rooms/my', (e)=>{
     console.log("Моя комната", e);
   })
   socket.on('/rooms/connect', (e)=>{
     console.log("Произошло подключение к комнате.", e);
   })
   socket.on('/rooms/deleted', (e)=>{
     console.log("Комната удалена", e);
     rooms.del(e);
   })
   socket.on('/clientError', (e)=>{
     console.log("Возникла ошибка.", e);
   });
});
socket.on('disconnect', ()=>{
   socketStatus = "disconnected";
});
socket.on('error', (e)=>{
   socketStatus = "error";
   console.log("Ошибка подключения к сокету", e);
});
