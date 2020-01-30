{
	let canvas = document.querySelector("#canvasPlay");
	let ctx = canvas.getContext("2d");
	function openFullscreen() {
		var elem = document.querySelector("#game");
		isFullScreen = true;
		if(elem.requestFullScreen) {
			elem.requestFullScreen();
		}else if(elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen();
		}else if(elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		}else if(elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen();
		}
		console.log("Test",canvas.width, canvas.height);
		canvas.width = screen.width;
		canvas.height = screen.height;
		console.log("Test2",canvas.width, canvas.height);
	}
	function closeFullscreen() {
		isFullScreen = false;
		if (document.exitFullscreen) {
			elem.exitFullscreen();
		}else if (document.mozCancelFullScreen) {
			elem.mozCancelFullScreen();
		}else if (document.webkitExitFullscreen) {
			elem.webkitExitFullscreen();
		}else if (document.msExitFullscreen) {
			elem.msExitFullscreen();
		}
	}
	function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
			canvas.width = 900
			canvas.height = 650;
    }
	}
	document.addEventListener('fullscreenchange', exitHandler);
	document.addEventListener('webkitfullscreenchange', exitHandler);
	document.addEventListener('mozfullscreenchange', exitHandler);
	document.addEventListener('MSFullscreenChange', exitHandler);
	document.addEventListener("keydown", (e) => {
		if(e.code == "KeyP") openFullscreen();
		if(e.code == "Escape") {
			msg("Вы действительно хотите выйти?", "confirm", exitFromRoom);
		}
		if(e.code == "Tab" && Game.isPlay){
			e.preventDefault();
			document.querySelector("#modal").style.display = "block";
			document.querySelector("#modal-playerList").style.display = "block";
		}
		if(e.code == "ArrowRight" || e.code == "ArrowLeft" || e.code == "ArrowDown" || e.code == "ArrowUp"){
			e.preventDefault();
		}

	})
	document.addEventListener("keyup", (e) => {
		if(e.code == "Tab"){
			document.querySelector("#modal-playerList").style.display = "none";
			document.querySelector("#modal").style.display = "none";
		}
	});
	var Game = [];
	class Player{
		constructor(user){
			this.x = Math.random()*(900-100) + 20;
			this.y = Math.random()*650-50;
			this.dx = 0;
			this.dy = 0;
			this.sizeX = 50;
			this.sizeY = 50;
			this.color = "#" + Math.random().toString(16).slice(2, 8);
			this.name = user.nickname;
		}
		render(){
			ctx.fillStyle = "#FF0";
    		ctx.font = "italic 7pt Arial";
    		ctx.fillText(this.name, this.x - (this.name.length - 9)*4/2, this.y - 10);
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
		}
		move(dt){
			this.x += this.dx * dt;
			this.y += this.dy * dt;
			if(this.x < 0) this.x = 0;
			if(this.x > canvas.width - 50) this.x = canvas.width - 50;
			if(this.y < 0) this.y = 0;
			if(this.y > canvas.height - 50) this.y = canvas.height - 50;
		}
	}
	Game.isPlay = false;
	Game.players = [];
	Game.addPlayer = function(user){
		this.players[user.id] = new Player(user);
	}
	Game.removePlayer = function(user){
		delete this.players[user.id];
	}
	Game.init = function(){
		this.players = [];
		for(user of gameData.dataRoom.users){
			this.players[user.id] = new Player(user);
		}
	}
	Game.start = function(){
		if(!this.isPlay){
			this.isPlay = true;
			this.last = Date.now();
			this.main();
		}
	}
	Game.stop = function(){
		this.isPlay = false;
	}
	Game.main = function(){
		this.now = Date.now();
		this.dt = (this.now - this.last)/1000;
		this.update(this.dt);
		this.render();
  		this.last = this.now;
		if(this.isPlay) requestAnimFrame(Game.main.bind(Game));
	}
	Game.update = function(dt){
		this.players[mainPlayerInf.id].dy = 0;
		this.players[mainPlayerInf.id].dx = 0;
		if(isDown('W') || isDown('Up')){
			this.players[mainPlayerInf.id].dy -= 350;
		}
		if(isDown('S') || isDown('Down')){
			this.players[mainPlayerInf.id].dy += 350;
		}
		if(isDown('A') || isDown('Left')){
			this.players[mainPlayerInf.id].dx -= 350;
		}
		if(isDown('D') || isDown('Right')){
			this.players[mainPlayerInf.id].dx += 350;
		}
		for(i in Game.players){
			Game.players[i].move(dt);
		}
	}
	Game.render = function(scene){
		ctx.fillStyle = "#002A2C";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for(i in Game.players){
			Game.players[i].render();
		}
	}
}
