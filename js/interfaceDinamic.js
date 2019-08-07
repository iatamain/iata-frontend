{
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
	}
	let countRooms = 0;
	let countPlayers = 0;
	let activeRadio = 0;
	let activeSceneNum = 0;
	let activeSceneName = "main";
	let listRoomsBody = {
		elementHTML: document.querySelector("#listRoomsBody"),
		elementChildHTML: document.querySelector("#listRoomsBody ul"),
		sizeElement: 11.84,
		elementsPerPage: 8,
		x: 0,
		y: 0,
		dy: 1,
		top: 0,
		rect: 0,
		stop: true
	};
	function msg(){
		alert("Не мешай им, " + snsPlayerInf.firstName + ", пусть играют с:");
	}
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
		last = now;
		requestAnimFrame(move);
	}
	let update= function(dt){
		let size = listRoomsBody.elementHTML.offsetHeight;
		let border = size / 3;
		let down = size / 2 + border
		let up = size / 2 - border;
		let sensitivity = size / 32;
		if(!listRoomsBody.stop){
			if(listRoomsBody.y > down){
				if(listRoomsBody.top - (up - Math.abs(size - listRoomsBody.y))/sensitivity >= -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0)){
					listRoomsBody.top -= (up - Math.abs(size - listRoomsBody.y))/sensitivity;
				}else{
					listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0);
				}
			} else if (listRoomsBody.y < up){
				if(listRoomsBody.top +  (up - listRoomsBody.y) / sensitivity <= 0){
					listRoomsBody.top += (up - listRoomsBody.y) / sensitivity;
				}else{
				 	listRoomsBody.top = 0;
				}
			}
			listRoomsBody.elementChildHTML.style.top = listRoomsBody.top + "%";
		}
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
	function setRooms(rooms){
		countRooms = 0;
		countPlayers = 0;
		document.querySelector("#listRoomsBody ul").innerHTML = "";
		for(i in rooms){
			let li = document.createElement("li");
			let p = document.createElement("p");
			p.setAttribute("class", "nameRoom");
			p.innerHTML = rooms[i].name;
			li.appendChild(p);
			let p2 = document.createElement("p");
			p2.setAttribute("class", "typeRoom");
			p2.innerHTML = `${rooms[i].mode}: ${rooms[i].map}`;
			li.appendChild(p2);
			let p3 = document.createElement("p");
			p3.setAttribute("class", "playerInRoom");
			p3.innerHTML = `${rooms[i].playersInRoom}/${rooms[i].capacity}`;
			li.appendChild(p3);
			let div = document.createElement("div");
			div.setAttribute("onclick", "msg()");
			div.setAttribute("class", "smallButton goToRoom");
			div.innerHTML = "<span>В бой</span>";
			li.appendChild(div);
			document.querySelector("#listRoomsBody ul").appendChild(li);
			countRooms++;
			countPlayers += rooms[i].playersInRoom;
		}
		document.querySelector(".activePlayers").innerHTML = "Игроков онлайн: " + countPlayers;
		document.querySelector(".activeRooms").innerHTML = "Активных комнат: " + countRooms;
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
	function setScene(sceneName, sceneNum){
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
