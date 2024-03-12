https://docs.rs/clap/latest/clap/

cargo add clap --features derive

Nos genera el -h/--help automáticamente

Ejemplo básico
```
use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Name of the person to greet (esta línea será la ayuda al mostrar el help)
    #[arg(short, long)] // genera -n y --name
    name: String,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}!", args.name)
    }
}
```
