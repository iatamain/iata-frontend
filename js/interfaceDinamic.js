{
	window.addEventListener("load", () =>{
		setTimeout(()=>{
			document.querySelector("#game").style.display = "block";
			document.querySelector("#preload").style.display = "none";
		}, 500);
	});
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
	let countFriends = 0;
	let activeRadio = 0;
	let activeSceneNum = 0;
	let activeSceneName = "main";
	let listFriendssBody = {
		elementHTML: document.querySelector("#friends"),
		elementChildHTML: document.querySelector("#friends ul"),
		sizeElement: 14.67,
		elementsPerPage: 6,
		x: 0,
		y: 0,
		dy: 1,
		top: 0,
		left: 0,
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
	listFriendssBody.elementHTML.addEventListener("mousemove", e => {
		listFriendssBody.rect = listFriendssBody.elementHTML.getBoundingClientRect();
		listFriendssBody.x = e.clientX - listFriendssBody.rect.left;
		listFriendssBody.y = e.clientY - listFriendssBody.rect.top;
	});
	listFriendssBody.elementHTML.addEventListener("mouseleave", e => {
		listFriendssBody.stop = true;
	});
	listFriendssBody.elementHTML.addEventListener("mouseenter", e => {
		listFriendssBody.stop = false;
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
				if(listRoomsBody.top - (up - Math.abs(size - listRoomsBody.y)) * speed * dt>= -listRoomsBody.sizeElement * Math.max(countRooms - listRoomsBody.elementsPerPage, 0)){
					listRoomsBody.top -= (up - Math.abs(size - listRoomsBody.y)) * speed * dt;
				}else{
					listRoomsBody.top = -listRoomsBody.sizeElement * Math.max(countRooms - listRoomsBody.elementsPerPage, 0);
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
		size = listFriendssBody.elementHTML.offsetWidth;
		border = size / 3;
		down = size / 2 + border
		up = size / 2 - border;
		speed = 0.5;
		if(!listFriendssBody.stop){
			if(listFriendssBody.x > down){
				if(listFriendssBody.left - (up - Math.abs(size - listFriendssBody.x)) * speed * dt >= -(listFriendssBody.sizeElement * Math.max(countFriends - listFriendssBody.elementsPerPage, 0) - 10)){
					listFriendssBody.left -= (up - Math.abs(size - listFriendssBody.x)) * speed * dt;
				}else{
					listFriendssBody.top = -listFriendssBody.sizeElement * Math.max(countFriends - listFriendssBody.elementsPerPage, 0);
				}
			} else if (listFriendssBody.x < up){
				if(listFriendssBody.left +  (up - listFriendssBody.x) * speed * dt <= 0){
					listFriendssBody.left += (up - listFriendssBody.x) * speed * dt;
				}else{
				 	listFriendssBody.left = 0;
				}
			}
			listFriendssBody.elementChildHTML.style.left = listFriendssBody.left + "%";
		}
	}
	function changeCheckbox(){ //Закрытая комната?
		document.querySelector('#createRoom input[type="password"]').classList.toggle('hideInput');
	}
	function changeRadio(arg){ //Для новостей
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

	function setNews(newsList){
		let news = document.querySelector("#news");
		news.innerHTML = "";
		for(let i = 0; i < newsList.length; i++){
			let currentNews = document.createElement("div");
			currentNews.setAttribute("id",  "news" + pad(i, 2));
			currentNews.setAttribute("class", i == 0 ? "news-body active" : "news-body deactive-right");
			setTimeout(1000, ()=>currentNews.style.display = i == 0 ? "block" : 'none');
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
	function setFriends(){
		document.querySelector("#friends-list").innerHTML = "";
		for(let i = 0; i < snsPlayerInf.friends.length; i++){
			let li = document.createElement("li");
			let p = document.createElement("p");
			let text = document.createTextNode(snsPlayerInf.friends[i].firstName + " " + snsPlayerInf.friends[i].lastName);
			p.appendChild(text);
			li.appendChild(p);
			let div = document.createElement("div");
			div.classList.add("friend-ava");
			let ava = document.createElement("img");
			ava.setAttribute("width", "90px");
			ava.setAttribute("src", snsPlayerInf.friends[i].avatar);
			div.appendChild(ava);
			li.appendChild(div);
			p = document.createElement("p");
			p.innerHTML = "Рейтинг: 1400";
			li.setAttribute("onclick", `msg('Разве должно было что-то произойти?)', 'confirm', () => {
				msg("Ну окееей.-.");
				window.open("${snsPlayerInf.friends[i].link}", '_blank');
			})`);
			li.appendChild(p);
			document.querySelector("#friends-list").appendChild(li);
			countFriends++;
		}
	}
	setNews(dataNews);
	let last = Date.now();
	move();
}
