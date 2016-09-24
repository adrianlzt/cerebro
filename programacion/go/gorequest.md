https://github.com/parnurzeal/gorequest

GoRequest -- Simplified HTTP client ( inspired by nodejs SuperAgent ) http://parnurzeal.github.io/gorequest/
resp, body, errs := gorequest.New().Get("http://example.com/").End()

CUIDADO! si nos devuelven un codigo 40x, 50x, etc, no lo considera error


