function bun() {
	var choose = prompt("Введите одно из перечисленных значений:\n 1 - Калькулятор\n 2 - Игры\n 3 - Бабушкины загадки:D");
	switch(choose) {
		case '1': //Калькулятор
			kalc()
		break
		case '2': //Игры
			var choose3 = prompt("1 - Стрельба по коридорам\n2 - Русская рулетка\n3 - КНБ\n4 - Математический тренажер\n5 - Шифр")
			switch(choose3){
				case '1'://Стрельба по коридорам
					shot()
				break
				case '2': //Русская рулетка
					roulette()
				break
				case '3': //КНб
					knb()
				break
				case '4': //Математика, лул
					math()
				break
				case '5': //Шифр
					code()
				break
				default:
					if(typeof choose3 == 'object'){}else{
					alert("Нет такой игры:С");
					}
			}
		break
		case '3': //Загадки
			puzzles()	
		break
		case 'любит Олечку Руслан':			
			alert("Очень любит^^");
		break
		default:
			if (typeof choose == "object"){
			}else{
			alert("Чет не то:С")
			alert("не " + choose + ":C");
				}
		}
}