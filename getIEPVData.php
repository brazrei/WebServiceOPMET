<?php
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
 // $url = "https://opmet.decea.mil.br/redemet//consulta_redemet?local=SBSP&msg=METAR&data_ini=2020120100&data_fim=2020120123";
  $localidade = $_GET["localidade"];
  $begindate = $_GET["begindate"];
  $enddate = $_GET["enddate"];
  $url = "https://opmet.decea.mil.br/bdc/searchiepv?icaocodes=" . $localidade . "&begindate=" . $begindate . "&enddate=" . $enddate;

  echo $url;
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  //curl_setopt($curl, CURLOPT_GET, true);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $headers = array(
     "'accept': '*/*'",
     "'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjMzNDU3NzMyLCJleHAiOjE2MzQzMjE3MzJ9.pfCEuelXAtn79hDUsTLWtP7o7hzUpfbJCBE9siburf8'"
  );
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

  //$data = '{"login":"priscila_bdc","password":"789Cimaer@"}';

  //curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

  //for debug only!
  //curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  //curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  $resp = curl_exec($curl);
  curl_close($curl);
  echo $resp;

?>
