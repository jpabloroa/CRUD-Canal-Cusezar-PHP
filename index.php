<?php
require __DIR__ . "/Config/bootstrap.php";

$URL = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$inputUri = explode('/', $URL);

for ($i = 0; $i < count($inputUri); $i++) {
    if ($inputUri[$i] == "index.php") {
        $k = 0;
        $j = $i + 1;
        if (!$j >= count($inputUri)) {
            for ($j; $j < count($inputUri); $j++) {
                $parsedUri[$k] = $inputUri[$j];
                $k++;
            }
        } else {

            //
            if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
                $link = "https";
            } else {
                $link = "http";
            }

            // Here append the common URL characters.
            $link .= "://";

            // Append the host(domain name, ip) to the URL.
            $link .= $_SERVER['HTTP_HOST'];

            // Append the requested resource location to the URL
            $link .= substr($URL, -9) . "index.html";

            header("location: $link");
            exit;
        }
    }
}

echo "<br>";

echo "Array recibido" . count($inputUri);
echo "<br>";
echo "Array parseado" . count($parsedUri);
echo "<br>";

for ($i = 0; $i < count($parsedUri); $i++) {
    echo " $i - $parsedUri[$i] <br>";
}

if ($parsedUri) {
}

require PROJECT_ROOT_PATH . "/Controlador/api/UserController.php";

$objFeedController = new UserController();
$strMethodName = $uri[3] . 'Action';
$objFeedController->{$strMethodName}();
