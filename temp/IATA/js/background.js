{
	let canvas = document.querySelector("#canvasBack");
	let ctx = canvas.getContext("2d");
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
		canvas.width = screen.width;
		canvas.height = screen.height;
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
			canvas.width = 900;
			canvas.height = 650;
	    }
	}
	var Background = {};
	Background.gameObj = {
			x: 0,
			y: 0,
			dx: 100,
			dy: 100,
			sizeX: 50,
			sizeY: 50
	}
	Background.start = function(){
		if(!this.isPlay){
			this.isPlay = true;
			this.last = Date.now();
			this.main();
		}
	}
	Background.stop = function(){
		this.isPlay = false;
	}
	Background.main = function(){
		this.now = Date.now();
		this.dt = (this.now - this.last)/1000;
		this.update(this.dt);
		this.render();
  		this.last = this.now;
		if(this.isPlay) requestAnimFrame(this.main.bind(this));
	}
	Background.update = function(dt){
		this.gameObj.x += this.gameObj.dx * dt;
		this.gameObj.y += this.gameObj.dy * dt;
		if(this.gameObj.x +  this.gameObj.sizeX / 2 > canvas.width){
			this.gameObj.x = canvas.width - this.gameObj.sizeX / 2;
			this.gameObj.dx *= -1;
		}
		if(this.gameObj.x - this.gameObj.sizeX / 2 < 0){
			this.gameObj.x = this.gameObj.sizeX / 2;
			this.gameObj.dx *= -1;
		}
		if(this.gameObj.y + this.gameObj.sizeY / 2 > canvas.height){
			this.gameObj.y = canvas.height - this.gameObj.sizeY / 2;
			this.gameObj.dy *= -1;
		}
		if(this.gameObj.y - this.gameObj.sizeY / 2 < 0){
			this.gameObj.y = this.gameObj.sizeY / 2;
			this.gameObj.dy *= -1;
		}
	}

	Background.render = function(scene){
		ctx.fillStyle = "#003A3C";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#03E6EF";
		ctx.fillRect(this.gameObj.x - this.gameObj.sizeX / 2, this.gameObj.y - this.gameObj.sizeY / 2, this.gameObj.sizeX, this.gameObj.sizeY);
	}
	Background.start();
}
