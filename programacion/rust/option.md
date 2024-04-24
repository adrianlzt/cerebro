Para codificar cosas que pueden ser algo o nada.

```rust
let some_number = Some(5); // el tipo de dato será Option<i32>
let some_char = Some('e'); // el tipo de dato será Option<char>
let absent_number: Option<i32> = None;
```

Es el "equivalente" a null/none de otros lenguajes.
Aquí debemos ser explícitos de que queremos hacer al obtener el Option.

Hay muchos métodos para trabajar con Option.

El más básico sería "unwrap()", que intenta obtener el valor y si no genera un panic.
Algo un poco mejor sería "expect(&str)", que intenta obtener el valor y si no genera un panic con el string que le hemos pasado.

Típicamente usaremos match para tener dos ramas, una si tiene valor y otra si no.


Si queremos devolver algo de un tipo o nada, usamos un generic:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
