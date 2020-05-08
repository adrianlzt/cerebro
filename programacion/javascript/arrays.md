http://www.w3schools.com/js/js_arrays.asp

var cars = ["Saab", "Volvo", "BMW"];
var name = cars[0];
var x = cars.length; 
var y = cars.sort(); 

Añadir elemento:
arr.push("Hola");

a = [1,2,3]
[...a, 4] -> [1,2,3,4]

O varios elementos:
arr.push("Hola","Adios");

# Join, strings
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join();
Banana,Orange,Apple,Mango


# Every
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

Comprueba que todos los elementos de un array cumplan una funcion


# Map
Transformar cada uno de los elementos de un array


# Mostrar contenido
array.toString()

# Eliminar elemento
http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript

slice -> no modifica el array original (start,end), el elemento que hay en end no lo coge. slice(1,1) => []
splice -> modifica el array original. Coge a partir de una posición, un número de elementos

var array = [2, 5, 9];
var index = array.indexOf(5);
if (index > -1) {
    array.splice(index, 1); //aqui devolvera el elemento eliminado
}
// la variable array aqui ya no tendra el '5'

splice(posicion_inicio, num_elementos)

Trocear un array en x arrays de N elementos:
let dest = []
while(array.length) {
  dest.push(array.splice(0,5))
}



# indexOf / Contiene
pepe = ["hola","adios"]
pepe.indexOf("hola")

Devuelve un int con el número de posisión.
-1 si no lo encuentra


# Sort
http://www.w3schools.com/jsref/jsref_sort.asp

Se pueden pasar funciones custom para hacer el sort:
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a-b});



# Copiar
nuevo = viejo.slice()


# Condicionales
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
