<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  include('proxy.php'); 

  function extractBearer($token){
    echo $token;
    $token = json_decode($token);
    return $token->authorization;
  }

function exportToken2PHP($token) {
    
    $dirName = "token";
    if (!file_exists($dirName)) {
       mkdir($dirName, 0777);
    }
    $tokenFileName = $dirName . "/" . 'token.php';
    
    $file = fopen($tokenFileName, 'w');
    fwrite($file, "<?php");
    $t = extractBearer($token));
    fwrite($file, '  $token = ' . "'$t'");
    fwrite($file, "?>");
    fclose($file);    
    //$cachetime = 65;
  /*
    // Serve from the cache if it is younger than $cachetime
    if (file_exists($cachefile) && time() - $cachetime < filemtime($cachefile)) {
        echo "<!-- Cached copy, generated ".date('H:i', filemtime($cachefile))." -->\n";
        readfile($cachefile);
        exit;
    }
    */
  }
  /**
  * Get an authentication token
  */
  function auth() {
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
   exportTokenPHP($output);
    
   if ($output === false)
   {
      echo "Failed to authenticate\n";
      var_dump(curl_getinfo($cl));
      return NULL;
   }
  }

  //setProxy();
  //$response =  auth();
  $response = '{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmF6cmFiX3JkbXQiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifSx7ImF1dGhvcml0eSI6InJlZGVtZXQtc2VydmljZS5yZWFkIn1dLCJwcm9maWxlUm9sZSI6IlNZU1RFTSIsImlhdCI6MTYzNDM4NTAwMiwiZXhwIjoxNjM1MjQ5MDAyfQ.A4VIIWFFjVVi0eeraGT_vdIgZlLLwpcj1KTPywyszSs"}';
  
  exportToken2PHP($response);
  echo "Done!";
?>
