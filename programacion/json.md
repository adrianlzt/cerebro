Generador de JSONs: http://beta.json-generator.com/
Se le puede pasar un template

Pseudocódigo para definir funciones y pseudoprogramación para generar json
jsonnet (mirar ejemplos de libs de grafana grafananet)

Comparador:
http://tlrobinson.net/projects/javascript-fun/jsondiff
http://json-diff.com/


JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

# JQ
Parser: apt-get intall jq
cat file.json | jq -r '.[0].Network.IP' <- Coge del primer elemento del array, el hash Network, y dentro el valor de IP

# JSON greppable
go get -u github.com/tomnomnom/gron
cat fichero.json | gron


Convertir YAML a JSON:
ruby -r json -r yaml -e "yaml = YAML.load(File.read('./stack.yml')); print yaml.to_json" > stack.json

El procesado de JSON es bastante costoso, va analizando cada caracter viendo si es un paréntesis, corchete, dato, etc. Cuando cierra alguno de los elementos, hace un cast de lo que ha leído para convertirlo a lo que toque.
El problema es que no hay metadata, por eso tiene que hacer ese procesado tan costoso.
Lo cuentan en el video: http://vimeo.com/64659016  16:45

Prometheus tampoco lo usa para su formato por ser muy lento: https://youtu.be/qMwdwHiuzsc?t=500

Mismo Skydive: https://youtu.be/EGUzIPTb9cs?t=1301 (usan protocol buffers)

Solución messagepack, protocol buffers?
Enviar informacion json desde la linea de comandos


Enviar json desde la shell:
curl --user user --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/

Generar formularios JSON:
http://exavolt.github.io/onde/#?schema_url=schemas/jquery-package.json


Parsear JSON para ver si está correcto: http://jsonlint.com/

Mostrar JSON con desplegables: http://jsonviewer.stack.hu/


{
    "var": "cosa",
    "array": [
        "valor",
        "otro"
    ],
    "hash": {
        "cosa1": "valor1",
        "cosa2": 23
    }
}


# Tipos de datos
http://www.tutorialspoint.com/json/json_data_types.htm

## Boolean
true
false



# JSON firmados
jwt.io
https://github.com/dgrijalva/jwt-go#what-the-heck-is-a-jwt
In short, it's a signed JSON object that does something useful (for example, authentication). It's commonly used for Bearer tokens in Oauth 2. A token is made of three parts, separated by .'s. The first two parts are JSON objects, that have been base64url encoded. The last part is the signature, encoded the same way.

It's important to know that JWT does not provide encryption, which means anyone who has access to the token can read its contents. If you need to protect (encrypt) the data, there is a companion spec, JWE, that provides this functionality. JWE is currently outside the scope of this library.

Python: https://github.com/jpadilla/pyjwt (pacman -S python-pyjwt)
Desencriptar, comprobando con la key que los datos son legitimos:
jwt --key="this_is_my_secret_long_enough_to_be_valid" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRlbW8xMCJ9.eyJzdWIiOiIxMjM0In0.-4hQDsVN5XQY5LTmbx5atWCZMnSFKpaNSwG12jK0qHI

Descifrar online: https://www.jsonwebtoken.io/

Usado en openid




# JSON path
Sintaxis para seleccionar datos de un JSON
https://goessner.net/articles/JsonPath/index.html#e2

Online evaluator:
https://jsonpath.com/

Filtrar por una cadena de texto:
.events[0].attributes[?(@.name=='screen_name')].value

