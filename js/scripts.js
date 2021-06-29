  function loginOPMET() {
    let login = $("#login").val();
    let senha = $("#senha").val();
    
    
  }

function getAPIKEY(login, senha) {
  
  $.post("https://opmet.decea.mil.br/adm/login", { 'username': login, 'password': senha }, function( data ) {
    $( ".edtAPIKEY" ).html( data );
  });  
}

function automatico () {
  //setTimeout(formataTAF, 1000);
}
