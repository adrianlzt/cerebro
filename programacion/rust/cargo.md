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
