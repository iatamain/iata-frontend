function kalc(){ //Калькулятор
	var choose = prompt("Введите одно из перечисленных значений:\n1 - Сложение\n2 - Вычитание\n3 - Умножение\n4 - Деление\n5 - Возведение в степень\n6 - Извлечение квадратного корня\n7 - Извлечение кубического корня\n8 - Расчет банковского вклада");
		switch(choose) {
			case '1':
				alert("Ответ: "+(parseFloat(prompt("введите первое слогаемое"))+parseFloat(prompt("введите второе слогаемое"))));
				break
			case '2':
				alert("Ответ: "+(prompt("введите уменьшаемое")-prompt("введите вычитаемое")));
				break
			case '3':
				alert("Ответ: "+(prompt("Введите первый множитель")*prompt("Введите второй множитель")));
				break
			case '4':
				alert("Ответ: "+(prompt("Введите делимое")/prompt("Введите делитель")));
				break
			case '5':
				alert("Ответ: "+Math.pow(prompt("Введите возводимое число"), prompt("Введите степень")));
				break
			case '6':
				alert("Ответ: "+Math.sqrt(prompt("Введите подкоренное выражение")));
				break
			case '7':
				alert("Ответ: "+Math.cbrt(prompt("Введите подкоренное выражение")));
				break
			case '8'://Банк
				var a = prompt("Сумма вклада");
				var b = prompt("Процентная ставка");
				var c = prompt("На солько лет");
				if(typeof a == "object"||typeof b == "object"||typeof c == "object"){}else{
				a = parseFloat(a);
				b = parseFloat(b);
				c = parseFloat(c);
				if(isNaN(a)||isNaN(b)||isNaN(c)){
				alert("Нужно вводить числа")
				}else{
				for(var i=1; i<=c; i++){	
				if(i<2){
				alert("Прошел " + i + " год, cумма на счету: " + (Math.floor(a+=a*(b/100))));
				}else if(i>1&&i<5){
				alert("Прошло " + i + " года, cумма на счету: " + (Math.floor(a+=a*(b/100))));
				}else if(i>4){
				alert("Прошло " + i + " лет, cумма на счету: " + (Math.floor(a+=a*(b/100))));	
				}}}}
				break
			default:
				if (typeof choose == "object"){
				}else{
				alert("Чет не то:С")
				alert("не " + choose + ":C");
				}
			} 
}
//Игры................................................................................................................................................
//Стрельба по коридорам................................................................................................................................................
function shot(){
	alert("Цель игры: попасть в коридоры, которые дают очки, указывая лишь градусы, определить их диапазон и количество")
		var c = 0;
			while(typeof a != "object"){
			var a = prompt("Стреляй:3");
				if(a>360){
				alert("Вводи число не более 360");
				}else if(isNaN(a)){
				alert("Нужно ввести число")
				}else if(typeof a == "object"){}else{		
					if(a<100&&a>90){
					document.body.style.background = "green";
					alert("Отлично, попал в узкий коридор\nscore: "+c+"+2");
					c+=2;
					}else if(a>150&&a<360){
					document.body.style.background = "yellow";
					alert("Попал в широкий коридор\nscore: "+c+"+1");
					c++;
					}else{
					document.body.style.background = "red";
					alert("Не попал:С попробуй еще^^");
					}
				}
			}
}
//Русская рулетка................................................................................................................................................
function roulette(){
	var n = 1;
		var o;
		do{
			if(n==1){
				o = "";
				}else if(n>1&&n<5){
				o = "а";
				}else if(n>4){
				o = "ов";
			}
			if((Math.floor(Math.random()*(9-1)+1))==3&&n==1){
				document.body.style.background = "red";
				alert("Вы сделали 1 выстрел, он явно был лишним...")
				break
				}else if((Math.floor(Math.random()*(9-1)+1))==3&&n>1){
				document.body.style.background = "red";
				alert("Вы сделали "+n+" выстрел"+o+", последний явно был лишним...")
				break
				}
			alert("Вы сделали "+n+" выстрел"+o)
			n++;
		}while(confirm("Еще выстрел?") == true);
}
//КНБ................................................................................................................................................
function knb(){ 
	var c = 0;
	var win  = 0;
	var los =0;
	var ni = 0;
	var k = 0;
	var n = 0;
	var b = 0;
	var ii;
	do{
		var player = prompt("Введите что-то из нижеперечисленного:\nКамень\nНожницы\nБумага").toLowerCase();
		if (k > 1){
			ii = 3;
		}else if (n > 1){
			ii = 1;
		}else if (b > 1){
			ii = 2;
		}else{
			ii = Math.floor(Math.random()*(3-1+1)+1);
		}
			//1 - Камень
			//2 - Ножницы
			//3 -Бумага
		if (player == "камень" || player == "1"){
			if (ii == 1){   
				document.body.style.background = "yellow";
				alert("Вы: Камень\nИИ: Камень\nРезультат: Ничья\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"\nНичьи: "+ni+"+1");    
				ni++;
			}else if (ii == 2){
				document.body.style.background = "green";
				alert("Вы: Камень\nИИ: Ножницы\nРезультат: Победа\nScore: "+c+"+1\nПобеды: "+win+"+1\nПоражения: "+los+"\nНичьи: "+ni);
				win++;
				c++;
			}else if (ii == 3){
				if (c > 0){
					document.body.style.background = "red";
					alert("Вы: Камень\nИИ: Бумага\nРезультат: Поражение\nScore: "+c+"-1\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
					c--;
				}else{
					document.body.style.background = "red";
					alert("Вы: Камень\nИИ: Бумага\nРезультат: Поражение\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
				}
			}
			if (k<3){
			k++;
			}
			n = 0;
			b = 0;
		}else if (player == "ножницы" || player == "2"){
			if (ii == 2){
				document.body.style.background = "yellow";
				alert("Вы: Ножницы\nИИ: Ножницы\nРезультат: Ничья\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"\nНичьи: "+ni+"+1");
				ni++;
			}else if (ii == 3){
				document.body.style.background = "green";
				alert("Вы: Ножницы\nИИ: Бумага\nРезультат: Победа\nScore: "+c+"+1\nПобеды: "+win+"+1\nПоражения: "+los+"\nНичьи: "+ni);
				win++;
				c++;
			}else if (ii == 1){
				if (c > 0){
					document.body.style.background = "red";
					alert("Вы: Ножницы\nИИ: Камень\nРезультат: Поражение\nScore: "+c+"-1\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
					c--;}else{
					document.body.style.background = "red";
					alert("Вы: Ножницы\nИИ: Камень\nРезультат: Поражение\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
					}
					}
			if (n<3){
			n++;
			}
			k = 0;
			b = 0;
		}else if (player == "бумага" || player == "3"){
			if (ii == 3){
				document.body.style.background = "yellow";
				alert("Вы: Бумага\nИИ: Бумага\nРезультат: Ничья\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"\nНичьи: "+ni+"+1");
				ni++;
			}else if (ii == 1){
				document.body.style.background = "green";
				alert("Вы: Бумага\nИИ: Камень\nРезультат: Победа\nScore: "+c+"+1\nПобеды: "+win+"+1\nПоражения: "+los+"\nНичьи: "+ni);
				win++;
				c++;
			}else if (ii == 2){
				if (c > 0){
					document.body.style.background = "red";
					alert("Вы: Бумага\nИИ: Ножницы\nРезультат: Поражение\nScore: "+c+"-1\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
					c--;
				}else{
					document.body.style.background = "red";
					alert("Вы: Бумага\nИИ: Бумага\nРезультат: Поражение\nScore: "+c+"\nПобеды: "+win+"\nПоражения: "+los+"+1\nНичьи: "+ni);
					los++;
					}
			}
			if (b < 3){
			b++;
			}
			k = 0;
			n = 0;
		}else{
			alert("Нет такого варианта:С")
		}
	}while(confirm("Еще?") == true)
}

//Математика................................................................................................................................................
function math(){
	var c = 0;
	var yes = 0;
	var no = 0;
	alert("Чтобы посмотреть статистику ответов, напишите в поле ввода \"статистика\"");
	do{
		var a = Math.floor(Math.random()*(100-1+1)+1);
		var b = Math.floor(Math.random()*(100-1+1)+1);
		var player = prompt("Введите результат:\n"+a+" + "+b+" = ");
		if(typeof player == "object"){
			break
		}
		if (player == a + b){
			document.body.style.background = "green";
			alert("Правильно\nЗадача: "+a+" + "+b+" = "+player+"\nScore: "+c+"+1")
			c++;
			yes++;
		}else if (player == "статистика"){
			document.body.style.background = "yellow";
			alert("\nПравильных ответов: "+yes+"\nНеправильных отвеов: "+no)
		}else{
			document.body.style.background = "red";
			alert("Неправильно:c\nЗадача: "+a+" + "+b+"\nВаш Ответ: "+player+"\nПравильный ответ: "+(a+b)+"\nScore: "+c+"-1")
			c--;
			no++;
		}
	}while(confirm("Еще?") == true)
}

function code(){ //Шифр................................................................................................................................................
	var score = 0;
	var sh = converter((Math.floor(Math.random() * (9999999999 - 2176782336 + 1) + 2176782336)), 36)
	do{
		var leng = parseInt(prompt("Введите длину шифра. Чем больше шифр, тем больше вы получите очков за его разгадку"));
		var key = [];
		var key2 = [];
		var live = 5*leng;
		var win = 0;
		for(var i = 0; i<leng; i++){
			key.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
			key2.push("*");
		}

		for(var j = 0; j < leng; j++){
			while(live > 0){
				var a = prompt("Угадайте "+(j+1)+"-e число шифра.\nКол-во попыток: "+live+"\nScore: "+score+"\nШифр: "+key2.join(""));
				if(a != key[j]){
					live--;
					document.body.style.background = "red";
				}else{
					win++;
					key2[j]=key[j];
					document.body.style.background = "green";
					break
				}
			}
		}
		alert("Шифр: "+key.join(""));
		var sh2 = converter((Math.floor(Math.random() * (9999999999 - 2176782336 + 1) + 2176782336)), 36)
		if(live < 1){
			document.body.style.background = "red";
			alert("Вы не отгадали:С\nScore: "+score+"-"+Math.abs(leng)+"\nКод окна: "+sh2+"bo"+score.toString(36)+sh+leng.toString(36)+"w"+win.toString(36));
			score -=Math.abs(leng);
		}else if(win == leng){
			document.body.style.background = "green";
			alert("Вы отгадали шифр\nScore: "+score+"+"+(Math.floor(leng*2.5)+win)+"\nКод окна: "+sh2+"tr"+score.toString(36)+sh+leng.toString(36)+"w"+win.toString(36));
			score += Math.floor(leng*2.5)+win;
		}else{
			alert("Score: "+score+"\nКод окна :"+sh2+"ua"+score.toString(36)+sh+leng.toString(36)+"w"+win.toString(36));
		}
	}while(confirm("еще?") != false)
}

function puzzles(){ //Загадки...............................................................................................................................
	var c = 0;
	var a = prompt("Ног нет, а хожу,\nРта нет, а скажу,\nКогда спать, когда вставать,\nКогда работу начинать.").toLowerCase(); //Загадка
	if(a == "часы"){   //Проверка ответов
		alert("Молодец:3\nscore: "+c+"+1");
		c++;
	}else if(koder("абвгдеёжзийклмнопрстуфхцчшщъыьэюя., ^", "опфктэяшсыцгрнмаблздювхйщжчьиъеуё., -", a, 1) == "нагдеюагделагделагделагде-агде-"){
		alert("привееет^^\nscore: "+c+"+1000");
		c=+1000;
	}else{
		alert("Чет не:с");
	}
	var b = prompt("Всегда он в работе,\nКогда говорим,\nА отдыхает,\nКогда мы молчим.").toLowerCase(); //Загадка
	if(b == "язык"){ 				
		alert("Молодец:3\nscore: "+c+"+1");
		c++;
	}else{
		alert("Чет не:с");
	}
	var d = prompt("Тебе дано,\nА люди им пользуются.").toLowerCase(); //Загадка
	if(d == "имя"){
		alert("Молодец:3\nscore: "+c+"+1");
		c++;
	}else{
		alert("Чет не:с");
	}
	alert("score: "+c);
	
	if(c==1002){																				//Проверка очков
		do{//Начало цикла
			var a = prompt("Введи пароль. Говорю сразу, я его тебе не скажу:D").toLowerCase();	
			var f = koder("абвгдеёжзийклмнопрстуфхцчшщъыьэюя., ^", "опфктэяшсыцгрнмаблздювхйщжчьиъеуё., -", a, 2);
			if(f=="омроммрокмроэмрормроамрощмроэмрогмро-мро-"){//Проверка пароля
				alert("Правильно^^");
				do{									
					var chooseh = prompt("Выбери переводчик:\n 1 - Наш язык:D\n 2 - Что-то другое")
					switch(chooseh){
						case '1':							
							var open = prompt("Введи открытый текст").toLowerCase();		
							var close = koder("абвгдеёжзийклмнопрстуфхцчшщъыьэюя.,:d^ <3(test2xyz)", "опфктэяшсыцгрнмаблздювхйщжчьиъеуё.,:D^ <3(test2xyz)", open, 3)
							console.log(close);
							alert(close);
						break
						case '2':								
							var open = prompt("Введи открытый текст").toLowerCase();
							var close = koder("pqrstvxyz/.,\\<>=+*^%#@$!&-():;573[]abcef10d9", "опфктэяшсыцгрнмаблздювхйщжчьиъеуё.,:D^ <)(38", open, 3)
							console.log(close);
							alert(close);							
							break
						default:
							if(typeof chooseh == "object"){}else{
							alert("Нет такого переводчика:С");}
					}//Конец switch(chooseh)											
				}while(typeof chooseh != "object")
			}else{//начало else и конец проверки пароля
				alert("Не он:С");
			}//Конец else
		}while(f!="омроммрокмроэмрормроамрощмроэмрогмро-мро-") //Конец цикла
	}//Конец проверки очков
}

function koder(text, key, a, c){ //Шифратор.................................................................................................................
	var close = [];
		for(var i = 0; i<a.length; i++){
			for(var j = 0; j<text.length; j++){
				if(a.charAt(i) == text.charAt(j)){					
					close.push(key.charAt(j));
					break
				}
			}
		}
	if(c == 1){
		return close.join("агде");
	}else if(c == 2){
		return close.join("мро")
	}else{
		return close.join("")
	}
}

function alfavit(c){ //Числа в текст................................................................................................................................................
	if(c > 9){
		var arr = "abcdefghijklmnopqrstuvwxyz"
		for(var i = 10; i < 36; i++){
			if(c == i){
				c = arr.charAt(i-10)
			}
		}
	}
	return(c)
}

function converter(a, e){ //Конвертер................................................................................................................................................
	var b = []
	var c = 0;
	do{
		c = a % e;
		c = alfavit(c)
		b.push(c)
		a = parseInt(a/e)
	}while(a != 0)
	return(b.reverse().join(""))
}

$(document).ready(function () { //Рандом цвета.........................................................................................................
	
	function randomColor() {
		return '#' + Math.random().toString(16).slice(2, 8);
	};

	$(".button2").on("click", function () {
		$('body').css('background', randomColor());
	});
});
