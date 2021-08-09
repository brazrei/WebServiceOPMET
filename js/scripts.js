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
   const url = "https://opmet.decea.mil.br/bdc/searchiepv?icaocodes=SBCF&begindate=2021-08-01T00:00&enddate=2021-08-01T01:00";
   dados = {}

  const options = {
    //origin: "www.redemet.aer.mil.br",
       headers: {
                 "accept": "*/*" ,
                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI4NTEzMzA3LCJleHAiOjE2MjkzNzczMDd9.5RoQImf4bt7AEQydz-Fov29bnKFicLso_iyMhbPiIJg"
              },
              method: "GET"
  };

  fetch(url, options)
    .then( res => res.json())
    .then( data => $('#edtAPIKEY').val(JSON.stringify(data) ) );
  
  
}

/*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/

