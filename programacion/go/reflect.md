https://golang.org/pkg/reflect/
https://golang.org/doc/articles/laws_of_reflection.html

Package reflect implements run-time reflection, allowing a program to manipulate objects with arbitrary types. 


# Obtener el tipo de una variable:

import "reflect"
tst := "string"
fmt.Println(reflect.TypeOf(tst))



Ejemplo usando reflect para acceder a elementos de un struct:
https://gist.github.com/drewolson/4771479
