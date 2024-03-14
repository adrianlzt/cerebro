https://doc.rust-lang.org/stable/book/ch04-00-understanding-ownership.html

Rust usa una gestión de memoria particular para proteger de los típicos fallos de C y C++.

Cada zona de memoria en el heap tiene un propietario, y solo puede haber un propietario a la vez. Cuando el propietario sale del ámbito, la memoria se libera.

También existe los préstamos de memoria (borrowing), que permiten que un propietario ceda temporalmente la propiedad de la memoria a otra parte del código.
Estos borrows, llamados references, usan la misma sintaxis que los punteros.

Podemos tener muchas referencias a la misma memoria, pero solo puede haber una referencia mutable a la vez.

Definir una referencia no mutable:
```rust
let s1 = String::from("hello");
let s1_ref = &s1;
```

Definir una referencia mutable:
```rust
let mut s1 = String::from("hello");
let s1_ref = &mut s1;
```

Si hago un mutable borrow, la variable "original" no la podré usar (cuando la intento usar la considera un borrow y dice que ya no puedo usarla).
