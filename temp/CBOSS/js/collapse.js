let main = document.querySelector("main");
let stat = []; //Состояние свернутости collapse.
main.addEventListener("click", (event)=>{
   if(event.target.classList.contains("collapse-end")){
      let collapse = event.target.parentNode;
      let content = collapse.querySelector(".collapse_content");
      if(stat[collapse.id]){ //Если уже развернут, то свернуть
         content.style.padding = "0px";
         content.style.maxHeight = "0px";
         setTimeout(()=>{
            let collapseEnd = collapse.querySelector(".collapse-end");
            collapseEnd.innerHTML = "&#9660;";
            stat[collapse.id] = false;
         }, 500);
      }else{ //Иначе, развернуть
         content.style.padding = "20px";
         content.style.maxHeight = "2500px";
         setTimeout(()=>{
            let collapseEnd = collapse.querySelector(".collapse-end");
            collapseEnd.innerHTML = "&#9650";
            stat[collapse.id] = true;
            window.location.href="#start" + collapse.dataset.date //И перейти на якорь
         }, 500);
         window.location.href="#start" + collapse.dataset.date
      }
   }
})
let fullHeaders = [];
let state = false; //Сжаты ли уже заголовки?
window.addEventListener('resize', toReduceHeader)
function toReduceHeader(){ //Сократить заголовки блоков до дат, если ширина слишком маленькая или наоборот
   let collapses = document.querySelectorAll(".collapse");
   if(window.innerWidth < 1250 && !state){ //Сокращаем
      state = true;
      for(let i = 0; i < collapses.length; i++){
         let header = collapses[i].querySelector(".collapsible-start h2");
         fullHeaders[collapses[i].id] = header.innerHTML;
         setTimeout(()=>{}, 500);
         header.innerHTML = "День " + collapses[i].dataset.date + ". " + (23 + collapses[i].dataset.date*1) + ".11.2019 ";
      }
   }else if(window.innerWidth >= 1250 && state){ //Восстанавливаем обратно
      state = false;
      for(let i = 0; i < collapses.length; i++){
         let header = collapses[i].querySelector(".collapsible-start h2");
          header.innerHTML = fullHeaders[collapses[i].id];
      }
   }
}
toReduceHeader(); //Запускаем при старте страницы
