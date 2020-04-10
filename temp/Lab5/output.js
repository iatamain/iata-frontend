function print(text, elem){
	if(elem){
		//console.log(elem)
		elem = document.querySelector(elem);
		
	}else{
		elem = document.querySelector("#main");
	}
	let temp = document.createElement("div");
	temp.setAttribute("class", "out")
	temp.innerHTML = text;
	elem.appendChild(temp);
}