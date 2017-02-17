package main

import (
	"encoding/json"
	"fmt"
	"net/url"
	"path"

	"github.com/parnurzeal/gorequest"
)

// Solo cojo un par de campos
type Respuesta struct {
	Origin string `json:"origin"`
	Url    string `json:"url"`
}

func main() {
	endpoint := "http://httpbin.org"
	u, err := url.Parse(endpoint)
	if err != nil {
		fmt.Printf("Error parse: %v", err)
		return
	}

	u.Path = path.Join(u.Path, "get")

	resp, body, errs := gorequest.New().Get(u.String()).End()
	if errs != nil {
		fmt.Println("Errors:")

		for _, e := range errs {
			fmt.Printf("%v\n", e)
		}
		return
	}

	expected_status := 200
	if resp.StatusCode != expected_status {
		fmt.Printf("Status: expected=%v, received=%v", expected_status, resp.StatusCode)
		if body != "" {
			fmt.Printf("Body: %s", body)
		}
		return
	}

	var respuesta Respuesta
	err = json.Unmarshal([]byte(body), &respuesta)
	if err != nil {
		panic(err)
	}
	fmt.Printf("respuesta: %v\n", respuesta)
}
