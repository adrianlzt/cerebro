package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"path"
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

	// Adjuntamos el path para solicitar el disco
	u.Path = path.Join(u.Path, "get")
	fmt.Printf("endpoint: %v", u.String())

	// Lanzamos la query
	client := &http.Client{}
	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		fmt.Printf("Error parse: %v", err)
		return
	}

	response, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error parse: %v", err)
		return
	}
	defer response.Body.Close()

	htmlData, _ := ioutil.ReadAll(response.Body)
	var respuesta Respuesta
	err = json.Unmarshal(htmlData, &respuesta)
	if err != nil {
		panic(err)
	}
	fmt.Printf("respuesta: %v\n", respuesta)
}
