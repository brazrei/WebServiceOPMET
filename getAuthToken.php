<?php
/**
 * Get an authentication token
 */
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

function auth()
{
   $serverURL = "https://opmet.decea.mil.br/adm/login";
   $cl = curl_init();
   curl_setopt($cl, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($cl, CURLOPT_URL, "$serverURL");
   curl_setopt($cl, CURLOPT_POST, true);
   /* uncomment this line if you don't have the required SSL certificates */
   // curl_setopt($cl, CURLOPT_SSL_VERIFYPEER, false);
   curl_setopt($cl, CURLOPT_POSTFIELDS, array(
     "username" => "brazrab_rdmt",
     "password" => "00rEinaldo"
   ));
   $auth_response = curl_exec($cl);
   if ($auth_response === false)
   {
      echo "Failed to authenticate\n";
      var_dump(curl_getinfo($cl));
      curl_close($cl);
      return NULL;
   }
   curl_close($cl);
   return json_decode($auth_response, true);
}
setProxy();

echo auth();
?>