async function testToken(){
   return fastFetch("testToken", "get")
   	.then((data)=>{
         if(data.ok){
            return {message:"Авторизован"};
         } else {
            throw {message:"Не авторизован"};
         }
   	})
}
function deleteNet(id){
	return fastFetch("deleteNet/"+id, "delete")
	.then((data)=>{
      if(data.ok){
         return data.json();
      } else if(data.status == 401){
         throw {message:"Не авторизован"};
      } else {
         throw {message:"Ошибка удаления"};
      }
	})
}
function createNet(data){
	return fastFetch("createNet", "post", data)
	.then((data)=>{
      if(data.ok){
         return data.json();
      } else if(data.status == 401){
         throw {message:"Не авторизован"};
      } else {
         throw {message:"Ошибка создания"};
      }
	})
}
async function getNetList(){
   return fastFetch("netList", "get")
   	.then((data)=>{
         if(data.ok){
            return data.json();
         } else if(data.status == 401){
            throw {message:"Не авторизован"};
         } else {
            throw {message:"Ошибка получения списка"};
         }
   	})
}
async function goAuth(path, login, password){
   let status = null;
   return fastFetch(path, "post", { login, password })
   .then((data)=>{
      status = data.ok;
      return data.json();
   })
   .then((res)=>{
      if(status){
         localStorage.setItem("user", JSON.stringify(res));
         return res;
      }else{
         throw res
      }
   })
}

//Шаблончик
async function fastFetch(path, method, body){
   let user = JSON.parse(localStorage.getItem("user"));
   let token = null;
   if(user){
      token = user.token;
   }
   params = {
   		method,
   		headers: {
   			'Content-Type': 'application/json;charset=utf-8',
   			'authorization': "Bearer " + token
   		}
   }
   if(body){
      params.body = JSON.stringify(body);
   }
   let testPath = "http://127.0.0.1:3075/";
   let prodPath = "https://itracers.xyz:3705/"
   let link = null
   if(path.indexOf("http") == 0){
      link = path;
   }else{
	  if(document.location.host){
		  link = prodPath + path;
	  }else{
		  link = testPath + path;
	  }

   }
   return fetch(link, params);
}
