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

Matchear tipos de errores determinados:
```rust
match val {
    Ok(valor) => {
        // hacer algo con valor
    }
    Err(e) => match e {
        Error::NotFound => println!("No se ha encontrado"),
        Error::PermissionDenied => println!("Permiso denegado"),
        _ => println!("Error desconocido"),
    }
}
```

Otra opción más compacta es usar if let:
```rust
if let Ok(valor) = val {
    // hacer algo con valor
} else {
    // manejar el error
}
```

O si queremos comprobar si es un error:
```rust
if let Err(e) = val {
    // manejar el error
}
```

## gestionar errores
Si llamamos a una función que devuelve Result e ignoramos el resultado, el compilador nos avisará.

note: this `Result` may be an `Err` variant, which should be handled


## unwrap
Este método devuelve el valor si es Ok, o hace panic si es Err.
Como mensaje devuelve el error.
Mejor usar expect, donde podemos añadir un mensaje.


## unwrap_or
Devolvemos el valor del Ok, o un valor por defecto si es Err.
```rust
let b = a.unwrap_or("bar".to_string());
```

## unwrap_or_else
Este método devuelve el valor si es Ok, o ejecuta una función (clousure) si es Err.
```rust
let val = funcion().unwrap_or_else(|error| {
    println!("Error: {}", error);
    0
});
```


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


## is_ok
Este método devuelve false si el result es Err.



## ? operator
https://doc.rust-lang.org/std/macro.try.html

El operador ? se puede usar en funciones que devuelven Result.
Si la función devuelve Ok, se devuelve el valor.
Si la función devuelve Err, se devuelve el error.

Es la forma de propagar errores de forma rápida y concisa.

```rust
fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("username.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

Los errores generados por "?" usan el trait From para convertir el error en el tipo de error que se espera.


Ejemplo de implementación de From, que convierte un error de io en un error de ConfigError:
```rust
impl From<io::Error> for ConfigError {
    fn from(error: io::Error) -> Self {
        ConfigError::Io(error)
    }
}
```


# Dynamic errors - Box<dyn Error>
https://doc.rust-lang.org/std/error/trait.Error.html

Podemos devolver un error dinámico, que puede ser de cualquier tipo que implemente el trait Error.

```rust
fn funcion() -> Result<(), Box<dyn Error>> {
    Err(Box::new(MiError))
}
```


# Anyhow crate
https://docs.rs/anyhow/latest/anyhow/

This library provides anyhow::Error, a trait object based error type for easy idiomatic error handling in Rust applications.

Para poder devolver cualquier tipo de error y poder añadirle contexto.
