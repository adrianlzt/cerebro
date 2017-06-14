https://github.com/parnurzeal/gorequest
https://gowalker.org/github.com/parnurzeal/gorequest

GoRequest -- Simplified HTTP client ( inspired by nodejs SuperAgent ) http://parnurzeal.github.io/gorequest/
import "github.com/parnurzeal/gorequest"
resp, body, errs := gorequest.New().Get("http://example.com/").End()

CUIDADO! si nos devuelven un codigo 40x, 50x, etc, no lo considera error

Mirar ejemplo (envia un GET y obtiene un JSON en la respuesta):
gorequest_json.go

# Proxy
request := gorequest.New().Proxy("http://proxy:999")

# Basic auth
request := gorequest.New().SetBasicAuth("username", "password")

# JSON
Como enviar JSON: https://github.com/parnurzeal/gorequest#json

# Form / urlencoded
gorequest.New().
  Post("/recipe").
  Type("form").
  Send(`{ "name": "egg benedict", "category": "brunch" }`).
  End()


# Redirects
Se comporta como se especifica en https://golang.org/pkg/net/http/#Client
Mirar en "CheckRedirect specifies the policy..."

Si no queremos seguir el redirect y quedarnos con la peticion:
resp, body, errs := gorequest.New().
  Get("http://httpbin.org/redirect-to?url=http%3A%2F%2Fexample.com%2F").
  RedirectPolicy(func(req gorequest.Request, via []gorequest.Request) error {
    return http.ErrUseLastResponse
  }).End()


# Curl
Sacar el curl equivalente
gorequest.New().SetCurlCommand(true)...

# TLS/SSL
gorequest.New().TLSClientConfig(&tls.Config{ InsecureSkipVerify: true}).
  Get("https://disable-security-check.com").
  End()
