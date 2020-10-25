let arrowToUp = document.querySelector("#arrow-to-up");
let arrowToDown = document.querySelector("#arrow-to-down");

window.addEventListener('scroll', (event)=>{ //Для появления/исчезновения кнопки для прокрутки
   if (pageYOffset > document.documentElement.clientHeight){
      arrowToUp.style.display = "flex";
   }else{
      arrowToUp.style.display = "none";
   }
   if(pageYOffset < document.body.clientHeight - document.documentElement.clientHeight){
      arrowToDown.style.display = "flex";
   }else{
      arrowToDown.style.display = "none";
   }
})
arrowToUp.addEventListener("click", function goUp(){ //Функция прокрутки страницы вверх
   //var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   if(pageYOffset > 0) {
      window.scrollBy(0,-100);
      timeOut = setTimeout(goUp,20);
   } else clearTimeout(timeOut);
})
arrowToDown.addEventListener("click", function goDown(){ //Функция прокрутки страницы вверх
   //var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   if(pageYOffset < document.body.clientHeight - document.documentElement.clientHeight) {
      window.scrollBy(0,100);
      timeOut2 = setTimeout(goDown,20);
   } else clearTimeout(timeOut2);
})
let expand = document.querySelector("#expand");
expand.addEventListener("click", ()=>{
   let prof = document.querySelector("#prof");
   prof.innerHTML = document.querySelector("#prof .wrapper").innerHTML;
})
