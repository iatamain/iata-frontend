if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
}else{
	document.querySelector("#news-container").setAttribute("class", "news-container");
}

function openFullscreen() {
	var elem = document.getElementById("game");
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
	document.querySelector("canvas").setAttribute("width", window.innerWidth);
	document.querySelector("canvas").setAttribute("height", window.innerWidth);
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