{
	document.querySelectorAll(".select").forEach((el)=> {
		el.addEventListener("click", function (e){
			if (e.target && e.target.matches(".option")) {
				this.querySelector(".shown").innerHTML = e.target.innerHTML;
			}
			this.classList.toggle("collapsed");
		});
	});
	document.querySelectorAll("input").forEach((el)=> {
		el.addEventListener("input", function (e){
			el.value = (/[A-Za-z0-9А-Яа-я\ \_\:\№\"\?\!\-\+\=\*\/\#\@\^\,\.\(\)\[\]\{\}\<\>\$\%\;\&]*/.exec(el.value));
		});
	});
	document.querySelectorAll("input").forEach((el)=> {
		el.addEventListener("click", function (e){
			el.classList.remove("wrong");
		});
	});
	document.querySelectorAll("input").forEach((el)=> {
		el.value = "";
		el.checked = false;
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
			document.querySelector("#news .active").setAttribute("class", "news-body deactive-"+classN);
			document.querySelector("#news" + pad(arg, 2)).setAttribute("style", "visibility: visible");
			document.querySelector("#news" + pad(arg, 2)).setAttribute("class", "news-body active");
			for(let i = activeRadio + ink; i * ink < arg * ink; i += ink){
				document.querySelector("#news" + pad(i, 2)).setAttribute("style", "visibility: hidden");
				document.querySelector("#news" + pad(i, 2)).setAttribute("class", "news-body deactive-" + classN);
			}
			activeRadio = arg;
	}
	function setRooms(mode, room){
		if(mode == "set"){
			countRooms = 0;
			countPlayers = 0;
			document.querySelector("#listRoomsBody ul").innerHTML = "";
			for(i in dataRooms){
				let li = document.createElement("li");
				li.setAttribute("id", "roomN" + i);
				let p = document.createElement("p");
				p.setAttribute("class", "nameRoom");
				let text = document.createTextNode(dataRooms[i].name);
				p.appendChild(text);
				li.appendChild(p);
				let p2 = document.createElement("p");
				p2.setAttribute("class", "typeRoom");
				p2.innerHTML = `${dataRooms[i].mode}: ${dataRooms[i].map} ${dataRooms[i].isClose ? "(Закрытая)" : ""}`;
				li.appendChild(p2);
				let p3 = document.createElement("p");
				p3.setAttribute("class", "playerInRoom");
				p3.innerHTML = `${dataRooms[i].playersInRoom}/${dataRooms[i].capacity}`;
				li.appendChild(p3);
				let div = document.createElement("div");
				div.setAttribute("onclick", `goToRoom(${i})`);
				div.setAttribute("class", "smallButton goToRoom");
				div.innerHTML = "<span>В бой</span>";
				li.appendChild(div);
				document.querySelector("#listRoomsBody ul").appendChild(li);
				dataRooms[i].isActive = true;
				countRooms++;
				countPlayers += dataRooms[i].playersInRoom;
			}
		}
		if(mode == "search"){
			let text = document.querySelector("#listRoomsHeader input").value.trim();
			for(i in dataRooms){
				let searchIndex = dataRooms[i].name.indexOf(text);
				if(searchIndex == -1 && dataRooms[i].isActive){
					document.querySelector("#roomN" + i).style.display = "none";
					countRooms--;
					dataRooms[i].isActive = false;
				}else if(!dataRooms[i].isActive && searchIndex != -1){
					document.querySelector("#roomN" + i).style.display = "block";
					countRooms++;
					dataRooms[i].isActive = true;
				}
				if(searchIndex != -1){
					document.querySelector("#roomN" + i + " p").innerHTML = "";
					let pushText = document.createTextNode(dataRooms[i].name.substr(0, searchIndex));
					document.querySelector("#roomN" + i + " p").appendChild(pushText);
					let font = document.createElement("font");
					font.setAttribute("color", "#0FF");
					pushText = document.createTextNode(dataRooms[i].name.substr(searchIndex, text.length));
					font.appendChild(pushText);
					document.querySelector("#roomN" + i + " p").appendChild(font);
					pushText = document.createTextNode(dataRooms[i].name.substr(searchIndex + text.length, dataRooms[i].name.length));
					document.querySelector("#roomN" + i + " p").appendChild(pushText);
					//document.querySelector("#roomN" + i + " p").innerHTML = dataRooms[i].name.substr(0, searchIndex) + '<font color = "#0ff">' + dataRooms[i].name.substr(searchIndex, text.length) +'</font>' + dataRooms[i].name.substr(searchIndex + text.length, dataRooms[i].name.length);
				}
			}
			if(listRoomsBody.top < -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0))
			listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - 8, 0);

		}
		if(mode == "add"){
			dataRooms[lastIdRoom++] = room;
			setRooms("set");
			setRooms("search");
		}
		if(mode == "del"){
			delete dataRooms[room];
			setRooms("set");
			setRooms("search");
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
		if(document.querySelector("#menu" + activeSceneNum)) document.querySelector("#menu" + activeSceneNum).classList.remove("active");
		if(document.querySelector("#menu" + sceneNum)) document.querySelector("#menu" + sceneNum).classList.add("active");
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
				if(sceneNum > 1 && activeSceneNum > 1 && document.querySelector(`#${j}`).classList.contains("bigScene")){ //Если переход осуществляется с большой сцены на большую
					removeAllAnimClass("#" + j);
					document.querySelector("#" + j).classList.add(`deactive-${classN1}-temp`); //Моментальное перемещение в стартовую точку движения
					if(i == sceneName){ //Если наткнулись на целевую сцену
						setTimeout(removeAllAnimClass, 20, "#" + j); //Задержка, чтоб успел переместиться в стартовую точку
					}else{
						removeAllAnimClass("#" + j);
						if(i == activeSceneName){ //Если активная сцена -- плавно ее убираем
							document.querySelector("#" + j).classList.add(`deactive-${classN2}`);
						}else{ //Иначе -- переносим моментально
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
	function createRoom(){
		let nameRoom = document.querySelector("#createRoom input[type='text']").value.trim();
		let passwordRoom = document.querySelector("#createRoom input[type='password']").value.trim();
		let modeRoom = document.querySelector("#createRoom .shown").innerHTML;
		let mapRoom = "TestMap";
		let isCloseRoom = document.querySelector("#createRoom input[type='checkbox']").checked;
		let isCreated = false;
		let isSelected = true;
		switch (modeRoom) {
			case "Каждый сам за себя":
				modeRoom = "DM";
				break;
			case "Командный бой":
				modeRoom = "TDM";
				break;
			case "Захват флага":
				modeRoom = "CTF";
				break;
			case "Захват точки":
				modeRoom = "CP";
				break;
			default:
				isSelected = false;
		}
		for(i in dataRooms){
			if(dataRooms[i].name == nameRoom){
				isCreated = true;
			}
		}
		if(isCreated){
			msg("Комната с таким именем уже существует");
		}else if(!isSelected){
			msg("Выберите режим игры");
		}else{
			msg("Комната успешно создана");
			setRooms("add", {
				name: nameRoom,
				password: passwordRoom,
				mode: modeRoom,
				map: mapRoom,
				capacity: 14,//Вместимость (Хранится на серве)
				playersInRoom: 0, //Вычисляется на серве
				isBought: true, //Куплена ли комната (Хранится на серве)
				isActive: true, //Только на фронте
				isClose: isCloseRoom //Является ли комната запароленной
			});
		}
		//Выбран ли режим
		//Длина имени+
		//Уже существует+
		//Недопустимые символы+
		//Тримминг+
	}
	function goToRoom(id){
		if(dataRooms[id].isClose){
			let password = 3;
			msg("Введите пароль", "prompt", function testPass(arg){
				password = arg;
				if(password == dataRooms[id].password){
					msg("Пароль верный");
				}else{
					msg("Пароль не верный", "prompt", testPass, "wrong");
				}
			});
		}else{
			msg("Она открыта, но играть еще нельзя:D")
		}
	}
	setScene("rooms", 1);
	setNews(dataNews);
	let last = Date.now();
	move();
}
