var mensagens = [];
var mensagensBrutas = [];
var arrIdxMensagens = [];
var pistas = [{localidade: "SBCT", pistaPrincipal:"15"}]; //precisa de tratapmento para pegar indice de acordo com o numero da pista
var pista = ""
var countdown = 60;


Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}

function updateCronometro() {
  countdown -= 1;
  if (countdown <= 0){
    countdown = 60
    //atualizaConsulta();
  }
  $("#cronometro").html(":" + (countdown > 9 ? countdown:"0"+countdown))
}

$(document).ready(() => {

  $('#dataini').val(getDataIni())
  $('#datafin').val(getDataFin())
  setInterval(updateCronometro,1000)
});

function getPistaPrincipal(dados) { 
  let pista = dados.temperatures[0].runway;
  if (pista.includes("/"))
      pista = pista.split("/")[0]
  pistas.forEach(pista => {
    if (pista.localidade == dados.location)
       pista = pista.pistaPrincipal;
  })
  return pista;
}

function fakeData() {
  return  [
      {
        "id": "9158008",

        "station": "82022",

        "observationDateHour": "2021-08-09T01:00",

        "location": "SBBV",

        "registerType": "H",

        "averageTwelveHoursDegreeCelsius": null,

        "visibility": { "prevailingDam": "0800", "minimumDam": null, "direction": null },

        "clouds": [{ "quantity": "3", "type": "ST", "subType": null, "heightDam": "018", "direction": "E" }, { "quantity": "4", "type": "CU", "subType": null, "heightDam": "090", "direction": "E" }, { "quantity": "1", "type": "TCU", "subType": null, "heightDam": "105", "direction": "E" }, { "quantity": "8", "type": "AC", "subType": null, "heightDam": "210", "direction": "E" }],

        "winds": [{ "runway": "26", "directionDeg": "05", "speedKt": "04", "gustKt": null, "variableWind": false, "variableWindDirection": null }, { "runway": "08", "directionDeg": "06", "speedKt": "05", "gustKt": null, "variableWind": false, "variableWindDirection": null }],

        "rvrs": [],

        "temperatures": [{ "runway": "08", "dryBulbDegreeCelsius": "245", "wetBulbDegreeCelsius": "230", "fcqbseco": 2, "fcqbumido": 2, "relativeHumidityPercent": "88", "fcqur": 2, "airDegreeCelsius": null, "fcqtemppista": null, "dewPointDegreeCelcius": "224", "fcqtempo": 2, "origem": "C" }],

        "ceilings": [],

        "weatherConditions": { "presentRecentCondition": [{ "weatherConditionPresentRecentCode": "29", "metarCode": "RETSRA", "indice": 0 }, { "weatherConditionPresentRecentCode": "15", "metarCode": "VCSH", "indice": 1 }], "pastCondition": [] },

        "atmosphericPressure": { "qfeValueHpa": "10059", "qnhValueHpa": "10160", "qffValueHpa": null, "tendency": null, "altitudeOfEightHundredFiftyHpa": null, "diferenceOfLastThreeOrTwentyFourHoursValueHpa": null, "fcqalt850hpa": null, "indicador": "I" },

        "precipitation": {
          "quantityMilimeters": "0000", "durationTime": "0000", "periodo": 1, "currentDay": { "startTime": null, "endTime": null, "durationTime": null, "quantityMilimeters": null },

          "previousDay": { "startTime": null, "endTime": null, "durationTime": null, "quantityMilimeters": null }
        },

        "cloudAmount": { "totalCloud": 8, "mediumTotalCloud": null, "lowTotalCloud": null },

        "messageMetarSpeci": "METAR SBBV 091600Z 06005KT 8000 VCSH SCT006 SCT030 FEW035TCU OVC070 25/22 Q1016 RETSRA=", "insertDate": "2021-08-09T15:48"
      }]
  
}

function addAspas(s) {
  return s
  return '"' + s + '"'
}

function loginOPMET() {
  let login = $("#login").val();
  let senha = $("#senha").val();

  getAPIKEY(addAspas(login), addAspas(senha));
}

function getAPIKEY(login, senha) {
  const options = {
    //origin: "www.redemet.aer.mil.br",
    headers: {
      "accept": "*/*"
    },
    data: {
      username: login,
      password: senha

    },
    method: "POST"
  };
  let url = "https://opmet.decea.mil.br/adm/login"

  fetch(url, options)
    .then(res => {
      console.log(res);
      res.json();
    })
    .then(data => $('#edtAPIKEY').val(data));
}

function addZeros(n) {
  return n < 10 ? "0" + n : n;
}

function getFormatedDate(data, zeraMinutos = true) {
  let ano = data.getUTCFullYear();
  let mes = addZeros(parseInt(data.getUTCMonth()) + 1);
  let dia = addZeros(data.getUTCDate());
  let hora = addZeros(data.getUTCHours());
  let minutos = addZeros(data.getUTCMinutes());
  if (zeraMinutos)
    minutos = '00';
  return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
}

function getDataIni() {
  return getFormatedDate(new Date());
}

function getDataFin() {
  return getDataIni();
}

function atualizaDados(){
  arrIdxMensagens.forEach(idx => {
    mensagens[idx] = parseData(mensagensBrutas[idx])
  });
}

function consultaOPMET(fake = false) {
  
  if (fake){
    trataDados(fakeData());
    return
  }
  const begindate = $('#dataini').val()
  const enddate = $('#datafin').val()
  const localidade = $('#localidade').val()
  const url = `https://opmet.decea.mil.br/bdc/searchiepv?icaocodes=${localidade}&begindate=${begindate}&enddate=${enddate}`;
  const options = {
    //origin: "www.redemet.aer.mil.br",
    headers: {
      "accept": "*/*",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjMwODQwNjk2LCJleHAiOjE2MzE3MDQ2OTZ9.ZVDbMbThGwCj2Bp5Ugec9O1jGX43kPq16AAeLLEw4ck"
    },
    method: "GET"
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
        trataDados(data.bdc);
        atualizaDados();
        updateTable();

    });


}

function getMes(dataHoraObs) {
  return parseInt((new Date(dataHoraObs)).getMonth()) + 1;
}
function getHora(dataHoraObs) {
  return parseInt((new Date(dataHoraObs)).getHours())
}

/*function getSKC(clouds) {
  return
}*/

function getNVU_N(clouds, alt) {
  nvu = false
  clouds.forEach(c => {
    if (damToFt(c.heightDam) <= alt)
      nvu = true
  })
  return nvu
}

function getNVU_1000(clouds) {
  if (getNVU_600(clouds)  == "y" || getNVU_800(clouds)  == "y")
    return "n"
  return getNVU_N(clouds, 1000) ? "y" : "n";
}

function getNVU_800(clouds) {
  if (getNVU_600(clouds) == "y")
    return "n"
  return getNVU_N(clouds, 800) ? "y" : "n";
}

function getNVU_600(clouds) {
  return getNVU_N(clouds, 600) ? "y" : "n";
}

function getNVU_SEM_TETO(clouds, t) {
  r = "n"
  if (t.t600 == "n" && t.t800 == "n" && t.t1000 == "n" && t.t1500 == "n")
    if ((clouds.length > 0) && (clouds[0].quantity > 0) && (clouds[0].quantity < 9))
      r = "y"
  return r
}

function getALT_NVU(clouds) {
  maisBaixa = 1500
  clouds.forEach(c => {
    if (damToFt(c.heightDam) <= maisBaixa)
      maisBaixa = damToFt(c.heightDam)
  })

  return maisBaixa
}

function getNVO_OCORRENDO(tempoPresente) {
  nvo = "n";
  tempoPresente.presentRecentCondition.forEach(e => {
    if (e.weatherConditionPresentRecentCode >= 42 && e.weatherConditionPresentRecentCode <= 49)
      nvo = "y"

  });
  return nvo;
}

function roundF(n) {
  return Math.round((n + Number.EPSILON) * 10) / 10;
}

function parseDecimal(n) {
  if (!n)
    n = 0;
  try {
    n = parseFloat(n)
  } catch {
    n = "N invalido"
  }
  n = n/10
  return roundF(n);
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

function damToFt(alt) {
  return Math.round ((alt*100)/3)
}
function getTETO_N(clouds, alt) {
  teto = false
  clouds.forEach(c => {
    if (c.quantity > 4 && c.quantity < 9)
      if (damToFt(c.heightDam) <= alt)
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

function decHour(dh, n) {
  let d = new Date(dh);
  return d.addHours(-n);
}

function getVarNH(dados, h) {
  let pista = getIdxPistaTemp(dados);
  let dataHoraObs = dados.observationDateHour;
  let datanH = decHour(dataHoraObs, h);
  
  datanH = getFormatedDate(datanH, false);
  if (mensagens && mensagens[datanH]) {
    console.log(mensagens[datanH]);
    let dadosnH = mensagens[datanH];
    return roundF(parseDecimal(dados.temperatures[pista].dryBulbDegreeCelsius) - dadosnH.bseco);
  }
  return "erro"
}

function getVar1H(dados) {
  return getVarNH(dados, 1);
}

function getVar3H(dados) {
  return getVarNH(dados, 3);
}

function getPista(dt) {
  let cont = 0;
  let idx = -1;
  dt.forEach(w => {
    if (w.runway == pista)                          
      idx = cont
    cont += 1;
  })
  return idx
}

function getIdxPistaWind(dados) {
  return getPista(dados.winds);
}

function getIdxPistaTemp(dados) {
  return getPista(dados.temperatures);
}

function addLineTable(idTable, line) {
  function limpaDados(d){
   d = d.includes('"')?d.split('"')[1]:d
   d = d.includes('}')?d.split('}')[0]:d
    return d
  }
  line = JSON.stringify(line);
  line = line.split(',');
  lineS = ""
  line.forEach(l => {
     c = limpaDados(l.split(":")[1]);
     
     lineS += `<td>${c}</td>`;
  })
          
  $(idTable).append(`<tr>${lineS}</tr>`);
}

function updateTable() {
  arrIdxMensagens.sort()
  $('#tableData tbody').html('');
  arrIdxMensagens.forEach(idx => {
    addLineTable("#tableData tbody",mensagens[idx]);
  });
}

function parseData(dados) {
    pista = getPistaPrincipal(dados);
    let tetos = getTETOS(dados.clouds);
    let idxPistaWind = getIdxPistaWind(dados);
    let idxPistaTemp = getIdxPistaTemp(dados);
    return {
      mes: getMes(dados.observationDateHour),
      hora: getHora(dados.observationDateHour),
      bseco: parseDecimal(dados.temperatures[idxPistaTemp].dryBulbDegreeCelsius),
      bseco_VAR_1H: getVar1H(dados),
      bseco_VAR_3H: getVar3H(dados),
      bumido: parseDecimal(dados.temperatures[idxPistaTemp].wetBulbDegreeCelsius),
      po: parseDecimal(dados.temperatures[idxPistaTemp].dewPointDegreeCelcius),
      ur: parseDecimal(dados.temperatures[idxPistaTemp].relativeHumidityPercent * 10),
      velvento: parseFloat(dados.winds[idxPistaWind].speedKt),
      dirvento: parseFloat(dados.winds[idxPistaWind].directionDeg),
      rajada: parseRajada(dados.winds[idxPistaWind].gustKt),
      qnh: parseDecimal(dados.atmosphericPressure.qnhValueHpa),
      qfe: parseDecimal(dados.atmosphericPressure.qfeValueHpa),
      qff: parseDecimal(dados.atmosphericPressure.qffValueHpa),
      precip: parseDecimal(dados.precipitation.quantityMilimeters),
      TETO_1500: tetos.t1500,
      TETO_1000: tetos.t1000,
      TETO_800: tetos.t800,
      TETO_600: tetos.t600,
      SKC: (dados.clouds.length == 0) ? "y" : "n",
      NVU_SEM_TETO: getNVU_SEM_TETO(dados.clouds, tetos), //errado
      NVU_1000: getNVU_1000(dados.clouds),
      NVU_800: getNVU_800(dados.clouds),
      NVU_600: getNVU_600(dados.clouds),
      ALT_NVU: getALT_NVU(dados.clouds),
      NVO_OCORRENDO: getNVO_OCORRENDO(dados.weatherConditions),
      METAR: dados.messageMetarSpeci
    }
}

function trataDados(dt) {
  $('#edtAPIKEY').val(JSON.stringify(dt));

  dt.forEach((dados) => {
     line = parseData(dados);
     mensagens[dados.observationDateHour] = line;
     mensagensBrutas[dados.observationDateHour] = dados;
    
     if (arrIdxMensagens.indexOf(dados.observationDateHour) <0) {
       arrIdxMensagens.push(dados.observationDateHour);
     }
  });
  
}
  /*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/
