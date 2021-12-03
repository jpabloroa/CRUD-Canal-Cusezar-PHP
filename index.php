<?php
require __DIR__ . "/Config/bootstrap.php";

$URL = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$inputUri = explode('/', $URL);

for ($i = 0; $i < count($inputUri); $i++) {
    if ($inputUri[$i] == "index.php") {
        $k = 0;
        for ($j = $i + 1; $j < count($inputUri); $j++) {
            $parsedUri[$k] = $inputUri[$j];
            $k++;
        }
    }
}

echo "<br>";

echo "Array recibido".count($inputUri);
echo "Array parseado".count($parsedUri);

for ($i = 0; $i < count($parsedUri); $i++) {
echo " $i - $parsedUri[$i] <br>";
}


require PROJECT_ROOT_PATH . "/Controlador/api/UserController.php";
 
//$objFeedController = new UserController();
//$strMethodName = $uri[3] . 'Action';
//$objFeedController->{$strMethodName}();
