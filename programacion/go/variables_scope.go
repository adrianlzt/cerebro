package main

import "fmt"

var foo int

func main() {
	test1()
	test2()
	test3()
}

func test1() {
	fmt.Println("Test1")
	foo = 34 // Se refiere a la externa
	fmt.Printf("foo global: (%p) %v\n", &foo, foo)

	foo := "hola" // Crea una nueva
	fmt.Printf("foo local: (%p) %v\n", &foo, foo)
}

func test2() {
	fmt.Println("Test2")
	fmt.Printf("foo global: (%p) %v\n", &foo, foo)
	foo, err := Test() // Se refiere a una nueva
	fmt.Printf("foo local: (%p) %v\n", &foo, foo)
	AvoidNotUsed(err)
}

func test3() {
	fmt.Println("Test3")
	fmt.Printf("foo global: (%p) %v\n", &foo, foo)
	var err error
	foo, err = TestInt() // Se refiere a la global
	fmt.Printf("foo global: (%p) %v\n", &foo, foo)
	AvoidNotUsed(err)
}

func Test() (string, error) {
	return "test", nil
}

func TestInt() (int, error) {
	return 3, nil
}

func AvoidNotUsed(a interface{}) {}
