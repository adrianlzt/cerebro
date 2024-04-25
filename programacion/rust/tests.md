Cuando creamos un nuevo crate tipo librería, cargo ya crea un módulo de tests automáticamente en el lib.rs.

En rust lo idiomatico es tener un módulo de tests en el mismo archivo que el código que se está testeando, por lo que se recomienda mover el módulo de tests a la parte inferior del archivo lib.rs.

```rust
#[cfg(test)]
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
```bash
cargo test
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

Values being compared must implement the PartialEq and Debug traits.
All primitive types and most of the standard library types implement these traits.
For structs and enums that you define yourself, you’ll need to implement PartialEq to assert equality of those types
