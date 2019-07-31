if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
}
document.querySelector("#radio02").addEventListener("click", e => {
	document.querySelector(".active").setAttribute("class", "news-body deactive-left");
	document.querySelector(".deactive-right").setAttribute("class", "news-body active");
});
