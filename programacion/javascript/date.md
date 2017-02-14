https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

Date();

Mirar https://github.com/wanasit/chrono
A natural language date parser in Javascript, designed for extracting date information from any given text.



# Sumar tiempos
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);


# Unix epoch
new Date().getTime()/1000
1475861659.487

epoch to javascript date
d = new Date(1475871691.823*1000)
d.toUTCString()
t.getDay() // 0 domino, 6 sabado


function epochToHHMMSS(totalSec) {
  hours = parseInt( totalSec / 3600 ) % 24;
  minutes = parseInt( totalSec / 60 ) % 60;
  seconds = Math.round(totalSec % 60);

  return result = (hours < 10 ? "0" + hours : hours) + "h" + (minutes < 10 ? "0" + minutes : minutes) + "m" + (seconds  < 10 ? "0" + seconds : seconds) + "s";
}


HH:MM:SS a segundos
var hms = '02:04:33';   // your input string
var a = hms.split(':'); // split it at the colons
var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);



# Parse date
Date.parse("March 21, 2012");
let d = new Date(Date.parse("2016-09-28 14:00:38.000000"))

CUIDADO! Si tenemos el locale americano y parseamos una fecha tipo: "30/01/2017 13:58:22" nos dará una fecha en el futuro sin sentido. (al menos en google scripts)
En node da un error
Parece que tambien depende del navegador puede o no funcionar http://stackoverflow.com/questions/2587345/why-does-date-parse-give-incorrect-results
Mejor trocear a mano y crear el objeto Date nosotros.

var fecha = "30/01/2017 13:58:22";
var parts = fecha.split(' ');
var day_month_year = parts[0];
var hour_min_sec = parts[1];
var parts_dmy = day_month_year.split("/");
var parts_hms = hour_min_sec.split(":");

var date = new Date(parts_dmy[2], parts_dmy[1]-1, parts_dmy[0], parts_hms[0], parts_hms[1], parts_hms[2]);


# Moment y moment-timezone
http://momentjs.com/
http://momentjs.com/timezone/

npm install moment --save
npm install moment-timezone --save


moment = require("moment")
tz = require("moment-timezone")

moment.locale("es") // formato fechas en español

> moment().format("YYYY-MM-DD HH:mm:ss")
'2017-01-03 09:16:39'
> moment().tz('UTC').format("YYYY-MM-DD HH:mm:ss")
'2017-01-03 08:16:40'

Coger una fecha en un timezone determinado
moment.tz("2017-01-09 16:24:31.000000", "UTC")


> moment().add(1, 'hour').format("llll")
'Tue, Jan 3, 2017 10:18 AM'

Parsear fecha
> moment("12:05:00", "HH:mm:ss")
moment("2017-01-03T12:05:00.000")
