var mensagens = [];
var pista = "15"; //precisa de tratapmento para pegar indice de acordo com o numero da pista


Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}

$(document).ready(() => {

  $('#dataini').val(getDataIni())
  $('#datafin').val(getDataFin())
});

function fakeData() {
  return {
    "bdc": [

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
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI5NDAzNzY4LCJleHAiOjE2MzAyNjc3Njh9.OwRUQPn-yQG6KA6MeQFW7qPpk5K-mp-lbPuAg-dEi1E"
    },
    method: "GET"
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => trataDados(data));


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
    if (c.heightDam * 10 <= alt)
      nvu = true
  })
  return nvu
}

function getNVU_1000(clouds) {
  if (getNVU_600(clouds) || getNVU_800(clouds))
    return "n"
  return getNVU_N(clouds, 1000) ? "y" : "n";
}

function getNVU_800(clouds) {
  if (getNVU_600(clouds))
    return "n"
  return getNVU_N(clouds, 800) ? "y" : "n";
}

function getNVU_600(clouds) {
  return getNVU_N(clouds, 600) ? "y" : "n";
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
  n = n/10
  return Math.round((n + Number.EPSILON) * 10) / 10;
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
    return parseDecimal(dados.temperatures[pista].dryBulbDegreeCelsius) - dadosnH.bseco;
  }
  return "erro"
}

function getVar1H(dados) {
  return getVarNH(dados, 1);
}

function getVar3H(dados) {
  return getVarNH(dados, 3);
}

function getIdxPistaWind(dados) {
  let idx = 0
  dados.winds.forEach(w => {
    if (w.runway == pista)                          
      return idx
    idx += 1;
  })
  return "erro"
}

function getIdxPistaTemp(dados) {
  let idx = 0
  dados.temperatures.forEach(w => {
    if (w.runway == pista)                          
      return idx
    idx += 1;
  })
  return "erro"
}

function trataDados(dt) {
  $('#edtAPIKEY').val(JSON.stringify(dt));

  /*try {
    dados = dados.bdc[0];
  } catch {
    dados = fakeData().bdc[0];
  }*/
  dt.bdc.forEach((dados) => {
    let tetos = getTETOS(dados.clouds);
    let idxPistaWind = getIdxPistaWind(dados);
    let idxPistaTemp = getIdxPistaTemp(dados);
    let line = {
      mes: getMes(dados.observationDateHour),
      hora: getHora(dados.observationDateHour),
      bseco: parseDecimal(dados.temperatures[getIdxPistaTemp].dryBulbDegreeCelsius),
      bseco_VAR_1H: getVar1H(dados),
      bseco_VAR_3H: getVar3H(dados),
      bumido: parseDecimal(dados.temperatures[getIdxPistaTemp].wetBulbDegreeCelsius),
      po: parseDecimal(dados.temperatures[getIdxPistaTemp].dewPointDegreeCelcius),
      ur: parseDecimal(dados.temperatures[getIdxPistaTemp].relativeHumidityPercent * 10),
      velvento: parseFloat(dados.winds[getIdxPistaWind].speedKt),
      dirvento: parseFloat(dados.winds[getIdxPistaWind].directionDeg),
      rajada: parseRajada(dados.winds[getIdxPistaWind].gustKt),
      qnh: parseDecimal(dados.atmosphericPressure.qnhValueHpa),
      qfe: parseDecimal(dados.atmosphericPressure.qfeValueHpa),
      qff: parseDecimal(dados.atmosphericPressure.qffValueHpa),
      precip: parseDecimal(dados.precipitation.quantityMilimeters),
      TETO_600: tetos.t600,//tem que ser nesta ordem
      TETO_800: tetos.t800,
      TETO_1000: tetos.t1000,
      TETO_1500: tetos.t1500,
      SKC: (dados.clouds.length == 0) ? "y" : "n",
      NVU_SEM_TETO: getNVU_SEM_TETO(dados.clouds, tetos), //errado
      NVU_1000: getNVU_1000(dados.clouds),
      NVU_800: getNVU_800(dados.clouds),
      NVU_600: getNVU_600(dados.clouds),
      ALT_NVU: getALT_NVU(dados.clouds),
      NVO_OCORRENDO: getNVO_OCORRENDO(dados.weatherConditions),
      METAR: dados.messageMetarSpeci
    };
    

    /*if (mensagens.indexOf(dados.id) < 0)
      mensagens.push(line);
    else*/
    mensagens[dados.observationDateHour] = line;
  });

}
  /*
curl -H 'Content-Type: application/json' -d '{"username":"priscila_bdc","password":"789Cimaer@"}' https://opmet.decea.mil.br/adm/login
{"authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmlzY2lsYV9iZGMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJhdWRpdC5jIn0seyJhdXRob3JpdHkiOiJhdWRpdC5kIn0seyJhdXRob3JpdHkiOiJhdWRpdC5yIn0seyJhdXRob3JpdHkiOiJhdWRpdC51In0seyJhdXRob3JpdHkiOiJiZGMtc2VydmljZS5yZWFkIn0seyJhdXRob3JpdHkiOiJjaGFuZ2UucGFzc3dvcmQifV0sInByb2ZpbGVSb2xlIjoiU1lTVEVNIiwiaWF0IjoxNjI0OTkyMTQ4LCJleHAiOjE2MjU4NTYxNDh9.H6ZHyd-aF0d0DAG5RoddaUt8q8L2NZe3PxtTpApNZro"}
*/
