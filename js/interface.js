if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.querySelector("#news-container").setAttribute("class", "news-container-mobile");
	alert("Зайди с пк, пездюк:D");
}else{
	document.querySelector("#news-container").setAttribute("class", "news-container");
}