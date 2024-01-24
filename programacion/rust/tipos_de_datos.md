# Collections
Tipos de contenedores que pueden almacenar un número variable de datos.
Se almacena en el "heap".

## String
mirar string.md

## Vector / Vec<T>
let v: Vec<i32> = Vec::new();

let v = vec![1, 2, 3];
Aquí, como rust ya conoce los tipos de datos, no necesitamos especificarlo al crear la variable.


Añadir datos:
let mut v = Vec::new();
v.push(5);

Acceder, generará un panic si no existe ese elemento con "index out of bounds":
&v[2]
&v[2..4] // coge los elementos en la posición 2 y 3 (en notación matemática sería "[2,4)")

Si queremos acceder de forma segura usar .get:
let x = v.get(2)
Esto no devolverá un Option<i32> en este caso. Seguramente luego usemos match o if-let para gestionar la posibilidad de que tenga o no valor.

let x = v.get(0..5)  // en este caso será un Option<&[i32]>

v.len()
v.capacity()


## HashMap
use std::collections::HashMap;
