```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}

struct Point<T, U> { 
    x: T, 
    y: U, 
}
```


# Impl / métodos
Si queremos implementar métodos para una estructura, usamos `impl`.

Por ejemplo, el típico "getter":
```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

También podemos implementar métodos para cuando el tipo de dato es uno específico:
```rust
impl Point<f32> {
    fn distancia_desde_el_origen(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

https://rust-book.cs.brown.edu/ch10-01-syntax.html#:~:text=impl%3CX1%2C%20Y1%3E%20Point%3CX1%2C%20Y1%3E%20%7B%0A%20%20%20%20fn%20mixup%3CX2%2C%20Y2%3E(self%2C%20other%3A%20Point%3CX2%2C%20Y2%3E)%20%2D%3E%20Point%3CX1%2C%20Y2%3E%20%7B%0A%20%20%20%20%20%20%20%20Point%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20x%3A%20self.x%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20y%3A%20other.y%2C%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D

O si tenemos un struct con dos tipos de datos distintos y a parte otro punto con otros dos tipos de datos distintos:
```rust
struct Point<T, U> {
    x: T,
    y: U,
}

impl<T, U> Point<T, U> {
    fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}
```
