Donde están las libs:
crates.io

Hay dos tipos de crates:
- Binaries: ejecutables
- Libraries: librerías


# Crear una nueva app
cargo new nombre_paquete


# Ejecutar
Desde el dir de la app
cargo run
cargo r


# Compilar
cargo build
cargo b

Debug symbols are enabled by default when using cargo build or cargo run without the --release flag


# Añadir crates (librerías)
cargo add nombre_crate

En el siguiente cargo run/build se bajará el crate y sus dependencias.

Algunas dependencias pueden tener "features" que se pueden añadir:
cargo add nombre_crate --features "feature1 feature2"

Si queremos quitar las features que vienen por defecto con el crate podemos añadir:
cargo add nombre_crate --no-default-features
O en el Cargo.toml:
```toml
[dependencies]
nombre_crate = { version = "0.1", default-features = false }
```

## Versiones
^0.1.1: esto es 0.1.x, es decir, sin romper compatibilidad al subir el major.

## git
https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html#specifying-dependencies-from-git-repositories

Podemos especificar una librería de git:
cargo add nombre_crate --git "url"

O en Cargo.toml:
```toml
[dependencies]
nombre_crate = { git = "url", rev = "commit" }
```


# Update
Si usamos "cargo update", ignorará el Cargo.lock y actualizará las dependencias a las últimas versiones compatibles.


# Doc local
cargo doc --open

Build documentation provided by all your dependencies locally
Mirar doc.md para ver como definir esta documentación.

Usar "rustdoc" para generar la doc, que la dea en target/doc.


# Cargo generate
Para generar scaffolding de específicos.

cargo install cargo-generate

Ejemplo:
cargo generate https://github.com/aya-rs/aya-template


# publish
Si queremos publicar nuestro crate públicamente.
Necesitaremos añadir cierta info en la sección [package] del Cargo.toml (fallará el publish si nos falta algo).

Para poder publicar tendremos que habernos logueado, cargo login (se almacenará la info en ~/.cargo/credentials)

La versiones publicadas son permanentes, no se pueden eliminar.
Si hemos subido una versión que no queremos, podemos hacer "yanking", para evitar que nuevos proyectos dependan de esa versión, pero sin romper los que ya pudiesen depender.

```bash
cargo yank --vers 1.0.1
```

Deshacer un yank:
```rust
cargo yank --vers 1.0.1 --undo
```


# install
The cargo install command allows you to install and use binary crates locally. This isn’t intended to replace system packages; it’s meant to be a convenient way for Rust developers to install tools that others have shared on crates.io.



# Profiles
Cargo has two main profiles: the dev profile Cargo uses when you run cargo build and the release profile Cargo uses when you run cargo build --release. The dev profile is defined with good defaults for development, and the release profile has good defaults for release builds.

Si queremos modificar los valores por defecto definiremos, en el Cargo.toml la sección [profile.*]



# Subcommands
Cargo is designed so you can extend it with new subcommands without having to modify Cargo. If a binary in your $PATH is named cargo-something, you can run it as if it was a Cargo subcommand by running cargo something. Custom commands like this are also listed when you run cargo --list
