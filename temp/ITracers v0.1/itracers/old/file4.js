var score = 0;
do{
	var leng = parseInt(prompt("Введите длину шифра. Чем больше шифр, тем больше вы получите очков за его разгадку"));
	var key = [];
	var key2 = [];
	var live = 4*leng;
	var win = 0;
	for(var i = 0; i<leng; i++){
		key.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
		key2.push("*");
	}

	for(var j = 0; j < leng; j++){
		while(live > 0){
			var a = prompt("Угадайте "+j+"-e число шифра.\nКол-во попыток: "+live+"\nScore: "+score+"\nШифр: "+key2.join("."));
			if(a != key[j]){
				live--;
			}else{
				score++;
				win++;
				key2[j]=key[j];
				break
			}
		}
	}
	alert("Шифр: "+key.join(""));
	if(live < 1){
	alert("Вы не отгадали:С\nScore: "+score+"-"+Math.abs(leng));
	score -= leng;
	}else if(win == leng){
		alert("Вы отгадали шифр\nScore: "+score+"+"+(Math.floor(leng*2.5)));
		score += Math.floor(leng*2.5);
	}else{
	alert("Score: "+score);
	}
}while(confirm("еще?") != false)