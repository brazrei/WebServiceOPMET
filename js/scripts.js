mensagens = [];
function addAspas(s) {
  return '"' + s + '"'
}

function loginOPMET() {
  let login = $("#login").val();
  let senha = $("#senha").val();

  getAPIKEY(addAspas(login), addAspas(senha));
}

function getAPIKEY() {

}

function consultaOPMET(login, senha) {

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
  const begindate = $('#dataini').val()
  const enddate = $('#datafin').val()
  const localidade = $('#localidade').val()
  const url = `https://opmet.decea.mil.br/bdc/searchiepv?icaocodes=${localidade}&begindate=${begindate}&enddate=${begindate}`;
  const options = {
    //origin: "www.redemet.aer.mil.br",
    headers: {
      "accept": "*/*",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI4NTEzMzA3LCJleHAiOjE2MjkzNzczMDd9.5RoQImf4bt7AEQydz-Fov29bnKFicLso_iyMhbPiIJg"
    },
    method: "GET"
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => trataDados(data));


}

function getMes(dataHoraObs) {
  return
}
function getHora(dataHoraObs) {
  return
}

function getSKC(clouds) {
  return
}

function getNVU_1000(clouds) {
  return
}

function getNVU_800(clouds) {
  return
}

function getNVU_600(clouds) {
  return
}

function getNVU_SEM_TETO(clouds) {
  return
}

function getALT_NVU(clouds) {
  return
}

function getNVO_OCORRENDO(tempoPresente) {
  nvo = false;
  tempoPresente.presentRecentCondition.forEach(e => {
    if (e.weatherConditionPresentRecentCode>=42 && e.weatherConditionPresentRecentCode<=49)
      nvo = true
    
  });
  return nvo;
}

function parseDecimal(n) {
  if (!n)
    n = 0;
  try  {
    n = parseFloat(n)
  } catch {
    n="N invalido"
  }
  return n/10;
}

function parseRajada(n) {
  if (!n)
    n = 0;
  try {
    parseFloat(n/1) // se for null retorna 0
  } catch {
    n = 0.0
  }
  return n
}

function trataDados(dados) {
  $('#edtAPIKEY').val(JSON.stringify(dados));
  dados = dados.bdc[0];
  pista = 0; //precisa de tratapmento para pegar indice de acordo com o numero da pista

  let line = {
    mes: getMes(dados.observationDateHour),
    hora: getHora(dados.observationDateHour),
    bseco: parseDecimal(dados.temperatures[pista].dryBulbDegreeCelsius),
    bseco_VAR_1H: 0,
    bseco_VAR_3H: 0,
    bumido: parseDecimal(dados.temperatures[pista].wetBulbDegreeCelsius),
    po: parseDecimal(dados.temperatures[pista].dewPointDegreeCelcius),
    ur: parseDecimal(dados.temperatures[pista].relativeHumidityPercent),
    velvento: parseFloat(dados.winds[pista].speedKt),
    dirvento: parseFloat(dados.winds[pista].directionDeg),
    rajada: parseRajada(dados.winds[pista].gustKt),
    qnh: parseDecimal(dados.atmosphericPressure.qnhValueHpa),
    qfe: parseDecimal(dados.atmosphericPressure.qfeValueHpa),
    qff: parseDecimal(dados.atmosphericPressure.qffValueHpa),
    precip: parseDecimal(dados.precipitation.quantityMilimeters),
    TETO_1500: "",
    TETO_1000: "",
    TETO_800: "",
    TETO_600: "",
    SKC: getSKC(dados.clouds),
    NVU_SEM_TETO: getNVU_SEM_TETO(dados.clouds),
    NVU_1000: getNVU_1000(dados.clouds),
    NVU_800: getNVU_800(dados.clouds),
    NVU_600: getNVU_600(dados.clouds),
    ALT_NVU: getALT_NVU(dados.clouds),
    NVO_OCORRENDO: getNVO_OCORRENDO(dados.weatherConditions)
  };

  if (mensagens.indexOf(dados.id) < 0)
    mensagens.push(line);
  else
    mensagens[dados.id] = line;

}
  /*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/
