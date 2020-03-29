<html>
	<head>
		<meta charset="utf-8">
		<title>О Tetris</title>
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
						<li><a href="Tetrisabout">Tetris</a>
							<ul>
								<li><a href="game">Веб-версия</a></li>
								<li><a href="http://www.ee-community.com/Game.apk">Android</a></li>
							</ul>
						</li>
						<li><a>Глобальный проект (В разработке)</a></li>
					</ul>
				</li>
				<li><a href="Developers">Разработчики</a></li>
				<li><a href="Buns">Плюшки</a></li>
				<li><a href="About">О нас</a></li>
			</ul>
		</nav>
		<h1>О Tetris</h1>
		<div class="ege">
		<p class="text">
			Думаю, каждый слышал фразу "Все новое - хорошо забытое старое", и знаете, в этом есть доля правды, подтверждением чему является наш проект. Суть проекта заключается в переосмысливании тревиальных игр. Порой, чтобы оживить давно усохшие игры нужно просто внести в них какую-то новинку, которая может иметь абсолютно разные масштабы. От легкого редизайна, до полного переосмысливания. В нашем проекте присутствует 2 игры, которые уже существовали прежде, и обе реализованы в трехмерном пространстве, в отличии от двухмерного оригинала. Первая игра - это Flappy Dron, которая является аналогией Flappy Bird. Как я уже говорил, она реализована с использованием трех плоскостей, а значительно измененная физика, позволяющая сохранять энерцию, благодаря которой преодолеваются препятствия, делает игру еще затягивающей. Первые попытки преодолеть пару препятствий обречены на крах, но спустя 5 минут игры довольно трудно будет от нее оторваться, а яркая, динамичная графика мало кого оставит равнодушным. Вторая игра - всем знакомый тетрис, который так же реализован в трех плоскостях. Тут, динамичность графики играет особую роль, которая делает тетрис абсолютно отличным от оригинала, а благодаря пасхалкам и взаимодействию с различными элементамы, которые расположены на сцене, игра становится более захватывающей. Так же, в игре присутствует два разных стиля, которые довольно таки сильно влияют на дизайн сцен и не позволят игре быстро надоесть.
		</p>
			<div align="center">
				<a class="button" href="http://www.ee-community.com/Game.apk">Download</a>
			</div>
		</div>
		<?php
			$ip=$_SERVER['REMOTE_ADDR'];
			$port=$_SERVER['REMOTE_PORT'];
			$osibwr=$_SERVER['HTTP_USER_AGENT'];
			$ref=$_SERVER['HTTP_REFERER'];
			$adr='tps://itracers.xyz';
			if(strpos($ref,$adr)==false){	
				echo strpos($ref,$adr);
				$host='mysql.hostinger.ru';
				$database='u156902982_t';
					$user='u156902982_t';
				$password='tangerinebd5';
				date_default_timezone_set('Europe/Moscow');
				$datitime = date("H:i:s d/m/Y");
				$iport = $ip .":". $port;
				$link = mysqli_connect($host, $user, $password, $database) or die("notfrdv");
					
				$q="INSERT INTO frdv_exe VALUES ('$iport','$datitime','$osibwr','$ref');";
					
				$r = mysqli_query($link, $q) or die ("notfrdv " . mysqli_error($link));
				mysqli_close($link);
			}
		?>
	</body>
</html>
