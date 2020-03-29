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
 