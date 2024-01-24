Se usa la macro "println" ("!" denota que es una macro) para imprimir en la consola.
println!("hola")

Formatear variables:
println!("x = {x} and y + 2 = {}", y + 2);

Dentro de los corchetes solo se puede meter una variable, no una expresión (no podemos hacer {1+2}).

También podemos usar '{:?}', que llamará al trait "Debug".
O '{:#?}', igual que el anterior pero "pretty print".

En los structs podemos añadir el "outer attribute" #[derive(Debug)] antes de crearlo para que se implemente automáticamente ese trait.
