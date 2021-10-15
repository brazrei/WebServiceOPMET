<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
    
function setProxy() {
    $PROXY_HOST = "proxy.decea.intraer"; // Proxy server address
    $PROXY_PORT = "8080";    // Proxy server port
    $PROXY_USER = "brazrab";    // Username
    $PROXY_PASS = "12345678";   // Password
    // Username and Password are required only if your proxy server needs basic authentication
    
    $auth = base64_encode("$PROXY_USER:$PROXY_PASS");
    stream_context_set_default(
     array(
      'http' => array(
       'proxy' => "tcp://$PROXY_HOST:$PROXY_PORT",
       'request_fulluri' => true,
       'header' => "Proxy-Authorization: Basic $auth"
       // Remove the 'header' option if proxy authentication is not required
      )
     )
    );
  }    

    setProxy();
    /* API URL */
    $url = 'https://opmet.decea.mil.br/redemet/consulta_redemet?local=SBBH&msg=metar&data_ini=2021100100&data_fim=2021100101';
        
    /* Init cURL resource */
    $ch = curl_init($url);
        
    /* Array Parameter Data */
    //$data = ['local'=>'sbsp', 'msg'=>'metar', 'data_ini'=>'2021100100', 'data_fim'=>'2021100101'];
        
    /* pass encoded JSON string to the POST fields */
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
    /* set the content type json */
    //$headers = [];
    //$headers[] = 'Content-Type:application/json';
    $token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmF6cmFiX3JkbXQiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifSx7ImF1dGhvcml0eSI6InJlZGVtZXQtc2VydmljZS5yZWFkIn1dLCJwcm9maWxlUm9sZSI6IlNZU1RFTSIsImlhdCI6MTYzNDMxNDUwNSwiZXhwIjoxNjM1MTc4NTA1fQ.bgmh6ehNESoxXOvaGjRLbiQfn-89mQvPZyisQNHKU3U";
    $headers = ["Authorization: Bearer ".$token;]
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
    /* set return type json */
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
    /* execute request */
    $result = curl_exec($ch);
         
    /* close cURL resource */
    curl_close($ch);

    echo $result;
  
?>
