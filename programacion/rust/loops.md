# loop
Como el "for { }" de go.

```rust
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};
```

Podemos marcar un loop con un nombre (poniendo "'" y una palabra) y salir de él con "break 'label".

```rust
'outer: loop {
    println!("Entered the outer loop");
    'inner: loop {
        println!("Entered the inner loop");
        break 'outer;
    }
    println!("This point will never be reached");
}
println!("Exited the outer loop");
```

# while

# for

# map
https://doc.rust-lang.org/std/iter/struct.Map.html


The map method returns a new iterator that produces the modified items.

```rust
[1, 2, 3].into_iter().map(|x| x + 1)
```


# iteradores
Son "generadores" de valores.

Se suelen preferir en rust en vez de iterar a mano.
El código de bajo nivel generado será equivalente (Rust’s zero-cost abstractions).

Iterators are lazy, meaning they have no effect until you call methods that consume the iterator to use it up.

All iterators implement a trait named Iterator.

The Iterator trait only requires implementors to define one method: the next method, which returns one item of the iterator at a time wrapped in Some and, when iteration is over, returns None.

Calling the next method on an iterator changes internal state that the iterator uses to keep track of where it is in the sequence. In other words, this code consumes, or uses up, the iterator.

Podemos llamar a su método "collect()" para convertirlos en colecciones.

Collect necesita que anotemos el tipo de dato, ya que rust no puede inferir el tipo de dato:
```rust
let v: Vec<i32> = (1..4).collect();
```

Si usamos loop/for/while con un iterador, este cogerá el ownership de la variable y lo hará mutable por detrás.


## iter_mut
Para iterar sobre referencias mutables.
