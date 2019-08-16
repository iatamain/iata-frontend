class PlayerInf {
	constructor() {
		this.nickName = "Temp";
		this.clan = "Temp";
		this.element = "Temp";
		this.id = 42;
		this.rank = 42;
		this.rankingPos = 42;
		this.lvl = 2;
		this.experience = 42;
		this.amountCrystal = 42;
		this.progress = {};
		this.achievements = {};
		this.purchasedItems = {};
		this.statistics = {
			kills: 42,
			battles: 42
		}
	}
	getData(ID){
		console.log("В разработке " + ID);
	}
}
var snsPlayerInf = {
	snsId: parseGet(window.location.href).user_id,
	authKey: parseGet(window.location.href).auth_key,
	apiId: parseGet(window.location.href).api_id,
	viewerId: parseGet(window.location.href).viewer_id,
	firstName: "Ноунейм",
	lastName: "Temp",
	birthDay: "1.1.1970",
	avatar: "http://osh.advokatura.kg/sites/default/files/default-avatar.png",
	sex: "",
	country: "",
	friends: [] //Avatar, link, new PlayerInf, snsId, FirstName, LastName
}
var session = {
	isFirstEntry: true,
	isFirstEntryToday: true,
	snsName: parseGet(window.location.href).runner,
	howManyDays: 42,
}
var mainPlayerInf = new PlayerInf();
var test =2;
if(session.snsName === "vk"){
	console.log(parseGet(window.location.href));
	VK.init(function() {
		VK.addCallback('onRequestFail', function (error){
            processError(error, "apivk");
       });
		 VK.api("users.get", {"user_ids": [snsPlayerInf.viewerId], "fields": ["photo_200", "sex", "bdate", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) {
			console.log(data.response[0]);
			snsPlayerInf.firstName = data.response[0].first_name; //Получаем имя
			snsPlayerInf.lastName = data.response[0].last_name; //Получаем фамилию
			snsPlayerInf.birthDay = data.response[0].bdate; //Получаем дату др
			snsPlayerInf.avatar = data.response[0].photo_200; //Получаем аву
			snsPlayerInf.sex = data.response[0].sex; //1 -- Female, 2 -- Male;
			snsPlayerInf.country = data.response[0].country.title; //Получаем страну
			send(snsPlayerInf, "/api/user/update", "put", response=>{ //Отправляем данные на наш серв
				let responseObj = response.json()
				 responseObj.then(value => {
					 console.log(value); //Получаем ответочку с необходимыми данными
					 mainPlayerInf.nickName = value.nickname;
					 mainPlayerInf.clan = "";
					 mainPlayerInf.element = "Земля";
					 mainPlayerInf.lvl = value.lvl;
					 mainPlayerInf.experience = value.experience;
					 mainPlayerInf.amountCrystal = value.amountCrystal;
					 mainPlayerInf.statistics = {
	 					kills: value.gamesWon,
	 					battles: value.gamesTotal
	 				}
					mainPlayerInf.rank = value.rank;
					mainPlayerInf.rankingPos = value.rankingPos;
					mainPlayerInf.progress = value.progress;
					mainPlayerInf.achievements = value.achivements
					mainPlayerInf.purchasedItems = null;
					session.isFirstEntry = value.isFirstLogin;
					session.isFirstEntryToday = value.isFirstLoginToday;
					session.howManyDays = "";
					setInterface();
				});
			});
			setRooms("set");
		});
		VK.api("friends.getAppUsers", {"v":"5.101"}, function (data) { //Получаем массив id Друзей
			VK.api("users.get", {"user_ids": data.response, "fields": ["photo_200", "sex", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) { //Получаем инфу о каждом друге
				data.response.forEach(function(friend) {
					snsPlayerInf.friends.push({
						friendPlayerInfo: new PlayerInf(),
						firstName: friend.first_name,
						lastName: friend.last_name,
						avatar: friend.photo_200,
						link: "https://vk.com/id" + friend.id,
						snsId: friend.id
					})
				});
				setFriends();
				console.log(snsPlayerInf);
			});
			console.log(snsPlayerInf);
		});
	},
	function() {
		processError(error, "vk.com");
	}, '5.101');
}else if(session.snsName === "ok"){
	console.log(parseGet(window.location.href));
	var rParams = FAPI.Util.getRequestParameters();								//Параметры инициализации
	FAPI.init(rParams["api_server"], rParams["apiconnection"],		//Инициализация
	function() {
		console.log("Инициализация прошла успешно");																	//Функция запросов
		FAPI.Client.call({"fields":"first_name,last_name,pic_3,birthday,gender,location","method":"users.getCurrentUser"},function(status, data, error){  //Получение информации о пользователе
			console.log(data);
			if(data) {
				snsPlayerInf.firstName = data.first_name;		  //Получает имя
				snsPlayerInf.lastName = data.last_name;				//Получает фамилию
				snsPlayerInf.avatar = data.pic_3;							//Получает аватарку
				snsPlayerInf.birthDay = data.birthday;				//Получаем дату рождения
				snsPlayerInf.sex = data.gender;								//Получаем пол
				snsPlayerInf.country = data.location.countryName; //Получаем страну
				if(session.isFirstEntry){ //Если первый вход...
					mainPlayerInf.nickName = snsPlayerInf.firstName + " " + snsPlayerInf.lastName;
					mainPlayerInf.clan = "";
					mainPlayerInf.element = "Земля"; //Должен быть на выбор						mainPlayerInf.lvl = 1;
					mainPlayerInf.experience = 0;
					mainPlayerInf.amountCrystal = 0;
					statistics = {
						kills: 0,
						battles: 0,
					}
				}
				console.log(snsPlayerInf.firstName + " - " + snsPlayerInf.lastName + "\n" + snsPlayerInf.snsId + " - " + snsPlayerInf.authKey);
				console.log(snsPlayerInf);
			}else{
				processError(error, "okGetCurrentUser");
				console.log("Неудалось запросить данные текущего пользователя");
			}
			setInterface();
			setRooms("set");
		});
		//Получение информации о друзьях и их списке
		FAPI.Client.call({"fields": "uid", "method": "friends.getAppUsers"}, function(status,data,error){
			if(data){
					console.log(data);
			} else {
				processError(error, "okGetAppUsers");
				console.log("Не удалось запросить uID друзей пользователя");
			}
		});
	},	//Закрытие функции инициализации
	function(error){
		processError(error, "ok.ru");
	});
}else if(session.snsName === "fb"){
	alert("Зашли через fb с:")
	//Сюда код от Ве
}else{
	for(let i = 0; i < 10; i++){
		let str = ["ле", "на", "нас", "ба", "еб", "лу", "ла", "ка", "ми", "ну"];
		let mode = ["DM", "TDM", "CTF", "CP"]
		let randoms = [];
		let name = "";
		for(let j = 0; j <= 10; j++){
			randoms.push(Math.floor(0 + Math.random() * (9 - 0 + 1)));
		}
		for(let j = 0; j <= randoms[10]; j++){
			name += str[randoms[j]];
		}
		dataRooms[lastIdRoom++] = {
			name: name,
			password: "",
			map: "TestMap"+ i,
			mode: mode[randoms[10] % 4],
			capacity: randoms[10] % 2 ? 10 : randoms[10] % 3 ? 12 : 14,
			playersInRoom: randoms[10] + 1,
			isBought: true,
			isActive: true,
			isClose: false
		}
		name = "";
		for(let j = 0; j <= Math.min(6, randoms[10]); j++){
			name += str[randoms[j]];
		}
		snsPlayerInf.friends[i] = {
			firstName: name,
			lastName: "teeeeeeeest",
			avatar: "http://osh.advokatura.kg/sites/default/files/default-avatar.png",
			link: "http://vk.com/id" + i
		}
	}
	setInterface();
	setFriends();
	setRooms("set");
}
