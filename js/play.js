{
	let canv = document.querySelector("#canvasPlay");
	console.log(canv);
	function openFullscreen() {
		var elem = document.querySelector("#game");
		isFullScreen = true;
		if(elem.requestFullscreen) {
			elem.requestFullscreen();
		}else if(elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen();
		}else if(elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		}else if(elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen();
		}
		canv.width = screen.width;
		canv.height = screen.height;
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
			canv.width = 900
			canv.height = 650;
    }
	}
	document.addEventListener('fullscreenchange', exitHandler);
	canv.addEventListener('webkitfullscreenchange', exitHandler);
	canv.addEventListener('mozfullscreenchange', exitHandler);
	canv.addEventListener('MSFullscreenChange', exitHandler);
	document.addEventListener("keydown", (e) => {
		if(e.code == "KeyP") openFullscreen();
		if(e.code == "Escape") {
			msg("Вы действительно хотите выйти?", "confirm", exitFromRoom);
		}
		if(e.code == "Tab"){
			e.preventDefault();
		}
	})

	let currentScene = "main";
	let gameObj = {
			x: 0,
			y: 0,
			dx: 2000,
			dy: 2000,
			sizeX: 50,
			sizeY: 50
	}
	let update = function(dt){
		gameObj.x += gameObj.dx * dt;
		gameObj.y += gameObj.dy * dt;
		if(gameObj.x +  gameObj.sizeX / 2 > canv.width){
			gameObj.x = canv.width - gameObj.sizeX / 2;
			gameObj.dx *= -1;
		}
		if(gameObj.x - gameObj.sizeX / 2 < 0){
			gameObj.x = gameObj.sizeX / 2;
			gameObj.dx *= -1;
		}
		if(gameObj.y + gameObj.sizeY / 2 > canv.height){
			gameObj.y = canv.height - gameObj.sizeY / 2;
			gameObj.dy *= -1;
		}
		if(gameObj.y - gameObj.sizeY / 2 < 0){
			gameObj.y = gameObj.sizeY / 2;
			gameObj.dy *= -1;
		}
	}

	let render = function(scene){
		this.ctx.fillStyle = "#002A2C";
		this.ctx.fillRect(0, 0, canv.width, canv.height);
		this.ctx.fillStyle = "#FFFF00";
		this.ctx.fillRect(gameObj.x - gameObj.sizeX / 2, gameObj.y - gameObj.sizeY / 2, gameObj.sizeX, gameObj.sizeY);
	}
	var play = new Canvas("#canvasPlay", update, render);
}
