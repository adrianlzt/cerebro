https://golang.org/pkg/net/http/

https://github.com/gorilla/mux
A powerful URL router and dispatcher for golang. http://www.gorillatoolkit.org/pkg/mux
matches incoming requests against a list of registered routes and calls a handler for the route that matches the URL or other conditions

https://go-macaron.com/
A high productive and modular web framework in Go.
Group Routing, Easy Templating, Localization



import "net/http"


# Servidor
Mirar en ejemplos/

## Leer parametros
http://web.com?org=asd
org := r.URL.Query().Get("org")

Si no existe org nos devuelve la cadena vacía ("")

## Errores
https://blog.golang.org/error-handling-and-go

if err := datastore.Get(c, key, record); err != nil {
    http.Error(w, err.Error(), 500)
    return
}


# Cliente
## Get imprimiendo respuesta
https://gist.github.com/ijt/950790

response,_ := http.Get("http://eth0.me")
defer response.Body.Close()
htmlData,_ := ioutil.ReadAll(response.Body)
fmt.Println(string(htmlData))

## Con http client
client := &http.Client{}
req,_ := http.NewRequest("GET", "http://eth0.me", nil)
response,_ := client.Do(req)
defer response.Body.Close()
htmlData,_ := ioutil.ReadAll(response.Body)
fmt.Println(string(htmlData))

## Auth basic
client := &http.Client{}
req, err := http.NewRequest("GET", dashURL, nil)
if err != nil {
  panic(err)
}
req.SetBasicAuth("admin", "adminGRAFOS")
resp, err := client.Do(req)
if err != nil {
  panic(err)
}
defer resp.Body.Close()

## Redirecciones
No permitir:
client := &http.Client{ CheckRedirect: func(req *http.Request, via []*http.Request) error {
    return errors.New("redirection not allowed")
}}

## JSON
https://kev.inburke.com/kevin/golang-json-http/
