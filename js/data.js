fetch("https://itracers.xyz:8443/api/vkauth", { 
method: 'post', 
body: JSON.stringify(parseGet(window.location.href))
})
.then(response=>console.log(' .... ', response.json()))
.catch(function (error) { 
console.log('Request failed ', error ); 
}); 
console.log(JSON.stringify(parseGet(window.location.href)));
var player = {
	id: 24234324242,
	gameId: 45,
	firstName: "Иван",
	lastName: "Иванов",
	nickName: "Ivanushka",
	age: 18,
	avatar: "http://osh.advokatura.kg/sites/default/files/default-avatar.png",
	sex: "male",
	country: "Рашка",
	amountCrystal: 100,
	lvl: 42,
	experience: 24,
	clan: "Warriors",
	rank: "1234",
	element: "Terra",
	isFirstEntry: true,
	isFirstEntryToday: true,
	friends: [{
		nickName: "Чувак",
		avatar: "https://pp.userapi.com/c855024/v855024193/7d6dd/bb7G4H9gvjY.jpg",
		link: "https://vk.com/vetel_volkov",
		//Стата
	}],
	/*
	*Достижения и их прогресс
	*Статистика игрока(кол-во убийств, кол-во боев, кол-во дней игры)
	*Купленные объекты
	*Прокачка игрока
	*Рейтинг игрока и его позиция в таблице, 
	*Который день подряд заходит игрок. 
	*/
}
var img = document.createElement("img");//Создаем и устанавливаем аву
img.setAttribute("src", player.avatar); 
img.setAttribute("width", "90px"); 
document.querySelector(".portrait-crop").appendChild(img);
console.log(parseGet(window.location.href));

