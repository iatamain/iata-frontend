class Circle {
   constructor(x=250, y=250, size=250, deep = 1, r=0, g=0, b=0, a=0){
      this.x = x;
      this.y = y;
      this.size = size;
      this.deep = deep;
      this.color = {
         r: r,
         g: g,
         b: b,
         a: a
      }
      this.childs = null;
   }
}

function getColor(data){
   let blockSize = 1;
   let countPix = 0;
   let tempColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 0
   }
   for(let i = 0; i < data.length; i += 4*blockSize){
      countPix++;
      tempColor.r += data[i];
      tempColor.g += data[i + 1];
      tempColor.b += data[i + 2];
      tempColor.a += data[i + 3];
   }
   tempColor.r /= countPix;
   tempColor.g /= countPix;
   tempColor.b /= countPix;
   tempColor.a /= countPix;
   return tempColor;
}
function push(obj2){
   let size = obj2.size / 2;
   let x = obj2.x;
   let y = obj2.y;
   let deep = obj2.deep + 1;
   obj2.childs = [
      new Circle(x - size, y - size, size, deep),
      new Circle(x - size, y + size, size, deep),
      new Circle(x + size, y - size, size, deep),
      new Circle(x + size, y + size, size, deep)
   ]
}
function test(obj, deep){
   if(deep < 5){
      if(Array.isArray(obj)){
         for(i in obj){
            push(obj[i]);
            test(obj[i].childs, deep + 1);
         }
      }else{
         push(obj);
         test(obj.childs, deep + 1);
      }
   }
}
function setColor(obj){
   if(Array.isArray(obj)){
      for(let i = 0; i < obj.length; i++) setColor(obj[i]);
   }else{
      let dataImg = ctx2.getImageData(obj.x - obj.size, obj.y - obj.size, Math.max(1, obj.size), Math.max(1, obj.size)).data;
      let tempColor = getColor(dataImg);
      obj.color.r = tempColor.r;
      obj.color.g = tempColor.g;
      obj.color.b = tempColor.b;
      obj.color.a = tempColor.a;
      if(obj.childs) setColor(obj.childs);
   }
}
function drawCircles(obj){
   if(Array.isArray(obj)){
      for(let i = 0; i < obj.length; i++) drawCircles(obj[i]);
   }else if(!obj.childs){
      ctx.fillStyle = `rgba(${obj.color.r}, ${obj.color.g}, ${obj.color.b}, ${obj.color.a})`;
      if(obj.deep <= 100){
         ctx.beginPath();
         ctx.arc(obj.x, obj.y, obj.size + 0.5, 0, 2*Math.PI);
         ctx.closePath();
         ctx.fill();
      }else{
         ctx.fillRect(obj.x - obj.size, obj.y - obj.size, obj.size * 2+1, obj.size * 2+1);
      }
   }else{
      drawCircles(obj.childs);
   }
}
