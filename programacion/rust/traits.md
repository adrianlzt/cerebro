https://rust-book.cs.brown.edu/ch10-02-traits.html#defining-a-trait

Son como las "interfaces" de go, pero con más funcionalidades.

IMPORTANTE, tenemos que traer los trait a scope para poder usarlos. Por ejemplo, si queremos usar Display, tenemos que hacer:
```rust
use std::fmt::Display;
```


Definir un trait.
Aquí estaríamos declarando que si algo implementa el trait Summary, debe tener un método llamado summarize que devuelva un String.
```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```


Implementamos el trait anterior para el struct NewsArticle.
```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```


No podemos definir un trait en un struct que no sea de nuestra propiedad.


# Default implementations
Podemos definir una implementación por defecto para un trait.
```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

Las implentaciones por defecto pueden llamar a otros métodos del trait, aunque no estén implementadas.

Si nuestro struct hace override de un método del trait, no podremos llamar al método por defecto (lo que en python sería super()).


# Usar traits como parámetros
Podemos usar traits como parámetros de una función.
```rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

O, si queremos un parámetro que implemente más de un trait:
```rust
pub fn notify(item: &(impl Summary + Display)) {
```

O, si queremos que el tipo de dato sea el mismo:
```rust
pub fn notify<T: Summary>(item1: T, item2: T) {
```

O si si es más complicado:
```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{
```


# Usar traits como retorno
```rust
fn returns_summarizable() -> impl Summary {
```


# Ejemplos de traits típicos

## Debug
https://doc.rust-lang.org/std/fmt/trait.Debug.html

```rust
pub trait Debug {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>;
}
```

Ejemplo de uso:
```rust
use std::fmt::Debug;

fn main() {
    let s = 3;
    println!("{:?}", s);
}
```

Para structs lo típico es hacer:
```rust
use std::fmt::Debug;
use std::cmp::PartialEq;

#[derive(PartialEq, Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
```

## PartialEq
https://doc.rust-lang.org/std/cmp/trait.PartialEq.html

```rust
pub trait PartialEq<Rhs = Self>
where
    Rhs: ?Sized,
{
    // Required method
    fn eq(&self, other: &Rhs) -> bool;

    // Provided method
    fn ne(&self, other: &Rhs) -> bool { ... }
}
```

x.eq(y) can also be written x == y, and x.ne(y) can be written x != y

```rust
use std::cmp::PartialEq;

fn main() {
    let s = 3;
    assert_eq!(s, 3);
}
```

Para structs lo típico es hacer:
```rust
use std::fmt::Debug;
use std::cmp::PartialEq;

#[derive(PartialEq, Debug)]
struct Point {
    x: i32,
    y: i32,
}
