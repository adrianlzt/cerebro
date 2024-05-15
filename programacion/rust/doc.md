https://doc.rust-lang.org/

https://news.ycombinator.com/item?id=22448933
https://fasterthanli.me/articles/a-half-hour-to-learn-rust
Del año 2020

Libro oficial de rust
https://doc.rust-lang.org/stable/book/title-page.html

Variante de libro interactiva (con quizs)
https://rust-book.cs.brown.edu/

https://www.youtube.com/@jonhoo
Vídeos largos de un tipo programando en rust.

https://github.com/shirshak55/Rust-Book-In-PDF/releases


# Documentar el código
`cargo doc` para generar el html.

Se usan tres barras "///".
El formato es markdown

No es obligatorio, aunque podemos hacerlo obligatorio si añadimos `#![deny(missing_docs)]` en el root de nuestra lib.

Podemos usar "headers" para definir secciones.
Las típicas que se suelen usar son:
 - Examples: para ejemplos de uso
 - Panics: para expliacr cuando se puede generar un panic
 - Errors: si se devuelve Result, para definir los tipos de errores
 - Safety: si se esta usando unsafe

Si añadimos "code blocks", "cargo test" ejecutará esos códigos, asi nos aseguraremos que el código de los ejemplos es válido.


Ejemplo:
```rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```


## Documentar la librería
Usar "//!"
Irá asociado al "item" donde definimos esta documentación.
Normalmente usados para documentar crates y modules.

```rust
//! # My Crate
//!
//! `my_crate` is a collection of utilities to make performing certain
//! calculations more convenient.

...
```
