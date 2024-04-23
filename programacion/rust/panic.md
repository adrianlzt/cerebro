# panic
Indica un error en tiempo de ejecución.

```rust
panic!("crash and burn");
```

When a panic occurs, the program starts unwinding, which means Rust walks back up the stack and cleans up the data from each function it encounters.


However, this walking back and cleanup is a lot of work. Rust, therefore, allows you to choose the alternative of immediately aborting, which ends the program without cleaning up.
Memory that the program was using will then need to be cleaned up by the operating system.
If in your project you need to make the resulting binary as small as possible, you can switch from unwinding to aborting upon a panic by adding panic = 'abort' to the appropriate [profile] sections in your Cargo.toml file.


# todo! macro / unimplemented! macro
https://doc.rust-lang.org/std/macro.todo.html

Indicates unfinished code.

Es un panic que se puede usar para marcar código que falta implementar.

```rust
todo!("foo");
```


The difference between unimplemented! and todo! is that while todo! conveys an intent of implementing the functionality later and the message is “not yet implemented”, unimplemented! makes no such claims. Its message is “not implemented”.
