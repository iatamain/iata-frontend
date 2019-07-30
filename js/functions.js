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
function send(data,  url, method, collback){
	fetch("https://itracers.xyz:8443" + url, {
	method: method,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		"auth_key": parseGet(window.location.href).auth_key,
		"viewerId": parseGet(window.location.href).viewer_id,
		"snsName": parseGet(window.location.href).runner
	},
	body: JSON.stringify(data)
	})
	.then(collback)
	.catch(function (error) {
	console.log('Request failed ', error );
	});
}
function setInterface(){
	let AvaImg = document.createElement("img");//Создаем и устанавливаем аву
	AvaImg.setAttribute("src", snsPlayerInf.avatar);
	AvaImg.setAttribute("width", "90px");
	document.querySelector(".portrait-crop").appendChild(AvaImg);

	let nickName = document.querySelector("#nickName-text").innerHTML = mainPlayerInf.nickName;
	let clan = document.querySelector("#clan-text").innerHTML = "Клан: " + mainPlayerInf.clan;
	let lvl = document.querySelector("#lvl-text").innerHTML = "Уровень: " + mainPlayerInf.lvl;
	let element = document.querySelector("#element").innerHTML = "Стихия: " + mainPlayerInf.element;
}
