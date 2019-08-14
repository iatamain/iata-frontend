{
	document.querySelectorAll(".select").forEach((el)=> {
		el.addEventListener("click", function (e){
			if (e.target && e.target.matches(".option")) {
				this.querySelector(".shown").innerHTML = e.target.innerHTML;
			}
			this.classList.toggle("collapsed");
		});
	});
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		//document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
		msg("Поддержка мобильных устройств в разработке", "closeAcces");
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
		let speed = 3;
		if(!listRoomsBody.stop){
			if(listRoomsBody.y > down){
				if(listRoomsBody.top - (up - Math.abs(size - listRoomsBody.y)) * speed * dt>= -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0)){
					listRoomsBody.top -= (up - Math.abs(size - listRoomsBody.y)) * speed * dt;
				}else{
					listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0);
				}
			} else if (listRoomsBody.y < up){
				if(listRoomsBody.top +  (up - listRoomsBody.y) * speed * dt <= 0){
					listRoomsBody.top += (up - listRoomsBody.y) * speed * dt;
				}else{
				 	listRoomsBody.top = 0;
				}
			}
			listRoomsBody.elementChildHTML.style.top = listRoomsBody.top + "%";
		}
	}
	function changeCheckbox(){
		document.querySelector('#createRoom input[type="password"]').classList.toggle('hideInput');
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
	function setRooms(rooms, mode){
		if(mode == "set"){
			countRooms = 0;
			countPlayers = 0;
			document.querySelector("#listRoomsBody ul").innerHTML = "";
			for(i in rooms){
				let li = document.createElement("li");
				li.setAttribute("id", "roomN" + i);
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
				div.setAttribute("onclick", "msg('Не мешай им, " + snsPlayerInf.firstName + ", пусть играют с:')");
				div.setAttribute("class", "smallButton goToRoom");
				div.innerHTML = "<span>В бой</span>";
				li.appendChild(div);
				document.querySelector("#listRoomsBody ul").appendChild(li);
				rooms[i].isActive = true;
				countRooms++;
				countPlayers += rooms[i].playersInRoom;
			}
		}
		if(mode == "search"){
			let text = document.querySelector("#listRoomsHeader input").value;
			for(i in rooms){
				let searchIndex = rooms[i].name.indexOf(text);
				if(searchIndex == -1 && rooms[i].isActive){
					document.querySelector("#roomN" + i).style.display = "none";
					countRooms--;
					rooms[i].isActive = false;
				}else if(!rooms[i].isActive && searchIndex != -1){
					document.querySelector("#roomN" + i).style.display = "block";
					countRooms++;
					rooms[i].isActive = true;
				}
				if(searchIndex != -1){
					console.log(rooms[i].name.substr(0, searchIndex), rooms[i].name.substr(searchIndex, text.length), rooms[i].name.substr(searchIndex + text.length, rooms[i].name.length));
					document.querySelector("#roomN" + i + " p").innerHTML = rooms[i].name.substr(0, searchIndex) + '<font color = "#0ff">' + rooms[i].name.substr(searchIndex, text.length) +'</font>' + rooms[i].name.substr(searchIndex + text.length, rooms[i].name.length);
				}
			}
			if(listRoomsBody.top < -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0))
			listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0);

		}
		document.querySelector(".activePlayers").innerHTML = "Игроков онлайн: " + countPlayers;
		if(document.querySelector("#listRoomsHeader input").value == "") document.querySelector(".activeRooms").innerHTML = "Активных комнат: " + countRooms;
		else  document.querySelector(".activeRooms").innerHTML = "Результатов поиска: " + countRooms;
		listRoomsBody.elementChildHTML.style.top = listRoomsBody.top + "%";
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
	function msg(msg, type){
		if(type == "closeAcces"){
			document.querySelector("#modal-message").innerHTML = `<p>${msg}</p>`;
			document.querySelector("#modal").style.background = "#000";
			document.querySelector("#modal").style.display = "block";
		}else{
			document.querySelector("#modal p").innerHTML = msg;
			document.querySelector("#modal").style.display = "block";
		}
	}
	function closeMsg(msg){
		document.querySelector("#modal").style.display = "none";
	}
	setScene("rooms", 1);
	setNews(dataNews);
	let last = Date.now();
	move();
}
