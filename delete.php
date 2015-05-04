<?php
$img = trim($_POST["filename"]);
unlink($img);
echo $img;
?>
