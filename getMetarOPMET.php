<?php
    
    /* API URL */
    $url = 'https://opmet.decea.mil.br/redemet/consulta_redemet';
        
    /* Init cURL resource */
    $ch = curl_init($url);
        
    /* Array Parameter Data */
    $data = ['local'=>'sbsp', 'msg'=>'metar', 'data_ini'=>'2021100100', 'data_fim'=>'2021100101'];
        
    /* pass encoded JSON string to the POST fields */
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
    /* set the content type json */
    $headers = [];
    $headers[] = 'Content-Type:application/json';
    $token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmF6cmFiX3JkbXQiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifSx7ImF1dGhvcml0eSI6InJlZGVtZXQtc2VydmljZS5yZWFkIn1dLCJwcm9maWxlUm9sZSI6IlNZU1RFTSIsImlhdCI6MTYzNDMxNDUwNSwiZXhwIjoxNjM1MTc4NTA1fQ.bgmh6ehNESoxXOvaGjRLbiQfn-89mQvPZyisQNHKU3U";
    $headers[] = "Authorization: Bearer ".$token;
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
    /* set return type json */
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
    /* execute request */
    $result = curl_exec($ch);
         
    /* close cURL resource */
    curl_close($ch);

    echo $result;
  
?>
