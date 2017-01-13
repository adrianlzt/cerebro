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
