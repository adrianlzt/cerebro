Cuando creamos un nuevo crate tipo librería, cargo ya crea un módulo de tests automáticamente en el lib.rs.

En rust lo idiomatico es tener un módulo de tests en el mismo archivo que el código que se está testeando, por lo que se recomienda mover el módulo de tests a la parte inferior del archivo lib.rs.
Mirar en "Organización" para ver como separar los tests unitarios de los de integración.

```rust
#[cfg(test)] // Esto evita añadir este código al hacer cargo build
mod tests {
    // Esto lo añadimos para poder usar las funciones del crate sin tener que usar el prefijo super::
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

Los tests estarán separados en un módulo de tests que se compilará solo si se compila con la opción de tests.

Para convertir una función en un test añañdir el atributo #[test] antes de la definición de la función.

Para correr los tests se puede usar el comando cargo test.
cargo test is to run all the tests in parallel.
```bash
cargo test
```

Si queremos correlos secuencialmente:
```bash
cargo test -- --test-threads=1
```

Si el test es correcto, no se mostrará el stdout, si falla, se mostrará el stdout.

Si queremos ver stdout de todos los tests:
```bash
cargo test -- --show-output
```

Si queremos seleccionar que tests ejecutar
```bash
cargo test foo
```

Si queremos ignorar tests por defecto
```rust
#[test]
#[ignore]
fn expensive_test() {
    ...
}
```

Si queremos correr solo los tests ignorados
```bash
cargo test -- --ignored
```

O si queremos ejecutar todos, ignorado y normales:
```bash
cargo test -- --include-ignored
```

# Funciones para testear
```rust
assert_eq!(2 + 2, 4); // Pasa si los dos argumentos son iguales
assert_ne!(2 + 2, 5); // Pasa si los dos argumentos son diferentes

assert!(true); // Pasa si el argumento es true
assert!(result.contains("specific text"),
    "Mesaje customizado: {}",
    result
); // Pasa si el argumento es true, si no, imprime el mensaje customizado
```

Si queremos testear que una función panique, podemos usar el atributo #[should_panic] en la definición del test.
```rust
#[test]
#[should_panic]
fn greater_than_100() {
    Guess::new(200);
}
```

Si esperamos un panic determinado ("expected" debe ser una substring del mensaje):
```rust
#[should_panic(expected = "less than or equal to 100")]
```

Un test también puede devolver Ok/Err, marcando que tiene un Result como retorno:
```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        } 
    } 
}
```

Si queremos capturar un panic cuando estamos devolviendo un Result:
```rust
#[test]
#[should_panic]
fn it_works() -> Result<(), String> {
    ...
    assert!(value.is_err())
}
```


Values being compared must implement the PartialEq and Debug traits.
All primitive types and most of the standard library types implement these traits.
For structs and enums that you define yourself, you’ll need to implement PartialEq to assert equality of those types


# Organización
https://rust-book.cs.brown.edu/ch11-03-test-organization.html#:~:text=Unit%20tests%20are,modules%20per%20test

Los test unitarios lo pondremos en el mismo fichero.

Para los test de integración creamos un directorio tests y dentro de él los ficheros de test.
Estos serán como aplicaciones externas que usan nuestra librería.
Estos no necesitan #[cfg(test)] ya que no se compilarán con el código principal.
Es un crate distinto.

Si queremos definir funciones a usar por distintos test de integración, podemos definir un módulo en el fichero de test y usarlo en los test.
tests/common/mod.rs
