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
var rooms = {};
for(let i = 0; i < Math.floor(50 + Math.random() * (120 - 50 + 1)); i++){
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
	rooms[i] = {
		name: name,
		map: "TestMap"+ i,
		mode: mode[randoms[10] % 4],
		capacity: randoms[10] % 2 ? 10 : randoms[10] % 3 ? 12 : 14,
		playersInRoom: randoms[10] + 1,
		isBought: true,
		isActive: true
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
		 VK.api("users.get", {"user_ids": [snsPlayerInf.viewerId], "fields": ["photo_200", "sex", "bdate", "country", "verified", "screen_name", "photo_id"], "v":"5.101"}, function (data) {
			console.log(data.response[0]);
			snsPlayerInf.firstName = data.response[0].first_name;
			snsPlayerInf.lastName = data.response[0].last_name;
			snsPlayerInf.birthDay = data.response[0].bdate;
			snsPlayerInf.avatar = data.response[0].photo_200;
			snsPlayerInf.sex = data.response[0].sex; //1 -- Female, 2 -- Male;
			snsPlayerInf.country = data.response[0].country.title;
			send(snsPlayerInf, "/api/user/update", "put", response=>{
				let responseObj = response.json()
				 responseObj.then(value => {
					 console.log(value);
				 });
			});

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
			setRooms(rooms);
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
	setInterface();
	setRooms(rooms);
}
