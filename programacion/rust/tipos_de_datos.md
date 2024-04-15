# Números
Si queremos generar un integer de un tipo determinado: 58u8

Decimal 98_222
Hex 0xff
Octal 0 o77
Binary 0b1111_0000

# Bytes
Byte (u8 only) b'A'

# Bool
let f: bool = false

# Char
let z: char = 'ℤ'

# tuple
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;

Acceder a un elemento:
tup.0

## unit tuple
let x: () = ()

Es lo que se usa cuando no queremos devolver nada.

# Arrays
Tienen un tamaño fijo y todos los elementos deben ser del mismo tipo.
let a = [1, 2, 3, 4, 5];
let a: [i32; 5] = [1, 2, 3, 4, 5]
let a = [3; 5]; // [3, 3, 3, 3, 3]

Acceder a un elemento:
a[2]

Si queremos un "array" que pueda crecer, usar un "vector".


# Rangos
for number in (1..4) {
    println!("{}", number);
}

Si queremos invertir el rango:
(1..4).rev()


# Box
Un puntero a un dato en el heap.

let mut b: Box<i32> = Box::new(5);
let a: i32 = *b;



# Clone
Para copiar un dato en lugar de moverlo.
let s1 = String::from("hello");
let s2 = s1.clone();


# Copied
https://github.com/rust-lang/rust/pull/56534

The intent of copied is to avoid accidentally cloning iterator elements after doing a code refactoring which causes a structure to be no longer Copy. This is a relatively common pattern, as it can be seen by calling rg --pcre2 '[.]map[(][|](?:(\w+)[|] [*]\1|&(\w+)[|] \2)[)]' on Rust main repository. Additionally, many uses of cloned actually want to simply Copy, and changing something to be no longer copyable may introduce unnoticeable performance penalty.



# Collections
Tipos de contenedores que pueden almacenar un número variable de datos.
Se almacena en el "heap".

## String
mirar string.md

## Vector / Vec<T>
https://doc.rust-lang.org/stable/nomicon/vec/vec.html
https://doc.rust-lang.org/stable/std/vec/struct.Vec.html
Almacena los datos en heap.

let v: Vec<i32> = Vec::new();

let v = vec![1, 2, 3];
Aquí, como rust ya conoce los tipos de datos, no necesitamos especificarlo al crear la variable.


Añadir datos:
let mut v = Vec::new();
v.push(5);

Quitar del final:
v.pop() // Option<T>

Acceder, generará un panic si no existe ese elemento con "index out of bounds":
&v[2]
&v[2..4] // coge los elementos en la posición 2 y 3 (en notación matemática sería "[2,4)")

Si queremos acceder de forma segura usar .get:
let x = v.get(2)
Esto no devolverá un Option<&i32> en este caso. Seguramente luego usemos match o if-let para gestionar la posibilidad de que tenga o no valor.

let x = v.get(0..5)  // en este caso será un Option<&[i32]>

Si cogemos referencias inmutables del vector (un puntero para leer un determinado elemento) estaremos quitando el permiso de escritura, por lo que no podremos modificar ese vector hasta que esa referencia inmutable salga del scope.


Iterar con referencias inmutables:
```rust
let v = vec![100, 32, 57];
for i in &v {
    println!("{i}");
}
```

Iterar con referencias mutables:
```rust
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
```

No se puede modificar el vector (añadir/quitar elementos) mientras se itera. For tiene una referencia del vector que lo evita.

Podemos usar un enum con distintos variants para almacenar distintos tipos de datos en un vector.
```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}
let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

## Capacidad / longitud
Los vectores tienen una longitud (número de elementos) y una capacidad (huecos disponibles antes de tener que hacer un resize).
Si metemos más elementos de la capacidad, se creará un vector con mayor capacidad y se copiarán los elementos del antiguo al nuevo.

let v: Vec<i32> = Vec::with_capacity(10);
v.len()
v.capacity()


Concatenar, unir los elementos de dos vectores:
["hello", "world"].concat() // "helloworld"
[[1, 2], [3, 4]].concat() // [1,2,3,4]

["hello", "world"].join(" ") // "hello world"

[1,2,3].last() // 3



## HashMap
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10)

scores.get(&team_name).copied().unwrap_or(0);

Iterar:
for (key, value) in &scores {
    println!("{}: {}", key, value);
}

El owner de los datos es el HashMap, no los datos que contiene.


Insertar un valor si la key no está definida
scores.entry(String::from("Yellow")).or_insert(50);


Típico ejemplo de contar palabras en un texto:
```rust
use std::collections::HashMap;

fn main() {
    let text = "hello world wonderful world";

    let mut map = HashMap::new();

    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}", map);
}
```
