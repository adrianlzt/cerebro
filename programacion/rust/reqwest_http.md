https://crates.io/crates/reqwest
https://docs.rs/reqwest/latest/reqwest/

cargo add reqwest
Por defecto el cliente que se instala es reqwest::Client, que es no blocking (asíncrono).

Si queremos el cliente blocking (síncrono) usamos reqwest::blocking::Client, para instalarlo
cargo add reqwest --features blocking
