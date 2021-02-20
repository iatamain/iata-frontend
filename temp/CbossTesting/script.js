var check = null;
mailru.loader.require('api', function(){
    mailru.connect.init('783355', '7774e351cde9807b2ab9de47394a8f9f');
    mailru.common.users.getInfo(function(user_list) {
        console.log(mailru.session);
        alert(user_list[0].first_name); // выведет имя пользователя с uid 123
      }, '123');
});

console.log('version 0.4 test2');

