let flag = true;
class PlayerInf {
	constructor() {
		this.nickName = "Temp";
		this.clan = "Temp";
		this.element = "Temp";
		this.rank = 42;
		this.rankingPos = 42;
		this.lvl = 42;
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
	firstName: "Temp",
	lastName: "Temp",
	birthDay: "1.1.1970",
	avatar: "http://osh.advokatura.kg/sites/default/files/default-avatar.png",
	sex: "",
	country: "",
	friends: [] //Avatar, link, new PlayerInf
}
var session = {
	isFirstEntry: true,
	isFirstEntryToday: true,
	snsName: "Temp",
	howManyDays: 42,
	id: 42,
}
var mainPlayerInf = new PlayerInf();
try{
	send(JSON.stringify(parseGet(window.location.href)), response=>console.log(' .... ', response.json()))
	console.log(parseGet(window.location.href));
	VK.init(function() { 
		 VK.api("users.get", {"user_ids": [snsPlayerInf.snsId], "fields": ["photo_200", "sex", "bdate", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) {
			console.log(data.response[0]);
			session.snsName = "vk";
			snsPlayerInf.firstName = data.response[0].first_name;
			snsPlayerInf.lastName = data.response[0].last_name;
			snsPlayerInf.birthDay = data.response[0].bdate;
			snsPlayerInf.avatar = data.response[0].photo_200;
			snsPlayerInf.sex = data.response[0].sex; //1 -- Female, 2 -- Male;
			snsPlayerInf.country = data.response[0].country.title;
			//Над еще список друзей запросить, но это позже:D
			if(session.isFirstEntry){
				mainPlayerInf.nickName = snsPlayerInf.firstName + " " + snsPlayerInf.lastName;
				mainPlayerInf.clan = "";
				mainPlayerInf.element = "Земля"; //Должен быть на выбор
				mainPlayerInf.lvl = 1;
				mainPlayerInf.experience = 0;
				mainPlayerInf.amountCrystal = 0;
				statistics = {
					kills: 0,
					battles: 0,
				}
				/*Осталось задать:
				rank
				rankingPos
				progress
				achievements
				purchasedItems
				Данные сессии
				*/
			}
			[
				"js/setInterface.js",
				"js/game.js"
			].forEach(function(src) {
				var script = document.createElement('script');
				script.src = src;
				script.async = false;
				document.head.appendChild(script);
			});
			flag = false;
		});
	}, 
	function() { 
		console.log("Что-то cломалось:с");
	}, '5.101'); 
}catch{
	if(flag){
		[
		  "js/setInterface.js",
		  "js/game.js"
		].forEach(function(src) {
		  var script = document.createElement('script');
		  script.src = src;
		  script.async = false;
		  document.head.appendChild(script);
		});
	}
}
