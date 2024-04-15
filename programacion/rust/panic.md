# panic
Indica un error en tiempo de ejecución.

```rust
panic!("crash and burn");
```


# todo! macro / unimplemented! macro
https://doc.rust-lang.org/std/macro.todo.html

Indicates unfinished code.

Es un panic que se puede usar para marcar código que falta implementar.

```rust
todo!("foo");
```


The difference between unimplemented! and todo! is that while todo! conveys an intent of implementing the functionality later and the message is “not yet implemented”, unimplemented! makes no such claims. Its message is “not implemented”.
