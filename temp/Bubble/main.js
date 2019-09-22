let ctx = document.querySelector("canvas").getContext("2d");
let tempCanv = document.createElement("canvas");
tempCanv.setAttribute("width", "500");
tempCanv.setAttribute("height", "500");
let ctx2 = tempCanv.getContext("2d");

let img = new Image();
let circle = new Circle();
let last;
let type = parseGet(window.location.href).type || 0;
let href = parseGet(window.location.href).href;
let src = parseGet(window.location.href).src;
document.querySelector("canvas").addEventListener("mousemove", e => {
   let rect = document.querySelector("canvas").getBoundingClientRect();
   let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
   (function check(obj){
      if(x < obj.x + obj.size && x > obj.x - obj.size && y < obj.y + obj.size && y > obj.y - obj.size){
         if(obj.childs){
            for(i in obj.childs) check(obj.childs[i]);
         }else{
            if(Math.sqrt((obj.x - x) * (obj.x - x) + (obj.y - y) * (obj.y - y)) < obj.size){
               if(obj.deep < 8){
                  push(obj);
                  setColor(obj);
                  ctx.clearRect(0, 0,500, 500);
                  drawCircles(circle);
               }
            }
         }
      }
   })(circle);
});
function play(){
   let now = Date.now();
   let dt = (now - last) / 1000;
   update(dt);
   render();
   last = now;
   requestAnimFrame(play);
}
function preload(){
   last = Date.now();
   img.crossOrigin = "Anonymous";
   if(type == "h"){
      img.src = "R.jpg";
   }else{
      img.src = src;
   }
   img.onerror = ()=>{
      img.src = "cfu.png";
   }
   img.onload = ()=>{
      ctx2.drawImage(img, 0, 0, 500, 500);
      //test(circle, 2);
      setColor(circle);
      drawCircles(circle);
      play();
   }
}
function update(dt){

}
function render(){

}
var requestAnimFrame = (()=>{
	return requestAnimationFrame ||
	webkitRequestAnimationFrame ||
	mozRequestAnimationFrame ||
	oRequestAnimationFrame ||
	msRequestAnimationFrame ||
	function(callback) {
	     setTimeout(callback, 16);
	};
})();
preload();
