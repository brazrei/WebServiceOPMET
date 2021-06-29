function addAspas(s) {
  return '"' + s + '"'
}

function loginOPMET() {
    let login = $("#login").val();
    let senha = $("#senha").val();
    
    getAPIKEY(addAspas (login), addAspas(senha)) ;
  }

function getAPIKEY(login, senha) {
  
 /* $.post("https://opmet.decea.mil.br/adm/login", { "username": login, "password": senha }, function( data ) {
    $( ".edtAPIKEY" ).html( data );
  });  
  
  $.ajax({
  url: "https://opmet.decea.mil.br/adm/login",
  type: "post",
  data: { "username": login, "password": senha },

  success: function(data){ // trigger when request was successfull
    $( ".edtAPIKEY" ).html( data );
  },
  error: (function (erro) {
    console.log(erro)
  }) 
})
  $.ajax({
        url: 'https://opmet.decea.mil.br/adm/login',
        data: {"username":"priscila_bdc","password":"789Cimaer@"},
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Content-Type", "application/json")
        }, success: function(data){
            alert(data);
          console.log(data)
            //process the JSON data etc
        }*/
  
  const url = "https://opmet.decea.mil.br/bdc/searchiepv?icaocodes=sbsp&begindate=2017102906&enddate=2017102907&format=JSON";

  const options = {
       headers: {
                 Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"
              }
    
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

