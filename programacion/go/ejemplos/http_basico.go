package main

import (
    "fmt"
    "net/http"
)

type Hello struct{}

func (h Hello) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

func main() {
    var h Hello
    http.ListenAndServe("localhost:4000", h)
    // por cada peticion que llegue a localhost:4000, go llama a h.ServeHTTP(aDondeEscribir,datosPeticion)
}
