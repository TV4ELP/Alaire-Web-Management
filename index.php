<?php 
 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "localhost/147011778637856768/73e7d032b1fdf457efef44916c79a424b2d99d25"); 
curl_setopt($ch, CURLOPT_PORT, 9999);
$output = curl_exec($ch);
curl_close($ch);   

return $output;
?>

