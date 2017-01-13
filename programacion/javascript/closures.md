https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created.

var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() { return scope; }
  return f(); // retornamos el valor de la ejecuccion
}
checkscope(); // devuelve "local scope"


var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() { return scope; }
  return f; // devuelve la funcion, no el resultado de su ejecuccion
}
console.log(checkscope()()); // devuelve "local scope"



function checkscope(nombre) {
  function f(apellido) { return nombre+" "+apellido; }
  return f;
}
console.log(checkscope("adri")("lopez"));




// Llamar a funciones con valores predefinidos:
function partialLeft(f /*, ...*/) {
  var args = arguments; // Save the outer arguments array
  return function() { // And return this function
    var a = array(args, 1); // Start with the outer args from 1 on.
    a = a.concat(array(arguments)); // Then add all the inner arguments.
    return f.apply(this, a); // Then invoke f on that argument list.
  };
}

function array(a, n) { return Array.prototype.slice.call(a, n || 0); }

function suma(a,b,c){ return a+b+c; }

var suma3 = partialLeft(suma, 3);

console.log(suma3(5,4));
