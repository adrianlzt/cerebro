https://gobyexample.com/structs

mirar embedding.md

convertir generic maps -> structs y viceversa: https://github.com/mitchellh/mapstructure

Libreria para trabajar con structs: https://github.com/fatih/structs
Simplifica algunas tareas, como crear un mapping a partir de un struct, comprobar valores, etc

type person struct {
    name string
    age  int
}

# Crear
person{"Bob", 20}
s := person{name: "Alice", age: 30}

# Acceder
s.name

# Comparar si son vacios
https://play.golang.org/p/wRUmxj1naS

	if (Session{}) == session {
		fmt.Println("zero")
	}

Si tenemos un map dentro del struct necesitaremos usar reflect
https://play.golang.org/p/O5sUzjxAHE
reflect.DeepEqual(session,Session{})


# Comparar
s1 == s2

Pero si tienen mas valores dentro, maps, etc, tendremos que usar
https://golang.org/pkg/reflect/#DeepEqual

func DeepEqual(x, y interface{}) bool


# Printf
Si ponemos un "+", sacará también los nombres de los fields del struct
s := person{name: "Sean", age: 50}
fmt.Printf("%v", s)
fmt.Printf("%+v", s)

{Sean 50}
{name:Sean age:50}


# Declarar de forma reducida
No hace falta siempre especificar el tipo de dato

type test struct {
  valores []int
}
t := test { valores: {1,2,3} }
