Implementar métodos a un struct:
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
