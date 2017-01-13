http://underscorejs.org/

Libreria con funciones de ayuda para trabajar con arrays, collections, etc

npm install --save underscore

import _ from "underscore"
_.difference([1,2,3,4], [3,4]


Buscar la key por el elemento:
icons = {cosa: "http://members.gssl.com/images/26-Cloudy-32.png", otro: "asdas"}
_.findKey(icons, ((i) => i=="http://members.gssl.com/images/26-Cloudy-32.png"))
nos devuelve cosa


Obtener el valor de un campo de unos objetos:
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]
