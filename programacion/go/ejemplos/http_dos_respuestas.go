package main

import (
	"fmt"
	"net/http"
)

type String string

type Default int

type Struct struct {
	Greeting string
	Punct    string
	Who      string
}

func (s String) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, s)
}

func (s *Struct) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, s)
}

func (d Default) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "No encontrado")
}

// En la funcion main asociamos las distintas URL a sus Handlers
// Hacemos un truquito. Al poner Default(0) estamos generando automaticamente un tipo Default con valor 0
// Es como si hiciesemos: defecto := Default(0) (el poner el 0 entre paréntesis le fuerza a ser del tipo Default)
func main() {
	http.Handle("/string", String("I'm a frayed knot."))
	http.Handle("/struct", &Struct{"Hello", ":", "Gophers!"})
	http.ListenAndServe("localhost:4000", Default(0))

	// Si queremos llamar a metodos de un mismo objeto podemos usar
	// http.HandleFunc("/", i.httpHandleIndex)
	// http.HandleFunc("/exec", i.httpHandleExec)

}
