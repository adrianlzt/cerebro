var hello = "foo";
var my_string = "I pity the " + hello;

var coso = `valor de x=${x} y fin`

# Multiline
"foo \
bar"

var html = `
  <div>
    <span>Some ${var} here</span>
  </div>
`;

# Replace
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/replace
http://www.w3schools.com/jsref/jsref_replace.asp

var str = "Visit Microsoft!";
var res = str.replace("Microsoft", "W3Schools");
Visit W3Schools!

Cambiar todas las apariciones
txt.replace(/xx/g, "aa")

"hola pepe adios".replace(/hola ([a-z]*) adios/gi, "-$1-");
-pepe-

# Contains
var cadena = "hht://idealista.com/asd"
cadena.includes("idealista")
=> true

# Split
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/split
cadena.split([separador][,limite])

# Join
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join();
Banana,Orange,Apple,Mango


# Uppercase
"cosa".toUpperCase()
