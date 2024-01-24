Compare a value against a series of patterns and then execute code based on which pattern matches.
Patterns can be made up of literal values, variable names, wildcards, and many other things.

Para una versión "compacta" mirar if-let en condicionales.md

Rust nos fuerza a testear todas las ramas. Por ejemplo, si estamos testeando un Option, nos obliga a definir la rama Some y la rama None.
Tendremos que declarar todos los posibles valores del enum.

```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => {
            10
        },
        Coin::Quarter => {
            return 25;
        }
    }
}
```

Si queremos hacer un "default" (matchear el resto de posibilidades), pondremos en el último branch el nombre de una variable (o "_" si no queremos obtener el dato):

```rust
    match coin {
        Coin::Quarter => {
            return 25;
        }
        x => {
            println!("nada");
            0
        }
    }
```

Si no queremos hacer nada en el rama default:
```rust
match foo {
    ...
    _ => (),
}
```
