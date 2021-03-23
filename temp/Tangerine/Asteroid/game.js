highscore = 0;

//$('canvas').css("wight" : window.innerWidth)
//$('canvas').css("height" : window.innerHeight)


start()
function start(){
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


context.fillStyle = "#00F";
context.font = "bold 15pt sans-serif";
var aster = [];
var fire = [];
var boom = [];
var ship = {x: 300, y: 300}
var amet = false;
var sanya = false;
var iluh = false;
var superr = 0;
var superver = 0.965;
var speedshot = 7;
var score = 0;
var timer = 0;
var life = 20;

var fonimg = new Image(); //Фон
fonimg.src = 'fon.jpg';
var asterimg = new Image(); //Астероид
asterimg.src = 'aster.png';
var asterimg2 = new Image(); //Крис
asterimg2.src = 'aster2.png';
var shipimg = new Image(); //Шатл
shipimg.src = 'ship.png';
var shipimg2 = new Image(); //Даня
shipimg2.src = 'ship2.png';
var fireimg = new Image(); //Выстрел
fireimg.src = 'fire.png';
var spaceimg  = new Image(); //Рамка
spaceimg.src = 'space.png'
var ametimg = new Image(); //Амет
ametimg.src = 'amet.png';
var ametimg2 = new Image();
ametimg2.src = 'amet2.png'
var sanyaimg = new Image(); //Саня
sanyaimg.src = 'sanya.png';
var sanyaimg2 = new Image();
sanyaimg2.src = 'sanya2.png'
var iluhimg = new Image(); //Илюха
iluhimg.src = 'iluh.png';
var iluhimg2 = new Image();
iluhimg2.src = 'iluh2.png'
var explimg = new Image();
explimg.src = 'boom.png'

canvas.addEventListener("mousemove", function(event){
	ship.x = event.offsetX -25;
	ship.y = event.offsetY -25;
});

document.onkeyup = function (e) {  //Нажатие ENTER
e = e || window.event; 
	if (e.keyCode === 32) {
		if(life > 0){
			if(amet && iluh && sanya){
				score += aster.length;
				for(i in aster){
					aster[i].del = true;
				}
				amet = false;
				sanya = false;
				iluh = false;
			}
		}else{
			start()
		}
	}
}

fonimg.onload = function(){
	game();
}

function game(){
		if(life > 0){
			update();
		}
		render();
		requestAnimFrame(game);
}

function update(){
	timer ++;    //Генерация астероидов
	if(timer % 15 == 0){
		aster.push({
			x: Math.random()*(550+600), 
			y: -50, 
			dx: Math.random()*2-1,
			dy: Math.random()*2+2,
			bon: Math.random(),
			del: false,
			expl: 0
		})
		
		if(speedshot < 7){
			speedshot++;	
		}
		if(superr){
			superr--;
		}else{
			speedshot = 7;
		}
		
	}
	
	if(timer % speedshot == 0){
		fire.push({
			x: ship.x + 25,
			y: ship.y + 25,
			dx: 0,
			dy: -5
		})
		if(superr){
			fire.push({
			x: ship.x + 25,
			y: ship.y + 25,
			dx: 5,
			dy: -5
			})
			fire.push({
			x: ship.x + 25,
			y: ship.y + 25,
			dx: -5,
			dy: -5
			})			
		}
	}
	
	for(i in aster){
		//физика

		aster[i].x += aster[i].dx;
		aster[i].y += aster[i].dy;
		
	
		//границы
		if(aster[i].x > 560 || aster[i].x < 0){
			aster[i].dx = -aster[i].dx;
		}
		if(aster[i].y > 650){ //Удаление, дабы не перегружать память
			aster.splice(i, 1);
			life--;
			if(life <= 0){
				if(highscore < score){
					highscore = score;
				}
				context.clearRect(0,0,1200,600);
				context.fillStyle = "#FF0000";
				context.font = "bold 30pt sans-serif";
				context.fillText("Game over", 180+300, 200)
				context.fillText("Score:" + score, 180+300, 250)
				context.fillText("High score:" + highscore, 180+300, 300)

			}
		}
		
		for(j in fire){
			if(Math.abs(aster[i].x +25 - fire[j].x) < 20 && Math.abs(aster[i].y + 25 - fire[j].y) < 20){
				aster[i].del = true;
				fire.splice(j, 1);
			}
		}
				
		if(aster[i].del){
			if(aster[i].bon > superver){
				superr = 15;
				speedshot = 1;
			}else if(aster[i].bon < 0.05){
				amet = true;
			}else if(aster[i].bon > 0.05 && aster[i].bon < 0.1){
				sanya = true;
			}else if(aster[i].bon > 0.1 && aster[i].bon < 0.15){
				iluh = true;
			}
			if(aster[i].expl > 3){
				aster.splice(i, 1);
				score++;
			}else{
				aster[i].expl++;
			}			
		}
	}
	
	
	for(i in fire){
		fire[i].y += fire[i].dy;
		fire[i].x += fire[i].dx;
		
		if(fire[i].y < 0){
			fire.splice(i, 1);
		}
	}	
}

function render(){
	$('canvas').css('height', window.innerHeight);
	$('canvas').css('width', window.innerWidth);	
	if(life> 0){
		context.drawImage(fonimg, 0, 0, 1200, 600);
		context.drawImage(spaceimg, 385+600, 5, 200, 54);
		context.fillText("Score : " + score, 20, 20)
		context.fillText("High score : " + highscore, 20, 40)
		context.fillText("Life : " + life, 20, 60)
		if(amet){
			context.drawImage(ametimg2, 458+600, 13, 30, 40);
		}
		if(sanya){
			context.drawImage(sanyaimg2, 501+600, 13, 30, 40);
		}
		if (iluh){
			context.drawImage(iluhimg2, 545+600, 13, 30, 40);
		}
		
		
		if(!superr){
			for(i in fire)  context.drawImage(fireimg, fire[i].x, fire[i].y, 2, 10);
			context.drawImage(shipimg, ship.x, ship.y, 50, 50); //Даня
		}else{
			context.drawImage(shipimg2, ship.x, ship.y, 50, 50);
			for(i in fire)  context.drawImage(fireimg, fire[i].x, fire[i].y, 2, 10);
		}
		for(i in fire)  context.drawImage(fireimg, fire[i].x, fire[i].y, 2, 10);
		for(i in aster){
			if(!aster[i].expl){
				if(aster[i].bon > superver){
					context.drawImage(asterimg2, aster[i].x, aster[i].y, 50, 50); //Крис
				}else if(aster[i].bon < 0.035){
					context.drawImage(ametimg, aster[i].x, aster[i].y, 50, 50); //Амет
				}else if(aster[i].bon > 0.05 && aster[i].bon < 0.1){
					context.drawImage(sanyaimg, aster[i].x, aster[i].y, 50, 50); //Саня
				}else if(aster[i].bon > 0.1 && aster[i].bon < 0.15){
					context.drawImage(iluhimg, aster[i].x, aster[i].y, 50, 50); //Илья
				}else{
					context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50); //Дефолт
				}
			}else{
				context.drawImage(explimg, aster[i].x, aster[i].y, 50, 50);
			}
		}
	}
}

var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 50);
	};
})();

}