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
