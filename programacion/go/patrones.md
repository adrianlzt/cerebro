https://github.com/tmrts/go-patterns
https://www.godesignpatterns.com/
http://www.golangpatterns.info/

# Generador (se llama así?)
En vez de crear directamente un objecto generando el struct, definir una función que nos devolverá el puntero al struct generado.
Tener esta función nos ayuda a encapsular la creación y nos permite, por ejemplo, definir unos valores por defecto.

http.Client en cambio no usa constructor: client := &http.Client{}

No hay default values:
https://talks.golang.org/2012/splash.article
One feature missing from Go is that it does not support default function arguments. This was a deliberate simplification. Experience tells us that defaulted arguments make it too easy to patch over API design flaws by adding more arguments, resulting in too many arguments with interactions that are difficult to disentangle or even understand. The lack of default arguments requires more functions or methods to be defined, as one function cannot hold the entire interface, but that leads to a clearer API that is easier to understand. Those functions all need separate names, too, which makes it clear which combinations exist, as well as encouraging more thought about naming, a critical aspect of clarity and readability.


## Default values
https://stackoverflow.com/questions/19612449/default-value-in-gos-method

También se pueden fijar en el constructor los defaults y luego permitir modificar esos valores.

O crear dos constructores distintos, uno con timeout y otro sin él (decide la función el valor por defecto).
