{
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
	}
	let activeRadio = 0;
	let activeSceneNum = 0;
	let activeSceneName = "main";
	let listRoomsBody = {
		elementHTML: document.querySelector("#listRoomsBody"),
		elementChildHTML: document.querySelector("#listRoomsBody ul"),
		x: 0,
		y: 0,
		dy: 1,
		top: 0,
		rect: 0,
		stop: true
	};
	listRoomsBody.elementHTML.addEventListener("mousemove", e => {
		listRoomsBody.rect = listRoomsBody.elementHTML.getBoundingClientRect();
		listRoomsBody.x = e.clientX - listRoomsBody.rect.left;
		listRoomsBody.y = e.clientY - listRoomsBody.rect.top + 0.5;
	});

	listRoomsBody.elementHTML.addEventListener("mouseleave", e => {
		listRoomsBody.stop = true;
	});
	listRoomsBody.elementHTML.addEventListener("mouseenter", e => {
		listRoomsBody.stop = false;

	});
	let move = function(){
		let now = Date.now();
		let dt = (now - last)/1000;
		update(dt);
		render();
		last = now;
		requestAnimFrame(move);
	}
	let update= function(dt){
		let border = listRoomsBody.elementHTML.offsetHeight / 3;
		let down = listRoomsBody.elementHTML.offsetHeight / 2 + border
		let up = listRoomsBody.elementHTML.offsetHeight / 2 - border;
		let sensitivity = listRoomsBody.elementHTML.offsetHeight / 32;
		if(!listRoomsBody.stop){
			if(listRoomsBody.y > down){
				if(parseInt(listRoomsBody.elementChildHTML.style.top) > -11.729*4){
					console.log("...", listRoomsBody.top);
					listRoomsBody.top -= (up - Math.abs(listRoomsBody.elementHTML.offsetHeight - listRoomsBody.y))/sensitivity;
				}
			} else if (listRoomsBody.y < up){
				if(parseInt(listRoomsBody.elementChildHTML.style.top) < 0){
					listRoomsBody.top += (up - listRoomsBody.y) / sensitivity;
				}else{
				 	listRoomsBody.top = 0;
				}
			}
			listRoomsBody.elementChildHTML.style.top = listRoomsBody.top + "%";
		}
	}
	let render = function(){

	}
	function changeRadio(arg){
			let classN, ink;
			if(arg > activeRadio) classN = "left", ink = 1;
			if(arg < activeRadio) classN = "right", ink = -1;
			if(arg == activeRadio) return 0;
			document.querySelector(".active").setAttribute("class", "news-body deactive-"+classN);
			document.querySelector("#news" + pad(arg, 2)).setAttribute("style", "visibility: visible");
			document.querySelector("#news" + pad(arg, 2)).setAttribute("class", "news-body active");
			for(let i = activeRadio + ink; i * ink < arg * ink; i += ink){
				document.querySelector("#news" + pad(i, 2)).setAttribute("style", "visibility: hidden");
				document.querySelector("#news" + pad(i, 2)).setAttribute("class", "news-body deactive-" + classN);
			}
			activeRadio = arg;
	}
	function setNews(newsList){
		let news = document.querySelector("#news");
		news.innerHTML = "";
		for(let i = 0; i < newsList.length; i++){
			let currentNews = document.createElement("div");
			currentNews.setAttribute("id",  "news" + pad(i, 2));
			currentNews.setAttribute("class", i == 0 ? "news-body active" : "news-body deactive-right");
			let h1 = document.createElement("h1");
			h1.setAttribute("align", "center");
			h1.innerHTML = newsList[i].header;
			currentNews.appendChild(h1);
			let p = document.createElement("p");
			p.innerHTML = newsList[i].body;
			currentNews.appendChild(p);
			let div = document.createElement("div");
			div.setAttribute("class", "news-notation");
			let imgEl = document.createElement("img");
			imgEl.setAttribute("width", "350px");
			imgEl.setAttribute("src", newsList[i].img);
			div.appendChild(imgEl);
			currentNews.appendChild(div);
			news.appendChild(currentNews);
		}
		let footer = document.createElement("div");
		footer.setAttribute("class", "news-footer");
		for(let i = 0; i < newsList.length; i++){
			let radio = document.createElement("input");
			radio.setAttribute("onchange", `changeRadio(${i})`);
			radio.setAttribute("type", "radio");
			radio.setAttribute("id", "radio" + pad(i, 2));
			radio.setAttribute("name", "radio0");
			radio.checked = !i;
			footer.appendChild(radio);
			let label = document.createElement("label");
			label.setAttribute("for", "radio" + pad(i, 2));
			footer.appendChild(label);
		}
		news.appendChild(footer);
	}
	async function setScene(sceneName, sceneNum){
		function removeAllAnimClass(selector){
			["deactive-left", "deactive-right", "deactive-bottom", "deactive-left-temp", "deactive-right-temp", "deactive-bottom-temp"].forEach((name) => {
				document.querySelector(selector).classList.remove(name);
			})
		}
		let classN1 = sceneNum > activeSceneNum ? "right" : "left";
		let classN2 = sceneNum > activeSceneNum ? "left" : "right";
		if(sceneNum != activeSceneNum)
		for(i in interfaceData){
			document.querySelector("#" + i).style.pointerEvents = (i == sceneName ? "auto" : "none");
			for(j in interfaceData[i]){
				if(sceneNum > 1 && activeSceneNum > 1 && document.querySelector(`#${j}`).classList.contains("bigScene")){ //Ориентация по классу
					removeAllAnimClass("#" + j);
					document.querySelector("#" + j).classList.add(`deactive-${classN1}-temp`);
					if(i == sceneName){
						setTimeout(removeAllAnimClass, 20, "#" + j);
					}else{
						removeAllAnimClass("#" + j);
						if(i == activeSceneName){
							document.querySelector("#" + j).classList.add(`deactive-${classN2}`);
						}else{
							document.querySelector("#" + j).classList.add(`deactive-${classN2}-temp`);
						}
					}
				}else{
					removeAllAnimClass("#" + j);
					if(i != sceneName) document.querySelector("#" + j).classList.add(interfaceData[i][j]);
				}
			}
		}
		activeSceneName = sceneName;
		activeSceneNum = sceneNum;
	}
	function setInterface(){
		let avaImg = document.createElement("img");//Создаем и устанавливаем аву
		avaImg.setAttribute("src", snsPlayerInf.avatar);
		avaImg.setAttribute("width", "90px");
		document.querySelector(".portrait-crop").appendChild(avaImg);
		document.querySelector("#lvl > p").innerHTML = mainPlayerInf.lvl;;
		let nickName = document.querySelector("#nickName-text").innerHTML = mainPlayerInf.nickName;
		let clan = document.querySelector("#clan-text").innerHTML = "Клан: " + mainPlayerInf.clan;
		let lvl = document.querySelector("#lvl-text").innerHTML = "Уровень: " + mainPlayerInf.lvl;
		let element = document.querySelector("#element").innerHTML = "Стихия: " + mainPlayerInf.element;
		document.querySelector("#experience div").style.width = (mainPlayerInf.experience /  Math.floor(Math.pow(mainPlayerInf.lvl + 1, 2.8) * 5 - 5)) * 100 + "%";
		document.querySelector("#experience p").innerHTML = mainPlayerInf.experience + "/" + Math.floor(Math.pow(mainPlayerInf.lvl + 1, 2.8) * 5 - 5);
	}
	setScene("rooms", 1);
	setNews(dataNews);
	let last = Date.now();
	move(listRoomsBody);
}
