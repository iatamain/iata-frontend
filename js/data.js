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
document.querySelector("img").setAttribute("src", player.avatar);