<?php
/**
 * Get an authentication token
 */
function auth()
{
   $serverURL = "https://opmet.decea.mil.br/adm/login";
   $cl = curl_init();
   curl_setopt($cl, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($cl, CURLOPT_URL, "$serverURL/oauth2/token");
   curl_setopt($cl, CURLOPT_POST, true);
   /* uncomment this line if you don't have the required SSL certificates */
   // curl_setopt($cl, CURLOPT_SSL_VERIFYPEER, false);
   curl_setopt($cl, CURLOPT_POSTFIELDS, array(
     "grant_type" => "client_credentials",
     "client_id" => "my@email.address",
     "client_secret" => "my password"
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
?>
