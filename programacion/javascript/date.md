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
new Date(1475871691.823*1000)


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
