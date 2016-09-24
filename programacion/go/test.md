# Mock
Si queremos mockear una función tendrá que ser parte de una interfaz, y lo que haremos es redifinir esa interfaz con las funciones mockeadas.
Ej.:

Queremos mockear la función Get:
func update(c client) string {
  return c.Get()
}

Crearemos otro "objeto" que implemente la interfaz client:
type FakeClient struct {}
func (c FakeClient) Get() string {
  return "fake result"
}

# Goconvey
http://goconvey.co/

Interfaz web que nos ayuda a comprobar el estado de los checks y crear nuevos de manera sencilla.

Puede estar ejecutando los checks según vamos programando, de manera que si hacemos algo que rompa un test, veremos una notificación del navegador al momento.


Ejemplo de uso:
https://github.com/IzakMarais/reporter

go get github.com/smartystreets/goconvey

Deberemos lanzar goconvey desde algún path debajo del GOPATH

## Composer
El composer (http://localhost:8080/composer.html) nos permite escribir en texto natural tabulado los tests que queremos escribir. Nos genera un código hueco para los tests.

## Assertions
https://github.com/smartystreets/goconvey/wiki/Assertions


Comparar que dos objetos son iguales
So(cosa1, ShouldEqual, cosa2)


Para arrays, slices, maps y structs
So(cosa1, ShouldResemble, cosa2)

