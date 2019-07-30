let flag = true;
class PlayerInf {
	constructor() {
		this.nickName = "Temp";
		this.clan = "Temp";
		this.element = "Temp";
		this.id = 42;
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
	friends: [] //Avatar, link, new PlayerInf, snsId, FirstName, LastName
}
var session = {
	isFirstEntry: true,
	isFirstEntryToday: true,
	snsName: parseGet(window.location.href).runner,
	howManyDays: 42,
}
var mainPlayerInf = new PlayerInf();
if(session.snsName === "vk"){
	console.log(parseGet(window.location.href));
	VK.init(function() {
		 VK.api("users.get", {"user_ids": [snsPlayerInf.viewerId], "fields": ["photo_200", "sex", "bdate", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) {
			console.log(data.response[0]);
			snsPlayerInf.firstName = data.response[0].first_name;
			snsPlayerInf.lastName = data.response[0].last_name;
			snsPlayerInf.birthDay = data.response[0].bdate;
			snsPlayerInf.avatar = data.response[0].photo_200;
			snsPlayerInf.sex = data.response[0].sex; //1 -- Female, 2 -- Male;
			snsPlayerInf.country = data.response[0].country.title;
			send(snsPlayerInf, "/api/user/update", "put", response=>{
				console.log(' .... ', response.json())
				console.log((await response).loginsCount);
			});
			/*
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
			setInterface()
		});
		VK.api("friends.getAppUsers", {"v":"5.101"}, function (data) {
			VK.api("users.get", {"user_ids": data.response, "fields": ["photo_200", "sex", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) {
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
			});
			console.log(snsPlayerInf);
		});
	},
	function() {
		console.log("Что-то cломалось:с");
	}, '5.101');
}else{
	setInterface()
}
