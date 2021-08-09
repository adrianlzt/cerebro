package main

import (
	"fmt"
	"net/http"
	"sync"
)

type Hello struct{}

func (h Hello) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello!")
}

type Bye struct{}

func (h Bye) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Bye!")
}

func main() {
	var h Hello
	var b Bye
	var wg sync.WaitGroup

	fmt.Println("start")

	m := http.NewServeMux()
	m.Handle("/", h)
	m.Handle("/bye", b)

	s1 := &http.Server{
		Addr:    "localhost:4000",
		Handler: m,
	}

	s2 := &http.Server{
		Addr:    "localhost:4001",
		Handler: b,
	}

	wg.Add(1)

	go s1.ListenAndServe()
	go s2.ListenAndServe()
	go http.ListenAndServe("localhost:4002", m)

	wg.Wait()

	fmt.Println("fin")
}
