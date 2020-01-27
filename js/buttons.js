document.querySelector("#btn-CreateRoom").addEventListener("click", ()=>{
  createRoom();
  //goToRoom(id);
});
document.querySelector("#btn-chooseMap").addEventListener("click", ()=>{
  msg('Карт еще нет с:'); //from functions.js
})
document.querySelector("#btn-closeMsg").addEventListener("click", ()=>{
  closeMsg();
})
//Тут кнопочки "В бой" нет, но вы держитесь:D Она в roomsS
//Кнопочка перехода по друзья в interfaceDinamic
