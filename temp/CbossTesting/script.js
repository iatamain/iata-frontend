let code = window.location.search.substring(1);
code = JSON.parse('{"' + decodeURI(code).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
console.log(code.code);

// let xhr = new XMLHttpRequest();

// let body = 'code=' + code;

// xhr.open("POST", 'https://oauth.mail.ru/token', true);

// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.setRequestHeader("client_id", '20ad0c6f3c0847efb7c74d1dcd1f1ddb');
// xhr.setRequestHeader("Access-Control-Allow-Origin", 'http://ksiTest');

// xhr.send(body);

// try {
//     const response = fetch('https://oauth.mail.ru/token', {
//     method: 'POST',
//     mode: 'cors',
//     body: 'code=' + code.code, // данные могут быть 'строкой' или {объектом}!
//     headers: {
//     'Content-Type': 'application/json'
//     }
//     });
//     const json = await response.json();
//     console.log('Успех:', JSON.stringify(json));
//     } catch (error) {
//     console.error('Ошибка:', error);
//     }

    fetch('https://oauth.mail.ru/token', {
        method: 'POST',
        mode: 'cors',
        body: 'code=' + code.code, // данные могут быть 'строкой' или {объектом}!
        headers: {
        'Access-Control-Allow-Origin': 'http://itracers.xyz/temp/CbossTesting/index.html',
        'Access-Control-Request-Method': 'POST'
        }
        })
console.log('version - 0.1');
