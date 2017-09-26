https://golang.org/pkg/reflect/
https://golang.org/doc/articles/laws_of_reflection.html

Package reflect implements run-time reflection, allowing a program to manipulate objects with arbitrary types. 


# Obtener el tipo de una variable:

import "reflect"
tst := "string"
fmt.Println(reflect.TypeOf(tst))


# ValueOf
Leer una variable que no conocemos (interface{}) e ir sacando dinámicamente los tipos de datos:
m := []interface{}{1, "2", 3.4}
slice := reflect.ValueOf(m)
primerElemento := slice.Index(0)

El valor obtenido por ValueOf será del tipo reflect.Value. No se convertirá al tipo de dato que haya leído.
reflect.Value tiene varios métodos para trabajar de distintas maneras con el tipo de dato: https://golang.org/pkg/reflect/#Value
Alguno de los métodos será para convertir el tipo de dato explícitamente (por ejemplo Bool())
Otras métodos suponen que el Value es de un tipo determinado y fallarán si no lo es, por ejemplo Index() espera un array, slice o string.



Ejemplo usando reflect para acceder a elementos de un struct:
https://gist.github.com/drewolson/4771479
