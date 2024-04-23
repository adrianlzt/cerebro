```rust
if number < 5 {
    println!("menor que 5");
} else {
    println!("mayor o igual que 5");
}
```

Las condiciones de los if deben ser de tipo `bool` siempre. (no podemos hacer, como en python, "if 0" o "if None")


One liners
```rust
let number = if condition { 5 } else { 6 };
```

Un caso particular, donde no hace falta usar "let mut" porque el compilador sabe que sólo se va a asignar un valor a la variable.
```rust
let x;
if condition {
    x = 5;
} else {
    x = 6;
}
```


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
