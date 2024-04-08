# Usando glibc
https://msfjarvis.dev/posts/building-static-rust-binaries-for-linux/

RUSTFLAGS='-C target-feature=+crt-static' cargo build --release --target x86_64-unknown-linux-gnu



# Usando musl
https://www.reddit.com/r/rust/comments/rsa072/building_a_fully_static_linux_executable_in_2021/?rdt=43425

rustup target add x86_64-unknown-linux-musl

O en archlinux:
pacman -S rust-musl musl llvm-libs lld

Build con ese target musl:
RUSTFLAGS='-C linker=ld.lld -C relocation-model=static -C strip=symbols' cargo build --relase --target x86_64-unknown-linux-gnu


# Config fija
O si queremos dejarlo fijo en el cargo.toml:
```toml
[build]
target = "x86_64-unknown-linux-musl"

[target.'cfg(target_os = "linux")']
rustflags = ["-C", "linker=ld.lld", "-C", "relocation-model=static", "-C", "strip=symbols"]
```

Si quitamos los "symbols" no se podrá hacer debug, pero el binario será más pequeño.
