https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals

Meter variables en una cadena de texto.
Multilinea


`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tag `string text ${expression} string text`


console.log(`string text line 1
string text line 2`);


var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);


Con operador ternario:
console.log(`numero${num > 1 ? 's' : ''}`) # Ejemplo para decidir si poner o no una s al final


// Tagged template literals

var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(strings[2]); // ""
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

tag`Hello ${ a + b } world ${ a * b }`;
// "Bazinga!"
