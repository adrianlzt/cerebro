Statements are instructions that perform some action and do not return a value.
Expressions evaluate to a resultant value.

Típicamente usamos las expresiones para asignar valores a variables, o para pasar valores a funciones.
```rust
let x = 5;
let y = {
    let x = 3;
    x + 1
}; // los corchetes son la expresión y la línea completa sería el statement
```

También como valor retornado por una función.
```rust
fn five() -> i32 {
    5
}
```

Si añadimos ";" al final de una expresión, se convierte en una declaración.
```rust
let x = 5;
```
