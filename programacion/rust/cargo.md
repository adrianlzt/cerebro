Donde están las libs:
crates.io

# Crear una nueva app
cargo new nombre_paquete

# Ejecutar
Desde el dir de la app
cargo run
cargo r

# Compilar
cargo build
cargo b

# Añadir crates (librerías)
cargo add nombre_crate

En el siguiente cargo run/build se bajará el crate y sus dependencias.

Algunas dependencias pueden tener "features" que se pueden añadir:
cargo add nombre_crate --features "feature1 feature2"


Hay dos tipos de crates:
- Binaries: ejecutables
- Libraries: librerías

## Versiones
^0.1.1: esto es 0.1.x, es decir, sin romper compatibilidad al subir el major.


# Update
Si usamos "cargo update", ignorará el Cargo.lock y actualizará las dependencias a las últimas versiones compatibles.


# Doc local
cargo doc --open

Build documentation provided by all your dependencies locally
