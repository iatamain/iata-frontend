try{
    let code = window.location.search.substring(1);
    code = JSON.parse('{"' + decodeURI(code).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    console.log(code.code);
    }catch(error){
        console.log(error);
    }
    fetch('https://oauth.mail.ru/token', {
        method: 'POST',
        mode: 'cors',
        body: 'code=' + code.code, // данные могут быть 'строкой' или {объектом}!
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://testKsi/'
        }
        })
console.log('version 0.3');