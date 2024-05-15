# struct
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

# Implementar métodos a un struct
```rust
impl Name {
    fn metodo(&self, arg: Type) -> RetType {
        unimplemented!();
    }
    fn metodo2(&self) -> RetType {
        unimplemented!();
    }
}
```

"&self" es en realidad "self: &Self", donde &Self es un alias para el típo de dato del método que estamos implementando.
El primer parámetro siempre debe llamarse "self".
Podríamos poner "self: &Name"

Podemos reusar el nombre de un field como método.

Rust automáticamente "modifica" el objeto que estamos usando para que haga match de lo que espera el método.
Si el método es "&self", cuando hacemos foo.metodo(), lo estará convirtiendo a "&(foo).metodo()".

Podemos implementar las funciones asociadas (métodos o no) en distintos bloques "impl".
Tal vez nos interese partirlo en varios por legibilidad.

## new
`new` suele ser un método que se define para crear un struct de un tipo determinado. Los usuarios esperan que los `new` nunca fallen.
```rust
impl Name {
    fn new(arg: Type) -> Self {
        Self { ... }
    }
}
```


## Para generics
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


# Associated functions que no son métodos
Podemos declarar una función asociada a un struct sin que sea un método, si no le pasamos "self".
Típicamente lo usaremos como constructor llamándole "new".
Un ejemplo de uso típico es "String::from".
```rust
impl Name {
    fn new(arg: Type) -> Self {
        Self { ... }
    }
    fn foo() -> RetType {
        unimplemented!();
    }
}
```



# Borrow / move / mut
También podemos especificar que el método quiere coger self de manera mutable
```rust
fn metodo(&mut self) {
    self.foo = 123;
}
```

También podríamos hacer que el método tome el ownership de la variable
```rust
fn metodo(self) {
    ...
}
```
Esto es raro. Podría darse el caso si queremos modificar "self" en algo distinto y evitar que el usuario lo use.


# Public / private
Si hacemos público un struct, tenemos que especificar que fields serán públicos.
Si hay fields privados, no se podrá generar el struct desde fuera, tendremos que crearle una función tipo "new" para ello.
