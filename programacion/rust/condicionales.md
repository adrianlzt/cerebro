# if let
Versión "corta" de match.
Cuidado, perdemos la comprobación exhaustiva a las que nos obliga match.

```rust
if let Some(x) = foo {
    println!("valor {}", x);
} else {
    println!("foo");
}
```
La rama "else" es opcional.

Sería como hacer en `match`:
```rust
match foo {
    Some(x) => println!("valor {}", x),
    _ => println!("foo"),
}
```
