Enums allow you to define a type by enumerating its possible variants

Los nombres dentro del enum los estamos creando en ese momento, serán como structs vacíos.

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

fn foo(arg: IpAddrKind) {
    match arg {
        IpAddrKind::V4 => {
            println!("1.2.3.4");
        }
        IpAddrKind::V6 => {
            println!("deaf::beef");
        }
    }
}
```

También podemos decidir el tipo de dato de los elementos del enum:
```rust
enum IpAddr {
    V4(String),
    V6(i32, i32),
}
let home = IpAddr::V4(String::from("127.0.0.1"));
// Otra forma de crearlo
let foo = IpAddr::V4;
foo("baz".to_string())

let dos = IpAddr::V6(2,3);

// el match cambia para coger el valor de dentro
fn muestra(arg: IpAddrKind) {
    match arg {
        IpAddrKind::V4(x) => {
            println!("1.2.3.4 -- {}", x);
        }
        IpAddrKind::V6(_,_) => {
            println!("deaf::beef");
        }
    }
}

```

Y es posible que el tipo de dato del enum sea un struct:
```rust
struct Ipv4Addr {
    // --snip--
}
struct Ipv6Addr {
    // --snip--
}
enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```


Otro ejemplo de como se podría usar un enum:
```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```


También podemos implementar métodos para enums:
```rust
impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}
```

Implementar una associated funcion (sin self) es parecido a un elemento del enum con parámetros.
