https://github.com/dakrone/clj-http

Para bajar fichero mirar io.md

# Ejemplo
lein repl
=> (require '[clj-http.client :as client])
=> (client/get "http://httpbin.org/get")
{:status 200, :headers {"Server" "nginx", "Date" "Fri, 15 Jul 2016 14:46:37 GMT", "Content-Type" "application/json", "Content-Length" "233", "Connection" "close", "Access-Control-Allow-Origin" "*", "Access-Control-Allow-Credentials" "true"}, :body "{\n  \"args\": {}, \n  \"headers\": {\n    \"Accept-Encoding\": \"gzip, deflate\", \n    \"Host\": \"httpbin.org\", \n    \"User-Agent\": \"Apache-HttpClient/4.5.1 (Java/1.7.0_79)\"\n  }, \n  \"origin\": \"82.158.139.23\", \n  \"url\": \"http://httpbin.org/get\"\n}\n", :request-time 379, :trace-redirects ["http://httpbin.org/get"], :orig-content-encoding nil}

=> (get (client/get "http://httpbin.org/get") :status)
200


# JSON
=> (get (get (client/get "http://httpbin.org/get" {:as :json}) :body) :origin)
"82.158.139.23"

# Auth

Peticion con auth, que devuelve un json. Del json cogemos el body, que es un array. Luego obtenemos todos los campos description del array.
=> (map :description (get (client/get "https://tt.com/api/" {:basic-auth "user:pass", :as :json}) :body))


# POST
https://github.com/dakrone/clj-http#post

(client/post "http://site.com" {:form-params {:foo "bar"} :content-type :json})
