# Usando musl
https://doc.bccnsoft.com/docs/rust-1.36.0-docs-html/edition-guide/rust-2018/platform-and-target-support/musl-support-for-fully-static-binaries.html

rustup target add x86_64-unknown-linux-musl
cargo build --target x86_64-unknown-linux-musl


O si queremos dejarlo fijo en el `.cargo/config.toml`:
```toml
[build]
target = "x86_64-unknown-linux-musl"
```



# Usando glibc
https://msfjarvis.dev/posts/building-static-rust-binaries-for-linux/

RUSTFLAGS='-C target-feature=+crt-static' cargo build --release --target x86_64-unknown-linux-gnu


**NOTA**: Statically linked glibc binaries aren't very portable. In general, you need to run them on a system with exactly the same glibc version
https://github.com/rust-lang/libc/issues/2054#issuecomment-829535318

Parece mejor compilar contra musl.


Si nos falla, podemos ver los crates que necesitan links con librearías dinámicas con:
```
cargo tree | rg -- -sys
```

Tal vez podamos jugar con las "features" de los crates para quitar esas librerías linkadas.

O si queremos dejarlo fijo en el `.cargo/config.toml`:
```toml
[build]
target = "x86_64-unknown-linux-gnu"

[target.'cfg(target_os = "linux")']
rustflags = ["-C", "target-feature=+crt-static"]
```
