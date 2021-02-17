gorequest.md
una lib un poco más sencilla para hacer http como cliente

ejemplo de cliente con net/http parseando json
http_client_json.go

Para montar un server: https://gin-gonic.github.io/gin/
Parece que la gente suele recomentar usar directamente las librerias estandar. Si acaso algun mux


https://golang.org/pkg/net/http/

https://github.com/gorilla/mux
A powerful URL router and dispatcher for golang. http://www.gorillatoolkit.org/pkg/mux
matches incoming requests against a list of registered routes and calls a handler for the route that matches the URL or other conditions

https://go-macaron.com/
A high productive and modular web framework in Go.
Group Routing, Easy Templating, Localization


Si usamos https, net/http intenta usar http2.

https://github.com/valyala/fasthttp
Versión más rápida de net/http, pero no soporta http2


import "net/http"


# Servidor
Mirar en ejemplos/

## Leer parametros
http://web.com?org=asd
org := r.URL.Query().Get("org")

Si no existe org nos devuelve la cadena vacía ("")

## Leer un POST JSON
err := json.NewDecoder(r.Body).Decode(&p)
if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
}


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
// IMPORTANTE! ioutil deprectaed usar io
htmlData,_ := ioutil.ReadAll(response.Body)
fmt.Println(string(htmlData))

## Con http client
client := &http.Client{Timeout: 10*time.Second}
req,_ := http.NewRequest("GET", "http://eth0.me", nil)
response,_ := client.Do(req)
defer response.Body.Close()
// IMPORTANTE! ioutil deprectaed usar io
htmlData,_ := ioutil.ReadAll(response.Body)
fmt.Println(string(htmlData))

## Auth basic
client := &http.Client{Timeout: 10*time.Second}
req, err := http.NewRequest("GET", dashURL, nil)
if err != nil {
  panic(err)
}
req.SetBasicAuth("admin", "admin")
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

## Parametros
https://golang.org/pkg/net/url/#example_Values
https://play.golang.org/p/s41cuIyM7a

req, _ := http.NewRequest("GET", "http://api.themoviedb.org/3/tv/popular", nil)
q := req.URL.Query()
q.Add("api_key", "key_from_environment_or_flag")
q.Add("another_thing", "foo & bar")
req.URL.RawQuery = q.Encode()

## Headers
req.Header.Add("If-None-Match", `W/"wyzzy"`)

### Definir header en el server
w.Header().Add("Content-Type", "application/json")


## TLS/SSL sin chequear
http://stackoverflow.com/questions/12122159/golang-how-to-do-a-https-request-with-bad-certificate

tr := &http.Transport{
  TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
}
client := &http.Client{Transport: tr}

## Proxy
http://stackoverflow.com/questions/14661511/setting-up-proxy-for-http-client

HTTP_PROXY="http://proxyIp:proxyPort" go run main.go

En el codigo:
proxyUrl, err := url.Parse("http://proxyIp:proxyPort")
myClient := &http.Client{Transport: &http.Transport{Proxy: http.ProxyURL(proxyUrl)}}

Definir proxy si lo tenemos (podemos poner proxyUrl a nil y lo ignorara)
proxyUrl,_ := url.Parse("http://proxy.com:343")
myClient = &http.Client{Transport: &http.Transport{Proxy: http.ProxyURL(proxyUrl)}}



## POST json
jsonStr := []byte(`{"title":"Buy cheese and bread for breakfast."}`)
req, err := http.NewRequest("POST", "/", bytes.NewBuffer(jsonStr))
Pasar cabeceras?
https://stackoverflow.com/questions/24455147/how-do-i-send-a-json-string-in-a-post-request-in-go

## POST con file multipart
post_multipart_file.go

# URL
https://golang.org/pkg/net/url/
http://stackoverflow.com/a/34668130

import "net/url"
import "path"

u, err := url.Parse("http://foo")
u.Path = path.Join(u.Path, "bar")
s := u.String()

fmt.Println(path.Join([]string{"hola","aduios"}...))

CUIDADO! si hacemos un path.Join y debe terminar en "/" esto no lo hará!


Escape:
fmt.Println(url.QueryEscape("hola que tal"))
hola+que+tal


Definir a mano una URL
u := &url.URL {
    Scheme: "http",
    Host: "www.example.com:6000",
    Path: "recon/diskusage",
}
fmt.Println(u)



# Copiar objeto
original := url.Parse("http://example.com")
copia := &url.URL{}
*copia = *original



# Poner parámetros (?q=x)
u, err := url.Parse("http://bing.com/search?q=dotnet")
if err != nil {
    log.Fatal(err)
}
u.Scheme = "https"
u.Host = "google.com"
q := u.Query()
q.Set("q", "golang")
u.RawQuery = q.Encode()
fmt.Println(u)


# Timeout
https://medium.com/@nate510/don-t-use-go-s-default-http-client-4804cb19f779
var netClient = &http.Client{
  Timeout: time.Second * 10,
}



# Context
Podemos pasar un context a una request para poder cancelarla.

req, err := http.NewRequest("GET", "http://httpbin.org/delay/10", nil)
if err != nil {
  panic(err)
}
req = req.WithContext(ctx)


_, err := c.Do(req)
if err != nil {
  fmt.Println(err)  // Get http://httpbin.org/delay/10: context canceled
}



Ejemplo haciendo llamadas a un endpoint hasta que pasa un tiempo establecido.
Típico caso de cuando queremos hacer pooling a un endpoint hasta que nos devuelva un estado terminado.
http_client_context_deadline.go
