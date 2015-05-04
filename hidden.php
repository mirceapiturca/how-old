<?php

$img = trim($_POST["userid"]);

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$unique = uniqid();
$url = 'img/' . $unique . '.png';
file_put_contents($url, $data);

echo $url;

?>
