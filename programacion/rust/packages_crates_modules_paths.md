Al hacer un "cargo new" lo que estamos creando es un package.

Un package puede tener uno o varios "binary crates" y/o un único "library crate".

Si tenemos src/main.rs, ese binary crate se llamará como el package.
Si tenemos src/lib.rs, ese library crate se llamará como el package.

Podemos definir más binary crates en src/bin/foo.rs


# Modules
Podemos declarar módulos con
"mod foo".

Este módulo podemos declararlo "inline":
```rust
mod foo 
    ...
}
```

O como un fichero:
src/foo.rs
o
src/foo/mod.rs

Si declaramos submódulos irán:
src/garden/vegetables.rs
src/garden/vegetables/mod.rs

La típica organización para una cli sería tener un src/main.rs y un src/lib.rs.
El default binary crate sería un cliente más de la default library crate.


# Paths
Para llegar a los distintos módulos podemos usar el path absoluto:
crate::garden::vegetables::Asparagus

O empezar por un módulo "sibling" (que esté al mismo nivel), será un path relativo.

También se puede usar "super" para subir un nivel (lo que sería ".." en linux).


# Private vs public
Por defecto todos los módulos son privados. Si queremos acceder tenemos que usar "pub" para decir que exponemos.
Los módulos "hijos" si pueden acceder al padre.

Para acceder a las cosas de un módulo tendremos que hacerlo público.
Una vez público tenemos que especificar que cosas queremos hacer públicas:
```
pub mod foo {
    pub fn bar...
```

Si hacemos público un struct, tendremos que también especificar que fields del struct son públicas.
Los enum públicos si que exportan todos sus variants.


# Use keyword
Es como hacer un link para poder llamar a una función/enum/struct/etc con un nombre más corto.
Podemos pensarlo como hacer un "ln -s".

Es idiomático importar el módulo para llamar a funciones (no importar directamente la función).
Es idiomático usar el path completo para llamar a structs o enums.

Podemos renombrar lo que importamos:
user std::io::Result as IOResult


Si usamos "use" para importar cosas a nuestro scope, quien use este scope también podrá acceder a esos "imports".
Es una manera de poder exponer la organización del código hacia fuera distinta ha como la tenemos internamente.
Esta técnica se llama re-exporting.
