https://github.com/parnurzeal/gorequest
https://gowalker.org/github.com/parnurzeal/gorequest

GoRequest -- Simplified HTTP client ( inspired by nodejs SuperAgent ) http://parnurzeal.github.io/gorequest/
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
