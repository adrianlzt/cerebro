https://gobyexample.com/structs

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
