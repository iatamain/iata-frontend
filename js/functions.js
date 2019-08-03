function parseGet(getHref){
	try {
		let arr = getHref.split("?")[1].split("&");
		let obj = {};
		for(let i = 0; i < arr.length; i++){
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		return obj;
	}catch {
		return 0;
	}
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function send(data,  url, method, collback){
	fetch("https://itracers.xyz:8443" + url, {
	method: method,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		"auth_key": parseGet(window.location.href).auth_key,
		"viewer_id": parseGet(window.location.href).viewer_id,
		"snsName": parseGet(window.location.href).runner
	},
	body: JSON.stringify(data)
	})
	.then(collback)
	.catch(function (error) {
	console.log('Request failed ', error );
	});
}
