{
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
		document.querySelector("#canvasBack").setAttribute("width", screen.width);
		document.querySelector("#canvasBack").setAttribute("height", screen.height);
		canvHeight = screen.height;
		canvWidth = screen.width;
	}
	function closeFullscreen() {
		isFullScreen = false;
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
	document.addEventListener("keydown", (elem) => {
		if(elem.code == "KeyP") openFullscreen();
	})
	document.addEventListener('fullscreenchange', exitHandler);
	document.addEventListener('webkitfullscreenchange', exitHandler);
	document.addEventListener('mozfullscreenchange', exitHandler);
	document.addEventListener('MSFullscreenChange', exitHandler);
	function exitHandler() {
	    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	      canvHeight = 650;
			canvWidth = 900;
			document.querySelector("#canvasBack").setAttribute("width", canvWidth);
			document.querySelector("#canvasBack").setAttribute("height", canvHeight);
	    }
	}
	let currentScene = "main";
	let canvHeight = 650;
	let canvWidth = 900;
	var gameObj = {
			x: 0,
			y: 0,
			dx: 100,
			dy: 100,
			sizeX: 50,
			sizeY: 50
	}
	let update = function(dt){
		gameObj.x += gameObj.dx * dt;
		gameObj.y += gameObj.dy * dt;
		if(gameObj.x +  gameObj.sizeX / 2 > canvWidth){
			gameObj.x = canvWidth - gameObj.sizeX / 2;
			gameObj.dx *= -1;
		}
		if(gameObj.x - gameObj.sizeX / 2 < 0){
			gameObj.x = gameObj.sizeX / 2;
			gameObj.dx *= -1;
		}
		if(gameObj.y + gameObj.sizeY / 2 > canvHeight){
			gameObj.y = canvHeight - gameObj.sizeY / 2;
			gameObj.dy *= -1;
		}
		if(gameObj.y - gameObj.sizeY / 2 < 0){
			gameObj.y = gameObj.sizeY / 2;
			gameObj.dy *= -1;
		}
	}

	let render = function(scene){
		this.ctx.fillStyle = "#003A3C";
		this.ctx.fillRect(0, 0, canvWidth, canvHeight);
		this.ctx.fillStyle = "#03E6EF";
		this.ctx.fillRect(gameObj.x - gameObj.sizeX / 2, gameObj.y - gameObj.sizeY / 2, gameObj.sizeX, gameObj.sizeY);
	}
	var bg = new Canvas("#canvasBack", update, render);
	bg.start();
}
