Es una forma de reusar código para distintos tipos de datos.

"T" será el tipo de dato que se le pase a la función.
```rust
fn largest<T>(list: &[T]) -> &T {
```

Generalmente lo usaremos de esta manera.
Esto quiere decir que podemos pasar cualquier tipo de dato que implemente el trait `PartialOrd` y `Copy`.
Así, dentro de la función, sabremos que podemos comparar los elementos y copiarlos.
De esta manera podemos hacer una función "genérica" que vale para muchos tipos de datos.
```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}
