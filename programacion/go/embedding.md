https://golang.org/doc/effective_go.html#embedding

Es una forma de hacer "subclases".

Creamos un struct que en sus propiedades tiene otro objecto del que queremos heredar sus atributos y métodos.


Ejemplo de uso:
https://stackoverflow.com/a/43507669


Method override
https://medium.com/random-go-tips/method-overriding-680cfd51ce40

Para acceder al parent:
c.NombreParent.Funcion()
