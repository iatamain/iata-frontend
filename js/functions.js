function parseGet(getHref){
	try {
		let arr = getHref.split("?")[1].split("&");
		let obj = {};
		for(let i = 0; i < arr.length; i++){
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		return obj;
	}catch {
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
function msg(msg, type){
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
		document.querySelector("#modal-message").innerHTML = `<p>${msg}</p>`;
		document.querySelector("#modal").style.background = "#000";
		document.querySelector("#modal").style.display = "block";
	}else{
		document.querySelector("#modal p").innerHTML = msg;
		document.querySelector("#modal").style.display = "block";
	}
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
