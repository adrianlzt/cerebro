https://doc.rust-lang.org/stable/book/ch09-00-error-handling.html

# Result enum / std::result::Result
https://doc.rust-lang.org/std/result/enum.Result.html

Una práctica usual parece ser devolver el enum Result, que puede devolver Ok(valor) o Err(error).

En golang haríamos
```go
val, err := funcion()
if err != nil {
    // manejar el error
}
```

En Rust sería
```rust
let val = funcion();
match val {
    Ok(valor) => {
        // hacer algo con valor
    }
    Err(error) => {
        // manejar el error
    }
}
```

## gestionar errores
Si llamamos a una función que devuelve Result e ignoramos el resultado, el compilador nos avisará.

note: this `Result` may be an `Err` variant, which should be handled


## unwrap
Este método devuelve el valor si es Ok, o hace panic si es Err.
Como mensaje devuelve el error.


## expect
https://doc.rust-lang.org/std/result/enum.Result.html#method.expect

También podemos hacer el típico "panic si hay error" haciendo uso de expect:
```rust
let val = funcion().expect("Error al llamar a funcion");
```

Sería equivalente a
```go
val, err := funcion()
if err != nil {
    panic("Error al llamar a funcion")
}
```
