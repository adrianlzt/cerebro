package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	client := http.Client{}
	var err error

	req, err := http.NewRequest("GET", "http://httpbin.org/delay/3", nil)
	if err != nil {
		panic(err)
	}
	req = req.WithContext(ctx)

	i := 0

	for {
		_, err = client.Do(req)
		if err != nil {
			log.Println(err.Error())
			break
		}

		if i > 2 {
			// Simulamos que la llamada ha obtenido el resultado esperado
			break
		}

		i++
		fmt.Println("waiting")
	}

	if err != nil {
		fmt.Println("timeout sin lograr el resultado")
	} else {
		fmt.Println("ok")
	}

}
