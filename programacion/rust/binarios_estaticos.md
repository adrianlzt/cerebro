rustup target add x86_64-unknown-linux-musl

O en archlinux:
pacman -S rust-musl llvm-libs

Build con ese target musl:
cargo build --relase --target x86_64-unknown-linux-gnu
