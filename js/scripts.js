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
  });  */
  
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
  
}

function automatico () {
  //setTimeout(formataTAF, 1000);
}
