var socket = io('ws://itracers.xyz:4000', {
transports: ['websocket'],
query: {
   auth_key: "5cb788743808b2b92665b5e9eed204b1",
   viewer_id: "135534097",
   snsName: session.snsName}
});
socket.on('connect', ()=>{
   socket.on('/rooms/list', ()=>{})
   //socket.emit('/rooms/create', "testName", 42, 1, "deathmatch", "");
   socket.emit('/rooms/list');
});
