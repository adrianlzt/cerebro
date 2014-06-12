http://api.jquery.com/delay/
.delay  Description: Set a timer to delay execution of subsequent items in the queue.


https://developer.mozilla.org/en-US/docs/Web/API/window.setTimeout
var timeoutID = window.setTimeout(code, delay);


Ejecutar funcion cada 5 segundos
window.setInterval(function(){
  funcion();
}, 5000);

Parar el setinterval
var refreshIntervalId = setInterval(fname, 10000);
/* later */
clearInterval(refreshIntervalId);
