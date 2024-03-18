Definir una variable en rust
```rust
let x = 5;
```

Definir una variable mutable en rust
```rust
let mut x = 5;
```

# Tipos de variables
integers numbers
floating-point numbers
booleans
characters

i32, a 32-bit number
u32, an unsigned 32-bit number
i64, a 64-bit number
Unless otherwise specified, Rust defaults to an i32

## Mostrar tipo de variable
```rust
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>());
}

fn main() {
    let my_var = 42; // Puede ser cualquier tipo de variable
    print_type_of(&my_var);
}


## Conversión automática de tipos
Si definimos una variable sin especificar el tipo, Rust intentará inferirlo.
Esa inferencia puede depender también de cosas delante del código.
Por ejemplo, si declaramos un integer, por defecto será i32, pero si luego interactúa con un i64, Rust inferirá que es un i64.
```rust
let uno = 1;  // esto normalmente sería un i32, pero como luego interactúa con un i64, Rust lo infiere como i64
let num: i64 = 14;
let otro = num + uno;
```


# Shadowing
Podemos redefinir una variable con el mismo nombre, y Rust lo considerará como una nueva variable.
Un uso típico es para convertir entre tipos de variables.
```rust
let body_length = "5";
let body_length: i32 = body_length.trim().parse().expect("Please type a number!");
```

