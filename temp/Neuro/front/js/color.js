class Color{
   constructor(r, g, b, a){
      if(typeof r == "object"){
         let color = r;
         this.r = color.r;
         this.g = color.g;
         this.b = color.b;
         this.a = color.a || 255;
      }
      else if(typeof r == "string" && !g && !b && !a){ //Если #FF0000;
         let hexColor = r;
         if(hexColor.length == 4){
            this.r = parseInt(hexColor[1]+hexColor[1], 16);
            this.g = parseInt(hexColor[2]+hexColor[2], 16);
            this.b = parseInt(hexColor[3]+hexColor[3], 16);
            this.a = 255;
         }else if(hexColor.length == 7){
            this.r = parseInt(hexColor[1]+hexColor[2], 16);
            this.g = parseInt(hexColor[3]+hexColor[4], 16);
            this.b = parseInt(hexColor[5]+hexColor[6], 16);
            this.a = 255;
         }else{
            throw 'hex цвет должен состоять из # и (3 || 6) значений';
         }
      }else{
         this.r = r;
         this.g = g;
         this.b = b;
         this.a = a || 255;
      }
      this.toString = this.valueOf = this.toHEX;
   }
   compare(r, g, b, a){
      let color = new Color(r, g, b, a);
      return this.toRGBA() == color.toRGBA();
   }
   toHEX(){
      let r = this.r.toString(16).lengthUp(2);
      let g = this.g.toString(16).lengthUp(2);
      let b = this.b.toString(16).lengthUp(2);
      return "#" + r + g + b;
   }
   toRGB(){
      return `rgb(${this.r}, ${this.g}, ${this.b})`
   }
   toRGBA(){
      return `rgb(${this.r}, ${this.g}, ${this.b}, ${(this.a/255).toFixed(2)})`
   }
}
String.prototype.lengthUp = function(len){
   let str = this;
   while(str.length < len){
      str = "0" + str;
   }
   return str;
}
