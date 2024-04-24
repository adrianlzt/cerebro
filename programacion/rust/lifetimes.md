https://rust-book.cs.brown.edu/ch10-03-lifetime-syntax.html

El uso de lifetimes es una de las características más distintivas de Rust. Los lifetimes aseguran que los datos vivan el tiempo suficiente para ser usados.
El típico caso de uso es cuando pasamos varios parámetros a una función y la respuesta depende de alguno de esos datos.
Rust no analiza la función para saber de donde vienen los datos, por lo que tenemos que decirle explícitamente con que dato de entrada está relacionado el dato de salida.

Por ejemplo, si tenemos una función que devuelve el valor más largo entre dos strings.
Usamos el lifetime `'a` para decirle a Rust que la respuesta va a depender de uno de los dos strings que le pasamos.
Le estaremos diciendo que la respuesta dependerá de uno de los dos strings que le pasamos.
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

Con esto rust puede comprobar que cuando usamos la respuesta, los datos de entrada siguen vivos.

NOTA: el definir los lifetimes no cambia el tiempo de vida de los datos, solo le dice a Rust que los datos de entrada están relacionados con la salida.
Es una ayuda que hacemos al compilador para que pueda comprobar que los datos siguen vivos.


# Lifetime en structs
https://rust-book.cs.brown.edu/ch10-03-lifetime-syntax.html#lifetime-annotations-in-struct-definitions

Si nuestro struct contiene referencias a valores (en vez de ser el owner), tenemos que definir los lifetimes.
```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

Le estaremos diciendo a Rust que el struct ImportantExcerpt no puede vivir más que el string al que hace referencia.


# Elision rules
Reglas que Rust usa para inferir los lifetimes.
Si no definimos los lifetimes, Rust usará estas reglas para inferirlos.
Si con estas reglas el compilador consigue inferir los lifetimes, no tendremos que definirlos.

Primera regla: el compiladores asigna un lifetime a cada referencia.
Segunda regla: si hay solo un parámetro de entrada, el lifetime de salida será el mismo que el de entrada.
Terce regla: si hay varios parámetros de entrada pero uno de ellos es &self o &mut self, el lifetime de salida será el mismo que el de self.

Ejemplo donde no hace falta definir los lifetimes:
```rust
fn first_word(s: &str) -> &str {
```

Ejemplo donde sí hace falta definir los lifetimes, por que el compilador no puede inferirlos:
```rust
fn longest(x: &str, y: &str) -> &str {
```


# static lifetime
https://rust-book.cs.brown.edu/ch10-03-lifetime-syntax.html#the-static-lifetime

El lifetime 'static es especial.
Es el lifetime que dura toda la ejecución del programa.

Todos los strings literales tienen el lifetime 'static.
```rust
let s: &'static str = "foo";
```

Cuidado con los mensajes del compilador sugiriendo que uses 'static, analizar si es lo que realmente queresmos.
