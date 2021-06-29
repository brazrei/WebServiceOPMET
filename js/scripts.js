function addAspas(s) {
  return '"' + s + '"'
}

function loginOPMET() {
    let login = $("#login").val();
    let senha = $("#senha").val();
    
    getAPIKEY(addAspas (login), addAspas(senha)) ;
}
//"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI1MDAwNjQyLCJleHAiOjE2MjU4NjQ2NDJ9.ZX421yQTBhFcZR1MK0CiSublkEN5MQstPzeddhGkMrU"

function getAPIKEY(login, senha) {
  const url = "https://opmet.decea.mil.br/adm/login";

  const data = {"username":"priscila_bdc","password":"789Cimaer@"}
  const options = {
       method: 'POST',
       headers: {
                 "Content-Type": "application/json"
              },
       body: JSON.stringify(data)
  };
  fetch(url, options)
    .then( res => res.json() )
    .then( data => console.log(data) );
}

function automatico () {
  //setTimeout(formataTAF, 1000);
}
/*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/

