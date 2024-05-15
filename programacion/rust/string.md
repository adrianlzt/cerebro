https://doc.rust-lang.org/std/string/struct.String.html

En rust tenemos dos tipos de strings:
- String: un tipo de dato que se puede modificar. UTF-8, almacenado en el heap.
- &str: un slice de un string. UTF-8, almacenado en el stack.


String no mutable:
let hello = std::string::String::from("Hello, world!");

String mutable vacía:
use std::string::String;
let mut guess = String::new();


Append:
some_string.push_str("foo");

Splitear por espacio en blanco:
let s = "foo bar".split_whitespace();


No se puede acceder con un índice a una string. El número de bytes varía.
Mejor usar "Зд".chars()
Devuelve un struct Char que implementa el trait Iterator.
https://doc.rust-lang.org/std/str/struct.Chars.html


# multilínea
```rust
let s = "\
foo bar
baz";
```


# parse
Parse mirará el tipo de dato que se espera y lo convertirá.
let parse: i32 = String::from("5").trim().parse().expect("Please type a number!");
let parse: u32 = "5".trim().parse().expect("Please type a number!");

Otra forma usando la sintaxis turbofish:
let four = "4".parse::<u32>().expect("Please type a number!");


# Generar string usando interpolación, format!
let s = format!("foo {}", bar);


# lines
Crea un iterador de las líneas de un string.

```rust
let s = "foo\nbar\nbaz";
let lines = s.lines();
```


# contains
Devuelve true si el string contiene el substring.
```rust
let s = "foo bar baz";
let contains = s.contains("bar");
```
