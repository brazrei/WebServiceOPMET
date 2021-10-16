<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  include('proxy.php'); 
  include('token/token.php'); 
   
  function setProxyContext() {
   // Username and Password are required only if your proxy server needs basic authentication
    $PROXY_USER = $GLOBALS['PROXY_USER'];
    $PROXY_PASS = $GLOBALS['PROXY_PASS'];
    $PROXY_HOST = $GLOBALS['PROXY_HOST'];
    $PROXY_PORT = $GLOBALS['PROXY_PORT'];
    
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
    //$url = "https://opmet.decea.mil.br/redemet/consulta_redemet?local=$localidades&msg=metar";
    $url = "https://opmet.decea.mil.br/redemet/consulta_redemet?local=$localidades&msg=$msg&data_ini=2021101619&data_fim=2021101620";
  echo $url;
    //$url = "https://opmet.decea.mil.br/redemet/consulta_iwxxm?local=$localidades&msg=taf&data_ini=2021101612&data_fim=2021101618&formato=json";
       
    /* Init cURL resource */
    $ch = curl_init($url);

    /* set the content type json */
    $headers = [];
    $headers[] = 'Content-Type:application/json';
    $headers[] = "Authorization: ".$token;

    //proxy settings
    $proxy = "$PROXY_HOST:$PROXY_PORT";
    $proxyauth = "$PROXY_USER:$PROXY_PASS";

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
