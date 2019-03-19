package main

import (
	"fmt"
	"sync"

	"time"

	"golang.org/x/sync/singleflight"
)

func main() {
	var wg sync.WaitGroup
	g := singleflight.Group{}

	wg.Add(1)
	go func() {
		v, _, shared := g.Do("somekey", func() (interface{}, error) {
			fmt.Println("detro de do")
			defer fmt.Println("saliendo de do")
			time.Sleep(3 * time.Second)
			return "resultadoDo1", nil
		})
		fmt.Println("do1", v, shared)
		wg.Done()
	}()

	v2, _, shared2 := g.Do("somekey", func() (interface{}, error) {
		fmt.Println("detro de do2")
		defer fmt.Println("saliendo de do2")
		time.Sleep(3 * time.Second)
		return "resultadoDo2", nil
	})
	fmt.Println("do2", v2, shared2)
	wg.Wait()
}

// detro de do2
// <-- aqui espera hasta que termina do2
// saliendo de do2
// do2 resultadoDo2 true
// do1 resultadoDo2 true
