Enums allow you to define a type by enumerating its possible variants

Los nombres dentro del enum los estamos creando en ese momento. No tenemos que haberlos declarao antes.

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```
