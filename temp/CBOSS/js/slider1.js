let elements = document.querySelectorAll("#slider1 .slider1_element");
let cur = 0; //Текущая видимая картинка
let n = 10000;
let m = 20000;
setInterval(swapImage, n); //Менять картинку каждые n/1000 сек.
//n мало? поставьте  m.

let buttonLeft = document.querySelector("#slider1 #slider1_left");
buttonLeft.addEventListener("click", ()=>swapImage("left"));

let buttonRight = document.querySelector("#slider1 #slider1_right");
buttonRight.addEventListener("click",  ()=>swapImage("right"));

function swapImage(side){ //Меняет картинки в слайдере
   elements[cur].classList.remove("active");
   if(side == "left"){
      cur = (cur - 1 + elements.length) % elements.length;
   }else{
      cur = (cur + 1) % elements.length;
   }
   elements[cur].classList.add("active");
}
