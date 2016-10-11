package main

import (
	"fmt"
	"github.com/nightlyone/lockfile"
	"time"
)

func main() {
	lck,err := lockfile.New("/tmp/datos")
	if err != nil {
		panic(err)
	}

	fmt.Println("Intentamos adquirir el lock")
	for {
		err = lck.TryLock()
		if err == nil {
			break
		} else {
			fmt.Println("Lock ocupado. Esperando 2s")
			time.Sleep(2*time.Second)
		}
	}

	fmt.Println("Lock adquirido!")
	time.Sleep(10*time.Second)
	fmt.Println("Fin de lock")
	lck.Unlock()
}
