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


# Update
Si usamos "cargo update", ignorará el Cargo.lock y actualizará las dependencias a las últimas versiones compatibles.


# Doc local
cargo doc --open

Build documentation provided by all your dependencies locally


# Cargo generate
Para generar scaffolding de específicos.

cargo install cargo-generate

Ejemplo:
cargo generate https://github.com/aya-rs/aya-template
