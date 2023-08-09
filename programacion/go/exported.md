In Go, a name is exported if it begins with a capital letter.

Ejemplo de un struct exportado:
type Nombre struct { ... }

O una función exportada
func Foo() { ... }


Si queremos ver que tenemos exportado podemos hacer:
go doc
