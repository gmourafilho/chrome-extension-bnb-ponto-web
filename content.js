chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    $(document).ready(function() {
      calcularSaida()
    });
    sendResponse();
  }
);

function calcularSaida() {
  var appendLabel = false;
  var cargaHoraria1 = "5:45";
  var cargaHoraria2 = "8:00";
  var batidas = $("#batidas").find("td");
  console.log(batidas.length)

  if (batidas.length >= 3) {
    var batida1 = batidas[0].textContent.split(" ")[1];
    var batida2 = batidas[1].textContent.split(" ")[1];
    var batida3 = batidas[2].textContent.split(" ")[1];
    var batida4_6h = convertHourToMinute(batida1) + convertHourToMinute(cargaHoraria1) + convertHourToMinute(batida3) - convertHourToMinute(batida2);
    var batida4_8h = convertHourToMinute(batida1) + convertHourToMinute(cargaHoraria2) + convertHourToMinute(batida3) - convertHourToMinute(batida2);
    appendLabel = true;
  }else if(batidas.length >= 1)
  {
    //Apenas uma batida
    var batida1 = batidas[0].textContent.split(" ")[1]
    //Previsão de 15 minutos de intervalo
    var batida4_6h = convertHourToMinute(batida1) + convertHourToMinute(cargaHoraria1) + convertHourToMinute("00:15");
    //Previsão de 30 minutos de intervalo
    var batida4_8h = convertHourToMinute(batida1) + convertHourToMinute(cargaHoraria2) + convertHourToMinute("00:30");
    appendLabel = true;
  }

  if(appendLabel)
  {
    $(".label").parent().append('<span class="label label-default">Saída estimada 6h: <strong>' + convertMinutesToHour(batida4_6h) + '<strong></span> ');
    $(".label").parent().append('<span class="label label-default">Saída estimada 8h: <strong>' + convertMinutesToHour(batida4_8h) + '<strong></span> ');
  }
}

function convertHourToMinute(time) {
  var arrTime = time.toString().split(":");
  return parseInt(arrTime[0] * 60) + parseInt(arrTime[1]);
}

function convertMinutesToHour(minutes) {
  var hour = parseInt(minutes) / 60;
  var minute = parseInt(minutes) % 60;
  if (minute < 10)
    return parseInt(hour) + ":0" + parseInt(minute);
  else
    return parseInt(hour) + ":" + parseInt(minute);
}
