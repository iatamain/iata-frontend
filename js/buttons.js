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
document.querySelector("#listRoomsBody ul").addEventListener("click", (e)=>{
  if(e.target.parentNode.classList.contains("goToRoom")){
    goToRoom(e.target.parentNode.id);
  }
})
//Кнопочка перехода по друзья в interfaceDinamic
