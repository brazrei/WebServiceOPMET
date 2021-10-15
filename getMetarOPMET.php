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
  function getMetar($access_token) {
  $headers = array(
    'Content-Type: application/json',
    sprintf('Authorization: Bearer %s', $access_token)
  );

  $curl = curl_init("https://opmet.decea.mil.br/redemet/consulta_redemet?local=SBBH&msg=metar&data_ini=2021100100&data_fim=2021100101");

  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $result = json_decode(curl_exec($curl));

  return $result;
  }

    setProxy();
/*
$url = 'http://dynupdate.no-ip.com/ip.php';
$proxy = '127.0.0.1:8888';
//$proxyauth = 'user:password';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_PROXY, $proxy);
//curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
$curl_scraped_page = curl_exec($ch);
curl_close($ch);


    echo $curl_scraped_page;
    
  */
    /* API URL */
    $url = 'https://opmet.decea.mil.br/redemet/consulta_redemet?local=SBBH&msg=metar&data_ini=2021100100&data_fim=2021100101';
    $token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmF6cmFiX3JkbXQiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifSx7ImF1dGhvcml0eSI6InJlZGVtZXQtc2VydmljZS5yZWFkIn1dLCJwcm9maWxlUm9sZSI6IlNZU1RFTSIsImlhdCI6MTYzNDMxNDUwNSwiZXhwIjoxNjM1MTc4NTA1fQ.bgmh6ehNESoxXOvaGjRLbiQfn-89mQvPZyisQNHKU3U";
    
    //echo $token;
    //exit;
    echo getMetar($token);
    exit;
       
    /* Init cURL resource */
    $ch = curl_init($url);
        
    /* Array Parameter Data */
    //$data = ['local'=>'sbsp', 'msg'=>'metar', 'data_ini'=>'2021100100', 'data_fim'=>'2021100101'];
        
    /* pass encoded JSON string to the POST fields */
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
    /* set the content type json */
    $headers = [];
    $headers[] = 'Content-Type:application/json';
    $headers[] = "Authorization: Bearer ".$token;

    //proxy settings
    $proxy = 'proxy.decea.intraer:8080';
    $proxyauth = 'brazrab:12345678';

    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
    /* set return type json */
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
    /* execute request */
    $result = curl_exec($ch);
         
    /* close cURL resource */
    curl_close($ch);

    echo $result;
  
?>
