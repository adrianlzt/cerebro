https://docs.rs/tokio/latest/tokio/signal/index.html

Esperar a una señal determinada:

```rust
signal::ctrl_c().await?;
```
