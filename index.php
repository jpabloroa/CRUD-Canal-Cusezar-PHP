<?php
//require __DIR__ . "/Config/bootstrap.php";
 
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
echo $uri;
$uri = explode( '/', $uri );

for($i = 0; $i>count($uri);$i++){
    echo "-".$i.": ".$uri[$i];
}
 
/*if ((isset($uri[2]) && $uri[2] != 'user') || !isset($uri[3])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}*/
 
//require PROJECT_ROOT_PATH . "/Controlador/api/UserController.php";
 
//$objFeedController = new UserController();
//$strMethodName = $uri[3] . 'Action';
//$objFeedController->{$strMethodName}();
