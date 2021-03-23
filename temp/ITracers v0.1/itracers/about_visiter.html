<html>
	<head>
		<meta charset="utf-8">
		<title>Данные о посетителях</title>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="js.js"></script>
        <style>
            table{
				border:3px #c4a826 dashed;
				font-family:'Comic Sans MS';
			}
			
			td{
				border:solid 1px #9f9f0f;
			}
        </style>
	</head>
	<body>
        <br>
			<p>Введи ip для сортировки</p>
        <br>
        <form method="post">
            <input type="text" name="ip">
        </form>
        <?php
			$host='mysql.hostinger.ru';
			$database='u156902982_t';
			$user='u156902982_t';
			$password='tangerinebd5';
			$ip=$_POST['ip'];
			if(isset($_POST['ip'])){
				$ip=substr($ip,0,strpos($ip,':'));
				$q="select * from frdv_exe where ipport like '%$ip%'";
			}
			else{
				$q="select * from frdv_exe";
			}
			
			$link = mysqli_connect($host, $user, $password, $database) or die(mysqli_error($link));
			$result = mysqli_query($link, $q) or die (mysqli_error($link));
			if($result){
				$rows = mysqli_num_rows($result); // количество полученных строк
				 
				echo "<table><tr><th>ip</th><th>time</th><th>browser&os</th><th>refer</th></tr>";
				
				for ($i = 0 ; $i < $rows ; ++$i)
				{
					$row = mysqli_fetch_row($result);
					echo "<tr>";
						for ($j = 0 ; $j < 4 ; ++$j){
							echo "<td>$row[$j]</td>";
						}
					echo "</tr>";
				}
				echo "</table>";
			}
			// очищаем результат
			mysqli_free_result($result);
			mysqli_close($link)
        ?>
    </body>
</html>
