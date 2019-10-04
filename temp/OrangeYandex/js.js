let ctx = document.querySelector("canvas").getContext("2d");
console.log(ctx);

let lost; //Последнее время на отрисовку

let gravity = 250; // px/sec
let speed = 10;

let arrKey = [];

let isGrounded;

var sqr = {
  x: 800/2, //исправить
  y: 600/2, //исправить
  dx: 0,
  dy: 0,
  sizeX: 50,
  sizeY: 50
}

document.addEventListener("keyup", (event) => { //ES6 Callback function
  // console.log(event);
  // numberKeyUp = event.keyCode;
  arrKey[event.keyCode] = false;
});

document.addEventListener("keydown", (event) => { //ES6 Callback function
  // console.log(event);
  // numberKeyDown = event.keyCode;
  arrKey[event.keyCode] = true;
});

function play(){  //Вызов функций
  let now = Date.now();
  let dt = (now - lost)/1000; //Дельта время
  update(dt);
  render();
  lost = now;
  requestAnimFrame(play);
}

function update(dt){  //Просчитывание, столкнование и.т.п
  // console.log(sqr.y)
  // sqr.y += gravity * dt;

  // console.log(isGrounded);

  if(sqr.y < 550) {
    sqr.y += gravity * dt;
    isGrounded = false;
  } else {
    isGrounded = true;
  }
  if(sqr.x > 0){
    if(isDown(37)) { //Стрелочка влево
      sqr.x -= speed * dt * 20;
    }
  }

  if(sqr.x < 750){
    if(isDown(39)) { //Стрелочка вправо
      sqr.x += speed * dt * 20;
    }
  }

  if(isDown(32)) { //Прыжок
    if(isGrounded) {
      sqr.y -= speed * dt * 1000;
    }
  }
  // if(isDown("")){
  //   sqr.y -= speed * dt * 20;
  // }

}

function render(){
  ctx.clearRect(0,0, 800, 600);
  ctx.fillRect(sqr.x, sqr.y, sqr.sizeX, sqr.sizeY);   //Перегрузки: x,y,size,size

}

var requestAnimFrame = (function(){
  return window.requestAnimationFrame ||    //????
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback,50);
  }
})();

function isDown(key) {
    // console.log("Request: " + key);
    return arrKey[key];
    // for(let i = 0; i < arrKey.lenght; i++) {
    //   if(arrKey[i] == false){
    //     console.log(arrKey[i] + "isRequested, return True");
    //     return true;
    //   }
    //   if(arrKey[i] == true)
    //     console.log(arrKey[i] + "isRequested, return False");
    //     return false;
    // }
}

lost = Date.now();
play();
