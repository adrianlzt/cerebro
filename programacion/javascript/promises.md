http://andyshora.com/promises-angularjs-explained-as-cartoon.html

Nos pasan un objeto que tiene la función ".then()".
Cuando el objeto ejecute lo que tenga que hacer ejecutará la función que hayamos puesto en then.
En el caso de error ejecutará la segunda función puesta en then.

// Ejemplo tonto:
promesa.then(
  function (result) {
    console.log("result:"+result);
  },
  function(error) {
    // , could log the error with: console.log('error', error);
    console.log("promise rejected: " + error);
  }
);


Si hacemos:
return promesa.then(...);
estaremos devolviendo otra promesa.



// function somewhere in father-controller.js
var makePromiseWithSon = function() {
    // This service's function returns a promise, but we'll deal with that shortly
    SonService.getWeather()
        // then() called when son gets back
        .then(function(data) {
            // promise fulfilled
            if (data.forecast==='good') {
                prepareFishingTrip();
            } else {
                prepareSundayRoastDinner();
            }
        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            prepareSundayRoastDinner();
        });
};
