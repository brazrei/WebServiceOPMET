mensagens = [];
$(document).ready(() => {
  $('#dataini').val(getDataIni())
  $('#datafin').val(getDataFin())
});

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

function addZeros(n){
  return n<10?"0"+n:n;
}

function getDataIni() {
  let data = new Date()
  let ano = data.getUTCFullYear();
  let mes = addZeros(parseInt(data.getUTCMonth()) + 1);
  let dia = addZeros(data.getUTCDate());
  let hora = addZeros(data.getUTCHours());
  let minutos = addZeros(data.getUTCMinutes());
  return `${ano}-${mes}-${dia}T${hora}:00`;
}

function getDataFin() {
  return getDataIni();  
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

/*function getSKC(clouds) {
  return
}*/

function getNVU_N(clouds, alt) {
  nvu = false
  clouds.forEach(c => {
    if (c.heightDam * 10 <= alt)
      nvu = true
  })
  return nvu
}

function getNVU_1000(clouds) {
  return getNVU_N(clouds,1000)?"y":"n";
}

function getNVU_800(clouds) {
  return getNVU_N(clouds,800)?"y":"n";
}

function getNVU_600(clouds) {
  return getNVU_N(clouds,600)?"y":"n";
}

function getNVU_SEM_TETO(clouds, t) {
  r = "n"
  if (t.t600 == "n" && t.t800 == "n" && t.t1000 == "n" && t.t1500 == "n")
    if (clouds.length == 0)
      r = "y"
  return r
}

function getALT_NVU(clouds) {
  maisBaixa = 1500
  clouds.forEach(c => {
      if (c.heightDam * 10 <= maisBaixa)
        maisBaixa = c.heightDam * 10
  })

  return maisBaixa
}

function getNVO_OCORRENDO(tempoPresente) {
  nvo = false;
  tempoPresente.presentRecentCondition.forEach(e => {
    if (e.weatherConditionPresentRecentCode >= 42 && e.weatherConditionPresentRecentCode <= 49)
      nvo = true

  });
  return nvo;
}

function parseDecimal(n) {
  if (!n)
    n = 0;
  try {
    n = parseFloat(n)
  } catch {
    n = "N invalido"
  }
  return n / 10;
}

function parseRajada(n) {
  if (!n)
    n = 0;
  try {
    parseFloat(n / 1) // se for null retorna 0
  } catch {
    n = 0.0
  }
  return n
}

function getTETO_N(clouds, teto) {
  teto = false
  clouds.forEach(c => {
    if (c.quantity > 4 && c.quantity < 9)
      if (c.heightDam * 10 <= 600)
        teto = true
  })
  return teto
}

function getTETO_600(clouds) {
  teto600 = false
  if (getTETO_N(clouds, 600))
    teto600 = true;
  return teto600;
}

function getTETO_800(clouds) {
  teto800 = false
  if (getTETO_N(clouds, 800))
    teto800 = true;
  return teto800;
}

function getTETO_1000(clouds) {
  teto1000 = false
  if (getTETO_N(clouds, 1000))
    teto1000 = true;
  return teto1000;
}

function getTETO_1500(clouds) {
  teto1500 = false
  if (getTETO_N(clouds, 1500))
    teto1500 = true;
  return teto1500;
}

function getTETOS(clouds) {
  let tetos = { t600: "n", t800: "n", t1000: "n", t1500: "n" }
  if (getTETO_600(clouds))
    tetos.t600 = "y"
  else if (getTETO_800(clouds))
    tetos.t800 = "y"
  else if (getTETO_1000(clouds))
    tetos.t1000 = "y"
  else if (getTETO_1500(clouds))
    tetos.t1500 = "y"

  return tetos
}

function trataDados(dados) {
  $('#edtAPIKEY').val(JSON.stringify(dados));
  dados = dados.bdc[0];
  pista = 0; //precisa de tratapmento para pegar indice de acordo com o numero da pista
  let tetos = getTETOS(dados.clouds);
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
    TETO_600: tetos.t600,//tem que ser nesta ordem
    TETO_800: tetos.t800,
    TETO_1000: tetos.t1000,
    TETO_1500: tetos.t1500,
    SKC: (dados.clouds.length == 0) ? "y" : "n",
    NVU_SEM_TETO: getNVU_SEM_TETO(dados.clouds, tetos),
    NVU_1000: getNVU_1000(dados.clouds),
    NVU_800: getNVU_800(dados.clouds),
    NVU_600: getNVU_600(dados.clouds),
    ALT_NVU: getALT_NVU(dados.clouds),
    NVO_OCORRENDO: getNVO_OCORRENDO(dados.weatherConditions)
  };

  /*if (mensagens.indexOf(dados.id) < 0)
    mensagens.push(line);
  else*/
    mensagens[dados.observationDateHour] = line;

}
  /*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/
