Similar a option, pero para devolver algo o un error.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Sería el equivalente al `val, err` de go, pero condensado en una única variable.
