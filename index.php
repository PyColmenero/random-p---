<?php
 
    $link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    // GET EVERY DATA
    $user_ip = getenv('REMOTE_ADDR');
    $geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
    $country = $geo["geoplugin_countryName"];
    $city = $geo["geoplugin_city"];

    // IF NO ERROR AND NOT MY IP
    if ($geo && $geo['geoplugin_status'] == '200' && $geo["geoplugin_request"] != "90.165.221.139" && $geo["geoplugin_request"] != "84.78.26.51" && $geo["geoplugin_request"] != "90.106.172.139" && $geo["geoplugin_request"] != "90.167.21.208") { //90.167.21.208

        // BUILD SENTENCE
        $sentencia = "INSERT INTO users_data VALUES( NULL";
        foreach (array_keys($geo) as $data) {
            if($data != "geoplugin_credit" && $data != "geoplugin_status" && $data != "geoplugin_delay" && $data != "geoplugin_inEU" && $data != "geoplugin_euVATrate" && $data != "geoplugin_currencySymbol" && $data != "geoplugin_currencySymbol_UTF8" && $data != "geoplugin_currencyConverter"){
                $sentencia .= ", '" . $geo[$data] . "'";
            }
        }
        $sentencia .= ",'$link' ,NOW());";
        
        // CONECCTION DATA
        $database_user = 'u254792697_coopolarway';
        $database_pasw = 'ColmeHost06.';
        $database_name = 'u254792697_mydaytoday';
        $usertable = 'usertable_tasks';
        $database_port = '3306';
        
        // INSERT
        $con = mysqli_connect('localhost', $database_user, $database_pasw);
        mysqli_select_db($con, $database_name);
        mysqli_query($con, $sentencia);
    } else {
        // echo "<b style='color:white;'>".$geo['geoplugin_request']."</b> </br>";
        // echo "<b style='color:white;'>".$geo['geoplugin_status']."</b>";
    }
    // echo "<b style='color:white;'>".$geo['geoplugin_request']."</b>";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>

    <link rel="stylesheet" href="./styles3/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

</head>

<body>

    <div id="web">
        <main>
            <h1>Random Porn videos</h1> <!-- Random Porn videos -->
            <div id="random">

                
                <a href="#" id="a">
                    <div id="circle">
                        <div id="thumbs">
                            <img id="thum" src="" alt="">
                        </div>
                        <img src="./img/noise.gif" alt="noise" id="noise">
                        <img src="./img/play.svg" alt="play" id="play" style="display: none;">
                    </div>
                </a>
                <p id="search">BUSCAR</p>
                <div class="autoplay">
                    <input type="checkbox" id="autplayCB"/>
                    <label for="autplayCB"></label>
                    <p> Autoplay</p>
                </div>
                <h2>...</h2>
            </div>
            <div id="selections">
                <div id="categories">
                    <div id="cateChoose">
                        <p class="typeChoose choosenChoose">Category</p>
                        <p class="typeChoose">Porn Stars</p>
                    </div>
                    <input type="text" id="find" placeholder="Categoría...">
                    <div id="all_categories"></div>
                </div>
            </div>
        </main>
    </div>
    <script src="./js3/random.js"></script>
    <script src="./js3/app.js"></script>

</body>

</html>