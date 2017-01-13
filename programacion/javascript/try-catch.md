http://www.w3schools.com/js/js_errors.asp
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/try...catch


try {
    x = y + 1;   // y cannot be referenced (used)
}
catch(err) {
    document.getElementById("demo").innerHTML = err.name;
}



Capturar tipos de error determinados:
} catch (e if e instanceof TypeError) {


Lanzar una excepcion:
throw "myException"
