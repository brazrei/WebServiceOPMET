<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  //inutil, por enquanto, o argumento proxy esta sendo removido da url antes de chegar aqui
  if (isset($_GET['proxy']) && $_GET['proxy'] == "true")
    include('proxy.php'); 

  include('getAuthToken.php'); 

  include('token/token.php'); 

  function sortMetar($locs, $text) {
    $arrLocs = explode (",", $locs);
    $arrMetares = explode("=", $text);
    $resultado = ""; 
    foreach ($arrLocs as $loc) {
        foreach ($arrMetares as $metar) {
            if (strpos($metar, $loc))
              $resultado = "$resultado$metar=";
        }
      
    }    
    return $resultado;
    
  }
  
  function setProxyContext() {
    if (!isset($GLOBALS['PROXY_USER']))
   	return;
   // Username and Password are required only if your proxy server needs basic authentication
    if (isset($GLOBALS['PROXY_USER']))
      $PROXY_USER = $GLOBALS['PROXY_USER'];
    if (isset($GLOBALS['PROXY_PASS']))
      $PROXY_PASS = $GLOBALS['PROXY_PASS'];
    if (isset($GLOBALS['PROXY_HOST']))
      $PROXY_HOST = $GLOBALS['PROXY_HOST'];
    if (isset($GLOBALS['PROXY_PORT']))
      $PROXY_PORT = $GLOBALS['PROXY_PORT'];
    
    $auth = base64_encode("$PROXY_USER:$PROXY_PASS");
    $proxyBearer = "tcp://$PROXY_HOST:$PROXY_PORT"; 
    stream_context_set_default(
     array(
      'http' => array(
       'proxy' => $proxyBearer,
       'request_fulluri' => true,
       'header' => "Proxy-Authorization: Basic $auth"
       // Remove the 'header' option if proxy authentication is not required
      )
     )
    );
  }    

   setProxyContext();

   /* API URL */
    //$url = 'https://opmet.decea.mil.br/redemet/consulta_redemet?local=SBBH&msg=metar&data_ini=2021100100&data_fim=2021100101';
    try {
      $localidades = strtoupper($_GET['local']);
    } catch(Exception $e) {
      echo "Favor informar ao menos uma localidade para consulta!";
      exit;
    }
    $msg = $_GET['msg'];
    //$url = "https://opmet.decea.mil.br/redemet/consulta_redemet?local=$localidades&msg=$msg";
    //$url = "https://opmet.decea.mil.br/redemet/consulta_redemet?local=$localidades&msg=$msg&data_ini=2021101610&data_fim=2021101620";
    //echo $url;
//    $url = "https://opmet.decea.mil.br/redemet/consulta_iwxxm?local=$localidades&msg=taf&data_ini=2021101612&data_fim=2021101618&formato=json";
    $url = "https://opmet.decea.mil.br/redemet/consulta_iwxxm?local=$localidades&msg=taf&formato=json";
    /*if (isset($_GET['data_ini']))
      $url = "$url&data_ini=" . $_GET['data_ini'];  
    if (isset($_GET['data_fim']))
      $url = "$url&data_fim=" . $_GET['data_fim'];  
    /* Init cURL resource */
//    echo $url."---";
    $ch = curl_init($url);

    /* set the content type json */
    $headers = [];
    $headers[] = 'Content-Type:application/json';
    $headers[] = "Authorization: " . $token;

    //proxy settings
    if (isset($GLOBALS['PROXY_USER'])){
      $proxy = "$PROXY_HOST:$PROXY_PORT";
      $proxyauth = "$PROXY_USER:$PROXY_PASS";
      curl_setopt($ch, CURLOPT_PROXY, $proxy);
      curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
    /* set return type json */
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
    /* execute request */
    $result = curl_exec($ch);
         
    /* close cURL resource */
    curl_close($ch);
    
    if  ($msg == "metar"){
      echo sortMetar($localidades,$result);
    } else
      echo $result;
  
?>


