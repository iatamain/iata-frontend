//Переменные...
var mathh = false;
var codee = false;
var calcc  = false;

//var utterance = new SpeechSynthesisUtterance('Последнее мое обновление было произведено 05.01.2017');
//speechSynthesis.speak(utterance);






function calc(){ //Калькулятор........................................................................................................
	calcc = true;
	$("div.unknb").hide();
	$("nav").hide();
	$("div.calc").show();
	summ()
}

function norma(a, b){
	if(b == true){
		$("div.1").show();
		$("div.2").show();
		$("div.3").hide(); //Проля ввода
	}
	$('a.buttonact').addClass("button");
	$('a.buttonact').removeClass("buttonact");
	$("a.a"+a).removeClass("button");
	$("a.a"+a).addClass("buttonact"); //Кнопки
	$("p.re").html("Результат:"); 
}

function start(){
	switch(calc.choose){
		case 'summ': 
			summ.summ2()
		break
		case 'differ':
			differ.differ2()
		break
		case 'mult':
			mult.mult2()
		break
		case 'divis':
			divis.divis2()
		break
		case 'power':
			power.power2()
		break
		case 'rooot':
			rooot.rooot2()
		break
		case 'croot':
			croot.croot2()
		break
		case 'bank':
			bank.bank2()
		break
		default:
			alert("olololo")
		break
	}
}
function summ(){ 
	norma(1, true)
	$("p.d").html("Сложение")
	$("a.1").html("Первое слагаемое:");
	$("a.2").html("Второе слагаемое:"); 
	calc.choose = "summ";
	summ.summ2 = function(){
		$("p.re").html("Результат:<br>"+(parseFloat($("input.1").val())+parseFloat($("input.2").val()))); 
	}
}
function differ() {
	norma(2, true)
	$("p.d").html("Вычитание")
	$("a.1").html("Уменьшаемое:");
	$("a.2").html("Вычитаемое:"); 
	calc.choose = "differ";
	differ.differ2 = function(){
		$("p.re").html("Результат:<br>"+(parseFloat($("input.1").val())-parseFloat($("input.2").val()))); 
	}
}
function mult(){
	norma(3, true)
	$("p.d").html("Умножение")
	$("a.1").html("Первый множитель:");
	$("a.2").html("Второй множитель:"); 
	calc.choose = "mult";
	mult.mult2 = function(){
		$("p.re").html("Результат:<br>"+(parseFloat($("input.1").val())*parseFloat($("input.2").val()))); 
	}
}
function divis() {
	norma(4, true)
	$("p.d").html("Деление")
	$("a.1").html("Делимое:");
	$("a.2").html("Делитель:"); 
	calc.choose = "divis";
	divis.divis2 = function(){
		$("p.re").html("Результат:<br>"+(parseFloat($("input.1").val())/parseFloat($("input.2").val()))); 
	}
}
function power() {
	norma(5, true)
	$("p.d").html("Возведение в степень")
	$("a.1").html("Возводимое число:");
	$("a.2").html("Степень:"); 
	calc.choose = "power";
	power.power2 = function(){
		$("p.re").html("Результат:<br>"+(Math.pow(parseFloat($("input.1").val()), parseFloat($("input.2").val())))); 
	}
}
function rooot(){
	norma(6, false)
	$("div.1").show();
	$("div.2").hide();
	$("div.3").hide(); //Поля ввода
	$("p.d").html("Извлечение квадратного корня")
	$("a.1").html("Подкоренное выражение:");
	calc.choose = "rooot";
	rooot.rooot2 = function(){
		$("p.re").html("Результат:<br>"+(Math.sqrt(parseFloat($("input.1").val())))); 
	}
}
function croot() {
	norma(7, false)
	$("div.1").show();
	$("div.2").hide();
	$("div.3").hide(); //Поля ввода
	$("p.d").html("Извлечение кубического корня")
	$("a.1").html("Подкоренное выражение:");
	calc.choose = "croot";
	croot.croot2 = function(){
		$("p.re").html("Результат:<br>"+(Math.cbrt(parseFloat($("input.1").val())))); 
	}
}
function bank() {
	norma(8, false)
	$("div.1").show();
	$("div.2").show();
	$("div.3").show(); //Поля ввода
	$("p.d").html("Расчет банковского вклада")
	$("a.1").html("Сумма вклада:");
	$("a.2").html("Процентная ставка:");
	$("a.3").html("На сколько лет:");
	calc.choose = "bank";
	bank.bank2 = function(){
		$("p.re").html("Результат:")
		bank.a = parseFloat($("input.1").val());
		bank.b = parseFloat($("input.2").val());
		bank.c = parseFloat($("input.3").val());
		for(var i=1; i<=bank.c; i++){	
			if(i<2){
				$("p.re").append("<br>Прошел " + i + " год, cумма на счету: " + (Math.floor(bank.a+=bank.a*(bank.b/100))));
			}else if(i>1&&i<5){
				$("p.re").append("<br>Прошло " + i + " года, cумма на счету: " + (Math.floor(bank.a+=bank.a*(bank.b/100))));
			}else if(i>4){
				$("p.re").append("<br>Прошло " + i + " лет, cумма на счету: " + (Math.floor(bank.a+=bank.a*(bank.b/100))));	
			}	
		}
	}
}
//КНБ................................................................................................................................................
function knb(){ 
	$("div.unknb").hide();				//Скрыть блок с кнопкой "Назад" и картинку
	$("div.knb").show();				//Показать блок с кнопками и счетом
	$("nav").hide();					//Скрыть меню
	knb.c = 0;			//Score
	knb.win  = 0;		//Победы
	knb.los = 0;		//Поражения
	knb.ni = 0;			//Ничьи		
	knb.k = 0;			//Камень счетчик
	knb.n = 0;			//Ножницы счетчик
	knb.b = 0;			//Бумага счетчик
	knb.ii = 0;			//Бот
}

function bot(){
	if (knb.k > 1){
		knb.ii = 3;
	}else if (knb.n > 1){
		knb.ii = 1;
	}else if (knb.b > 1){
		knb.ii = 2;
	}else{
		knb.ii = Math.floor(Math.random()*(3-1+1)+1);
	}

	//1 - Камень
	//2 - Ножницы
	//3 -Бумага	
}

function knbalert(you, bot, knbresult, imgyou, imgbot, win, los, ni, score, mirroryou, mirrorbot){
	$("#you").html("<font size='7'>Вы: "+you+"</font><br><img "+mirroryou+" src='"+imgyou+".png'>")		
	$("#score").html("<font size='7'>Результат: "+knbresult+"</font><br>Cчет: "+knb.c+score+"<br>Победы: "+knb.win+win+"<br>Поражения: "+knb.los+los+"<br>Ничьи: "+knb.ni+ni)			
	$("#bot").html("<font size='7'>Бот: "+bot+"</font><br><img "+mirrorbot+" src='"+imgbot+".png'>")
	if(knbresult == "Ничья"){
		document.body.style.background = "yellow";
		knb.ni++;
	}else if (knbresult == "Победа"){
		document.body.style.background = "green";
		knb.win++;
		knb.c++;
	}else if (knbresult == "Поражение"){
		document.body.style.background = "red";
		knb.los++;
		if (knb.c > 0){	
			knb.c--;
		}
	}
}

function knbstone(){
bot()
	if (knb.ii == 1){ knbalert("Камень", "Камень", "Ничья", "img/site/k", "img/site/k", "", "", "+1", "", "class='mirror'", "")}
	else if (knb.ii == 2){ knbalert("Камень", "Ножницы", "Победа", "img/site/k", "img/site/n", "+1", "", "", "+1", "class='mirror'", "")}
	else if (knb.ii == 3){ if (knb.c > 0){ knbalert("Камень", "Бумага", "Поражение", "img/site/k", "img/site/b", "", "+1", "", "-1", "class='mirror'", "class='mirror'")}else{knbalert("Камень", "Бумага", "Поражение", "img/site/k", "img/site/b", "", "+1", "", "", "class='mirror'", "class='mirror'")}}
		knb.k++;
		knb.n = 0;
		knb.b = 0;
}

function knbclip(){
bot()	
	if (knb.ii == 2){ knbalert("Ножницы", "Ножницы", "Ничья", "img/site/n", "img/site/n", "", "", "+1", "", "class='mirror'", "")}
	else if (knb.ii == 3){ knbalert("Ножницы", "Бумага", "Победа", "img/site/n", "img/site/b", "+1", "", "", "+1", "class='mirror'", "class='mirror'")}
	else if (knb.ii == 1){ if (knb.c > 0){ knbalert("Ножницы", "Камень", "Поражение", "img/site/n", "img/site/k", "", "+1", "", "-1", "class='mirror'", "") }else{ knbalert("Ножницы", "Камень", "Поражение", "img/site/n", "img/site/k", "", "+1", "", "", "class='mirror'", "")}}
		knb.n++;
		knb.k = 0;
		knb.b = 0;
}

function knbpaper(){
bot()
	if (knb.ii == 3){ knbalert("Бумага", "Бумага", "Ничья", "img/site/b", "img/site/b", "", "", "+1", "", "", "class='mirror'")}
	else if (knb.ii == 1){ knbalert("Бумага", "Камень", "Победа", "img/site/b", "img/site/k", "+1", "", "", "+1", "", "")}
	else if (knb.ii == 2){ if (knb.c > 0){ knbalert("Бумага", "Ножницы", "Поражение", "img/site/b", "img/site/n", "", "+1", "", "-1", "", "") }else{ knbalert("Бумага", "Ножницы", "Поражение", "img/site/b", "img/site/n", "", "+1", "", "", "", "")}}
	knb.b++;
	knb.k = 0;
	knb.n = 0;
}

function showw(){
	$("div.unknb").show();						//Показать блок с кнопкой "Назад" и картинкой
	$("p.score").show()							//Показать блоки с результатами
	$("leng").show();							//Показать(Вернуть в исходное пложение) "Введите длину шифра"
	$(".okno").hide();							//Убрать все всплывающие окна
	$("div.knb").hide();						//Убрать блок с кнопками и счетом от knb
	$("div.math").hide();						//Убрать блок с кнопками и счетом от Математического тренажера
	$("div.code").hide();						//Убрать блок с кнопками и счетом от шифра
	$("div.calc").hide();						//Убрать калькулятор
	$("div.xo").hide();						//Убрать калькулятор
	$("nav").show();							//Показать меню
	$("div.inp").html('');						//Стереть все ячейки для ввода шифра
	mathh = false;
	codee = false;
	calcc = false;
	$('body').css('background', '#000000');		//Установка дефолтного фона сайта
	$("input").prop("disabled", false);			//Деактивация всех ячеек
	$("input").css({'background' : '#000000'})	//Задание дефолтного фона полей ввода
}

//Математика................................................................................................................................................
function math(){
	$("div.unknb").hide();				//Скрыть блок с кнопкой "Назад" и картинку
	$("div.math").show();				//Показать блок с кнопками и счетом
	$("nav").hide();					//Скрыть меню
	math.c = 0;
	math.yes = 0;
	math.no = 0;
	startmath()
	mathh = true;
	document.querySelector("div.math input").focus();
}

document.onkeyup = function (e) {  //Нажатие ENTER
e = e || window.event; 
	if (e.keyCode === 13) {
		if(mathh == true){
			if($("p.score").css('display') == "none"){
				ss()
			}else{
				startmath2(); 
			}
		}else if(codee == true){
			if (code.bo == true){
				bg()
			}else{
				incub()
			}
		}else{
			color()
		}
	} 
    else{
            if (((e.keyCode === 66) && (window.location =='https://itracers.xyz/Developers.php')) || ((e.keyCode === 66) && (window.location =='https://itracers.xyz/Developers'))){
				window.location.href = "fordev.php"
			}
    }
} 

function ss() { //Закрытие всплывающего окна(возврат в исходное положение)
	$("p.okno").hide();
	$("p.score").show()
	document.querySelector("div.math input").focus(); //Фокусировка на поле ввода
	$("input").val('')
}

function startmath(){
	startmath.type = Math.floor(Math.random()*(3-1+1)+1);
	startmath.a = Math.floor(Math.random()*(100-1+1)+1);
	startmath.b = Math.floor(Math.random()*(100-1+1)+1);
	$("#stat").html("Правильных ответов: "+math.yes+"<br>Неправильных отвеов: "+math.no)
	if(startmath.type == 1){
		$("#zad").html("Задание:<br>"+startmath.a+" - "+startmath.b)
		startmath.cha = "-";
	}else if(startmath.type == 2){
		$("#zad").html("Задание:<br>"+startmath.a+" + "+startmath.b)
		startmath.cha = "+";
	}else{
		$("#zad").html("Задание:<br>"+startmath.a+" / "+startmath.b+"<br>Ответ округлите до десятых")
		startmath.cha = "/";
	}
}

function mathopr(){ //Определение действия и правильного ответа
	if(startmath.type == 1){
		return startmath.a - startmath.b;
	}else if(startmath.type == 2){
		return startmath.a + startmath.b;
	}else{
	//	return (Math.round((parseInt((startmath.a/startmath.b)*100))/10))/10;
		return (startmath.a/startmath.b).toFixed(1)
	}
}

function startmath2(){
	var player = $("input:eq(1)").val()
	$("input").val('')
	if (player == mathopr()){
		document.body.style.background = "green";
		$("p.score").hide()
		$("p.okno").css({'display' : 'inline-table'});;
		$("#result").html("Правильно<br>Задача: "+startmath.a+" "+startmath.cha+" "+startmath.b+" = "+player+"<br>Score: "+math.c+"+1<br><a class='buttoninv' onclick='ss()'>Ок</a>")
		document.querySelector("div.math input").blur();
		math.c++;
		math.yes++;
		startmath()
	}else{
		document.body.style.background = "red";
		$("p.score").hide()
		$("p.okno").css({'display' : 'inline-table'});
		$("#result").html("Неправильно:c<br>Задача: "+startmath.a+" "+startmath.cha+" "+startmath.b+"<br>Ваш Ответ: "+player+"<br>Правильный ответ: "+mathopr()+"<br>Score: "+math.c+"-1<br><a class='buttoninv' onclick='ss()'>Ок</a>")
		document.querySelector("div.math input").blur();
		math.c--;
		math.no++;
		startmath()
	}
}

//Шифр................................................................................................................................................
function code(){ 
	$("div.code").show();
	$("div.unknb").hide();
	$("nav").hide();
	code.score = 0;
	code.bo = false;
	codee = true;
	document.querySelector("input:enabled").focus();
}

function incub() {
	if($("leng").css('display') == "none") {
		incub.choose = $("input:enabled").index();
		incub.val = $('input:eq(' + incub.choose + ')').val();
		if(incub.live > 0 && incub.leng != incub.win){
			if(incub.val != incub.key[incub.choose]){
				incub.live--;
				document.body.style.background = "red";
				$("p.okno").html("Угадайте "+(incub.choose+1)+"-e число шифра.<br>Кол-во попыток: "+incub.live+"<br>Score: "+code.score);
				$("input.y").val('');
				if(incub.live < 1){
					codelos()
				}
			}else{
				incub.win++;
				document.body.style.background = "green";
				$("input:eq(" + incub.choose + ")").prop("disabled", true);
				$("input:eq(" + incub.choose + ")").removeClass("y");
				$("input:eq(" + incub.choose + ")").addClass("g");
				$("input:eq(" + (incub.choose + 1) + ")").prop("disabled", false);
				$("input:eq(" + (incub.choose + 1) + ")").removeClass("s");
				$("input:eq(" + (incub.choose + 1) + ")").addClass("y");
				$("p.okno").html("Угадайте "+(incub.choose+2)+"-e число шифра.<br>Кол-во попыток: "+incub.live+"<br>Score: "+code.score);
				document.querySelector("input:enabled").focus();
				if(incub.win == incub.leng){
					codewin()
				}
			}	
		}
		
	}else{
		incub.win = 0;
		incub.key = [];
		incub.leng  = $("input").val();
		incub.live = 5*incub.leng;
		$("input").val('');
		$("leng").hide();
		if(incub.leng > 900){
			speechSynthesis.speak(
			new SpeechSynthesisUtterance('Большое количество клеточек может меня плюхнуть, поэтому я ограничился трехзначным числом. Приятной игры.')
			);
		}
		for(var i = 0; i<incub.leng; i++){
			incub.key.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
		}
		for(var i = 0; i < incub.leng; i++){
			$("div.inp").append("<input type='text' maxlength='1' class ='valс y'/>");
		}
		$("input:gt(0)").prop("disabled", true);
		$("input:gt(0)").removeClass("y");
		$("input:gt(0)").addClass("s");
		$("p.okno").css({'display' : 'inline-table'}).html("Угадайте 1-e число шифра.<br>Кол-во попыток: "+incub.live+"<br>Score: "+code.score);
		document.querySelector("input:enabled").focus();
	}
}

function bg() {
	$("leng").show();
	$("div.inp").html('');
	$("p.okno").hide();
	$("input").prop("disabled", false);
	$("input").removeClass("s");
	$("input").removeClass("g");
	$("input").removeClass("y");
	$("input").css({"background" : "#000000"});
	document.querySelector("input:enabled").focus();
	$("a[onclick='incub()']").show();
	code.bo = false;
	
}

function codewin(){
	document.body.style.background = "green";
	$("p.okno").html("Вы отгадали шифр<br>Score: "+code.score+"+"+(Math.floor(incub.leng*2.5)+incub.win+"<br><a class='buttoninv' onclick='bg()'>Ок</a>"));
	code.score += Math.floor(incub.leng*2.5)+incub.win;
	$("a[onclick='incub()']").hide();
	code.bo = true;
}

function codelos(){
	document.body.style.background = "red";
	$("p.okno").html("Вы не отгадали:С<br>Score: "+code.score+"-"+Math.abs(incub.leng)+"<br><a class='buttoninv' onclick='bg()'>Ок</a>");
	code.score -=Math.abs(incub.leng);
	$("input.s").css({"background" : "#C20000"});
	$("input.y").css({"background" : "#C20000"});
	$("input.y").prop("disabled", true);
	for(var i = 0; i < incub.leng; i++){
		$("input:eq(" + i + ")").val(incub.key[i]);
	}
	$("a[onclick='incub()']").hide();
	code.bo = true;
}

function xo(){ //Крестики-нолики
	$("div.xo").show();
	$("div.unknb").hide();
	$("nav").hide();
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

 //Рандом цвета.........................................................................................................
	
function randomColor() {
	return '#' + Math.random().toString(16).slice(2, 8);
};
function color() {
	$('body').css('background', randomColor());
}

//Для разрабов
function secret(){
    
}