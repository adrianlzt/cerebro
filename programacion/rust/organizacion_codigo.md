Split your program into a main.rs and a lib.rs and move your program’s logic to lib.rs.
As long as your command line parsing logic is small, it can remain in main.rs.
When the command line parsing logic starts getting complicated, extract it from main.rs and move it to lib.rs.

El código en main.rs no se puede testear.
Deberá ser lo suficientemente sencillo para que una revisión visual sea ssuficiente.

Normalmente main.rs solo realizará estas tareas:
 - Calling the command line parsing logic with the argument values
 - Setting up any other configuration
 - Calling a run function in lib.rs
 - Handling the error if run returns an error


# Organización de cara a usuarios del crate
Tal vez la organización de módulos interna de nuestro crate no sea la mejor para los usuarios.
Si queremos exponer públicamente una organización distinta usaremos re-export.

Ejemplo de src/lib.rs donde re-exportamos distintos módulos para que el usuario pueda acceder directamente, sin tener que "navegar" por los módulos internos.
```rust
pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
}

pub mod utils {
    // --snip--
}
```

Estos re-exports se mostrarán en la página principal del módulo.

También podemos reexportar definiciones de dependencias de nuestro crate, si eso da una API pública con más sentido.



# Workspaces
Workspace is a set of packages that share the same Cargo.lock (cargo resolverá las dependencias para que sean iguales para todos) and output directory.

Cargo doesn’t assume that crates in a workspace will depend on each other, so we need to be explicit about the dependency relationships.

Si queremos crear un crate en el workspace:
```bash
cargo run -p adder
```

Cada crate se tendrá que publicar por separado.
