<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  //inutil, por enquanto, o argumento proxy esta sendo removido da url antes de chegar aqui
  if (isset($_GET['proxy']) && ($_GET['proxy'] == "true"))
    include('proxy.php'); 

  function extractBearer($token){
    echo $token;
    $token = json_decode($token);
    return $token->authorization;
  }

  function exportToken2PHP($token) {
    
    $dirName = "token";
    if (!file_exists($dirName)) {
       if(!@mkdir($dirName))
	  echo "Erro ao tentar criar a pasta $dirName";
    }
    $tokenFileName = $dirName . "/" . 'token.php';
    
    $file = fopen($tokenFileName, 'w');
    fwrite($file, "<?php\n");
    $t = extractBearer($token);
    $t = "'$t';";
    fwrite($file, '  $token = ');
    fwrite($file, $t);
    fwrite($file, "\n?>");
    fclose($file);    
  }

  /**
  * Get an authentication token
  */
  function getAuth() {
   $serverURL = "https://opmet.decea.mil.br/adm/login";
   $cl = curl_init($serverURL);

    //proxy settings
   $PROXY_USER = $GLOBALS['PROXY_USER'];
   $PROXY_PASS = $GLOBALS['PROXY_PASS'];
   $PROXY_HOST = $GLOBALS['PROXY_HOST'];
   $PROXY_PORT = $GLOBALS['PROXY_PORT'];
   $proxy = "$PROXY_HOST:$PROXY_PORT";
   $proxyauth = "$PROXY_USER:$PROXY_PASS";
   curl_setopt($cl, CURLOPT_PROXY, $proxy);
   curl_setopt($cl, CURLOPT_PROXYUSERPWD, $proxyauth);
   //
   $username = "brazrab_rdmt";
   $password= "**00rEinaldo";
    
   $headers = [];
   $headers[] = 'Content-Type:application/json';
   curl_setopt($cl, CURLOPT_HTTPHEADER, $headers);
   curl_setopt($cl, CURLOPT_FOLLOWLOCATION, true);
//   curl_setopt($cl, CURLOPT_USERPWD, "$username:$password");
//   curl_setopt($cl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
   curl_setopt($cl, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($cl, CURLOPT_POST, true);   
   curl_setopt($cl, CURLOPT_POSTFIELDS, "{\"username\":\"$username\",\"password\":\"$password\"}");
    
   $output = curl_exec($cl);
    
   $status_code = curl_getinfo($cl, CURLINFO_HTTP_CODE);   //get status code
   $info = curl_getinfo($cl);
   curl_close($cl);

   return $output;
  }

  function deleteOldTokenFile($idade = 5) { //idade em minutos
    $fileName = "token".DIRECTORY_SEPARATOR."token.php";
    if (file_exists($fileName)) {
        if (time() - filectime($fileName) >= $idade * 60) { 
          unlink($fileName);
          return true;
        }
    }
    return false;
  }
      
  if (deleteOldTokenFile(5)) //tempo em minutos
    exportToken2PHP(getAuth());
  echo "Done!";
?>
