Closures, definir una función y almacenarla en una variable o pasarla como un argumnento, o como retorno de una función.

Capturan variables del entorno en el que fueron definidas.

```rust
let expensive_closure = |num: u32| -> u32 {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    num
};
```

Usando un closure para llamar a una tercera función:
```rust
fn giveaway(&self, user_preference: Option<ShirtColor>) -> ShirtColor {
    user_preference.unwrap_or_else(|| self.most_stocked())
}
```

Por defecto los closures solo obtendrán permiso de borrow de las variables que usen.
Ejemplo válido:
```rust
let list = vec![1, 2, 3, 4, 5];
let only_borrows = || println!("{:?}", list);
println!("{:?}", list);
only_borrows();
```

Si queremos obtener el ownsership de una variable, debemos usar la palabra clave `move`:
```rust
let list = vec![1, 2, 3, 4, 5];
let owns = move || println!("{:?}", list);
owns();
```

Un caso típico es cuando usamos un closure en un nuevo thread.
Moveremos la variable para evitar que el main thread intente dropear la variable al terminar, sin que el otro thread pueda haber terminado.


# Traits que puede implementar un closure
https://doc.rust-lang.org/book/ch13-01-closures.html#moving-captured-values-out-of-closures-and-the-fn-traits

Depende de como se comporte el body de un clouser, puede implementar distintos traits.

FnOnce: El closure consume las variables capturadas, solo puede ser llamado una vez. Todos los closure implementan este trait.

FnMut: El closure puede mutar las variables capturadas. Puede ser llamado múltiples veces.

Fn: no mueve ni muta las variables capturadas. Puede ser llamado múltiples veces y concurrentemente.

```rust
