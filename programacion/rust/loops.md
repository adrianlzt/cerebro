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
