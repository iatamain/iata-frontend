<html>
	<head>
		<meta charset="utf-8">
		<title>ITracers</title>
		<link rel="stylesheet" href="script/style.css">
		<script src="Asteroid/jquery.min.js"></script>
		<script type="text/javascript" src="script/main.js"></script>
	</head>
	<body>
		<nav>
			<ul>
				<li><a href="http://itracers.xyz">Главная</a></li>
				<li><a>Наши проекты</a>
					<ul>
						<li><a href="Tetrisabout">Tetris</a></li>
						<li><a>Глобальный проект (В разработке)</a></li>
					</ul>
				</li>
				<li><a href="Developers">Разработчики</a></li>
				<li><a href="Buns">Плюшки</a></li>
				<li><a href="About">О нас</a></li>
			</ul>
		</nav>
	
	
		<div align="center" class="code">
			<div class="inp">
			</div>
			<leng>
			<p class="ll">Введите длину шифра:</p>
			<input type='text' maxlength='3' class ='valcс'/>
			</leng>
			<a class="button" onclick="incub()">Ок</a>
			<br>
			<p class="okno"></p>
			<br>
			<a class="button" onclick="showw()">Назад</a>
		</div>
		
		<div align="center" class="knb">
			<a class="button" onclick="knbstone()">Камень</a>
			<a class="button" onclick="knbclip()">Ножницы</a>
			<a class="button" onclick="knbpaper()">Бумага</a>
			<br>
			<p align="center" id="you" class="score">Вы:</p>
			<p align="center" id="score" class="score">Результат:</p>
			<p align="center" id="bot" class="score">Бот:</p>
			<br>
			<a class="button" onclick="showw()">Назад</a>
		</div>
		
		<div align="center" class="math">
			<input type="text" class ="val"/>
			<a class="button" onclick="startmath2()">Ок</a>
			<br>
			<p align="center" id="result" class="okno">Результат:</p>
			<br>
			<p align="center" id="zad" class="score">Задание:</p>
			<br>
			<p align="center" id="stat" class="score">Статистика:</p>
			<br>
			<a class="button" onclick="showw()">Назад</a>
		</div>
		
		<div align="center" class="calc">
			<a class="button hh a1" onclick="summ()">a+b</a>
			<a class="button hh a2" onclick="differ()">a-b</a>
			<a class="button hh a3" onclick="mult()">a*b</a>
			<a class="button hh a4" onclick="divis()">a/b</a>
			<a class="button h a5" onclick="power()">a<sup>b</sup></a>
			<a class="button hh a6" onclick="rooot()">va</a>
			<a class="button h a7" onclick="croot()"> <sup>3</sup>va </a>
			<a class="button hh a8" onclick="bank()">$abc</a>
			<br>
			<h2><p class=" d">Сложение</p></h2>
			<div class="unputt">
				<div class='1'>
					<a class="ll 1">Первое слагаемое:</a>
					<input type="text" class ="valcс 1"/>
				</div>
				<div class='2'>
					<a class="ll 2">Второе слагаемое:</a>
					<input type="text" class ="valcс 2"/>
				</div>
				<div class='3'>
					<a class="ll 3">На сколько лет:</a>
					<input type="text" maxlength='3' class ="valcс 3"/>
				</div>
				<p align="center" class="score re">Результат:</p>
				<br>
				<a class="button otstup" onclick="start()">Ок</a>
				<a class="button otstup" onclick="showw()">Назад</a>
			</div>		
		</div>
		
		<div align="center" class="xo">
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<br>
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<br>
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<input type='button' value="ок"/>
			<br>
			<p class="okno"></p>
			<br>
			<a class="button" onclick="showw()">Назад</a>
		</div>
		
		<div align = "center" class="unknb">
			<p>
				<div onclick="calc()" class="ramm" style="background-image: url(img/site/calc.png);background-size: contain;">
					Калькулятор
				</div>
				<div onclick="math()" class="ramm" style="background-image: url(img/site/tren.png);background-size: contain;">
					Тренажер 
				</div>
				<div onclick="code()" class="ramm" style="background-image: url(img/site/shifr.png);background-size: contain;">
					Шифр
				</div>
				<div onclick="knb()" class="ramm" style="background-image: url(img/site/knb.png);background-size: contain;">
					КНБ
				</div>
				<div class="ramm">
					Asteroid102И: Infinity
					<a href="Asteroid/game.php"><img src="Asteroid/ship.png" width=100% height=89% title="Asteroid102И: Infinity"></a>
				</div>
				<div class="ramm">
					Life
					<a href="Life/game.html"><img src="img/site/life.jpg" width=100% height=89% title="Life"></a>
				</div>
			</p>
		</div>
	</body>
</html>