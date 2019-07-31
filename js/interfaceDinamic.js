if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
}
let active = 1;
document.querySelector("#radio02").addEventListener("click", e => {
	if(active != 2){
		document.querySelector(".active").setAttribute("class", "news-body deactive-left");
		document.querySelector(".deactive-right").setAttribute("class", "news-body active");
		active = 2;
	}
});
document.querySelector("#radio01").addEventListener("click", e => {
	if(active != 1){
		document.querySelector(".active").setAttribute("class", "news-body deactive-right");
		document.querySelector(".deactive-left").setAttribute("class", "news-body active");
		active = 1;
	}
});
