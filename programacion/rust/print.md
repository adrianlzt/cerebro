Se usa la macro "println" ("!" denota que es una macro) para imprimir en la consola.
println!("hola")

Formatear variables:
println!("x = {x} and y + 2 = {}", y + 2);

Dentro de los corchetes solo se puede meter una variable, no una expresión (no podemos hacer {1+2}).

También podemos usar '{:?}', que llamará al trait "Debug".
O '{:#?}', igual que el anterior pero "pretty print".

Para escapar "{" o "}", doblarlos, ejemplo println!("hola {{")

En los structs podemos añadir el "outer attribute" #[derive(Debug)] antes de crearlo para que se implemente automáticamente ese trait.

Ese trait tiene esta forma:
impl Debug for Name {
    fn fmt(&self, x: &mut Formatter<'_>) -> Result<(), std::fmt::Error> {
        if x.alternate() {
            println!("{{\n  field={}\n}}", self.field);
            return Ok({});
        }

        println!("{{ field={} }}", self.field);
        Ok({})
    }
}

Lo de alternate es si hemos hecho "{#?}"


# dbg

También podemos usar la macro "dbg!", que coje el ownership de la variable, imprime y luego devuelve el ownership.
Imprimirá primero el fichero, línea y columna, luego el nombre de la variable y el contenido, también usando el trait "Debug".
Lo envía a stderr.

Lo mejor es que podemos meterlo en medio de una expresión tipo:
foo.bar().baz()
->
dbg!(foo.bar()).baz()
