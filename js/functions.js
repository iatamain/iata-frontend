var pressedKeyscheck = false;
var pressedKeys = {};
function setKey(event, status) {
	var code = event.keyCode;
	var key;

	switch(code) {
		case 32:
			key = 'SPACE'; break;
		case 37:
			key = 'LEFT'; break;
		case 38:
			key = 'UP'; break;
		case 39:
			key = 'RIGHT'; break;
		case 40:
			key = 'DOWN'; break;
		default:
			key = String.fromCharCode(code); // Convert ASCII codes to letters
	}
	pressedKeys[key] = status;
}

document.addEventListener('keydown', function(e) {
	setKey(e, true);
});

document.addEventListener('keyup', function(e) {
	setKey(e, false);
});

window.addEventListener('blur', function() {
	pressedKeys = {};
});

function isDown(key){
	return pressedKeys[key.toUpperCase()];
}
function parseGet(getHref){
	try {
		let arr = getHref.split("?")[1].split("&");
		let obj = {};
		for(let i = 0; i < arr.length; i++){
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		return obj;
	}catch (e){
		return 0;
	}
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 50);
	};
})();
function send(data,  url, method, collback){
	fetch("https://itracers.xyz:8443" + url, {
	method: method,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		"auth_key": parseGet(window.location.href).auth_key,
		"viewer_id": parseGet(window.location.href).viewer_id,
		"snsName": parseGet(window.location.href).runner
	},
	body: JSON.stringify(data)
	})
	.then(collback)
	.catch(function (error) {
		processError(error, "itracers.xyz")
		console.log('Request failed ', error );
	});
}
function msg(msg, type, callback, inputStyle){
	if(type == "closeAcces"){
		document.head.innerHTML = `
		<title>IATA</title>
		<meta charset = "utf-8">
		<meta name = "viewport" content = "width=device-width, initial-scale=1">
		<link rel = "stylesheet" href = "css/style.css">`;
		document.body.innerHTML = "";
		let div1 = document.createElement("div");
		div1.setAttribute("id", "modal-message");
		let div2 = document.createElement("div");
		div2.setAttribute("id", "modal");
		div2.appendChild(div1);
		document.body.appendChild(div2);
		document.querySelector("#modal").style.background = "#000";
		document.querySelector("#modal").style.display = "block";
		document.querySelector("#modal-message").style.display = "block";
		document.querySelector("#modal-message").innerHTML = `<p>${msg}</p>`;
	}else if(type == "prompt"){
		let div = document.querySelector("#modal-message");
		div.innerHTML = "";
		let p = document.createElement("p");
		p.innerHTML = msg
		div.appendChild(p);
		let input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("placeholder", "Пароль от комнаты");
		if(inputStyle == "wrong") {
			input.classList.add("wrong");
			p.innerHTML = "Неверный пароль";
			p.style.color = "red";
		}
		div.appendChild(input);
		let btn = document.createElement("div");
		btn.classList.add("smallButton");
		btn.classList.add("prompt");
		let span = document.createElement("span");
		span.innerHTML ="Oк";
		btn.appendChild(span);
		div.appendChild(btn);
		let btnRed = document.createElement("div");
		btnRed.classList.add("smallButton");
		btnRed.classList.add("prompt");
		btnRed.classList.add("red");
		span = document.createElement("span");
		span.innerHTML ="Oтмена";
		btnRed.appendChild(span);
		div.appendChild(btnRed);
		document.querySelector("#modal").style.display = "block";
		document.querySelector("#modal-message").style.display = "block";
		btn.addEventListener("click", () => {
			closeMsg();
			callback(input.value);
		});
		btnRed.addEventListener("click", () => {
			closeMsg();
		});
		input.addEventListener("input", function (e){
			input.value = (/[A-Za-z0-9А-Яа-я\ \_\:\№\"\?\!\-\+\=\*\/\#\@\^\,\.\(\)\[\]\{\}\<\>\$\%\;\&]*/.exec(input.value));
		});
		input.addEventListener("click", function (e){
			input.classList.remove("wrong");
			p.innerHTML = msg;
			p.style.color = "white";
		});
	}else if(type == "confirm"){
		let div = document.querySelector("#modal-message");
		div.innerHTML = "";
		let p = document.createElement("p");
		p.innerHTML = msg
		div.appendChild(p);
		let btn = document.createElement("div");
		btn.classList.add("smallButton");
		btn.classList.add("confirm");
		let span = document.createElement("span");
		span.innerHTML ="Да";
		btn.appendChild(span);
		div.appendChild(btn);
		let btnRed = document.createElement("div");
		btnRed.classList.add("smallButton");
		btnRed.classList.add("confirm");
		btnRed.classList.add("red");
		span = document.createElement("span");
		span.innerHTML ="Нет";
		btnRed.appendChild(span);
		div.appendChild(btnRed);
		document.querySelector("#modal").style.display = "block";
		document.querySelector("#modal-message").style.display = "block";
		btn.addEventListener("click", () => {
			closeMsg();
			callback();
		});
		btnRed.addEventListener("click", () => {
			closeMsg();
		});
	}else{
		let div = document.querySelector("#modal-message");
		div.innerHTML = "";
		let p = document.createElement("p");
		p.innerHTML = msg
		div.appendChild(p);
		let btn = document.createElement("div");
		btn.setAttribute("onclick", "closeMsg()");
		btn.classList.add("smallButton");
		let span = document.createElement("span");
		span.innerHTML ="Oк";
		btn.appendChild(span);
		div.appendChild(btn);
		document.querySelector("#modal").style.display = "block";
		document.querySelector("#modal-message").style.display = "block";
	}
}
function closeMsg(){
	document.querySelector("#modal-message").style.display = "none";
	document.querySelector("#modal").style.display = "none";
}

function processError(error, param){
	switch (param) {
		case "itracers.xyz":
			msg("Ошибка подключения к нашим серверам:с<br>" + error, "closeAcces");
			break;
		case "apivk":
			msg("Не удалось отправить запрос:с<br>" + error);
			break;
		case "okGetCurrentUser":
			msg("Не удалось получить инфу о текущем пользователе:С<br>" + error, "closeAcces");
			break;
		case "okGetAppUsers":
			msg("Не удалось получить список друзей:С<br>" + error);
			break;
		default:
			msg("Ошибка подключения к " + param + ".<br>" + error, "closeAcces");
	}
	//Ошибка инициализации ок
	//Ошибка запроса данных текущего пользователя ok
	//Ошибка запроса друзей ok
	//Ошибка запроса информации о друзьях ok
	//Ошибка инициализации vk
	//Ошибка запроса данных текущего пользователя vk
	//Ошибка запроса друзей vk
	//Ошибка запроса информации о друзьях vk
	//Ошибка подключения к серверам
	//Ошибка подключения к websocket
}
function startGame(){
	document.querySelector("#interface").style.display = "none";
	document.querySelector("#canvasBack").style.display = "none";
	document.querySelector("#canvasPlay").style.display = "block";
	Game.init();
	Game.start();
	Background.stop();
}
function stopGame(){
	document.querySelector("#interface").style.display = "block";
	document.querySelector("#canvasBack").style.display = "block";
	document.querySelector("#canvasPlay").style.display = "none";
	Game.stop();
	Background.start();
}
