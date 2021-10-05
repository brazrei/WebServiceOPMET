<?php

 // $url = "https://opmet.decea.mil.br/redemet//consulta_redemet?local=SBSP&msg=METAR&data_ini=2020120100&data_fim=2020120123";
  $url = "https://opmet.decea.mil.br/adm/login";


  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $headers = array(
     "Content-Type: application/json"
  );
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

  $data = '{"login":"priscila_bdc","password":"789Cimaer@"}';

  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

  //for debug only!
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  $resp = curl_exec($curl);
  curl_close($curl);
  var_dump($resp);

?>
