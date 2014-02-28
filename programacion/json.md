JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

Parser: apt-get intall jq
cat file.json | jq -r '.[0].Network.IP' <- Coge del primer elemento del array, el hash Network, y dentro el valor de IP

El procesado de JSON es bastante costoso, va analizando cada caracter viendo si es un paréntesis, corchete, dato, etc. Cuando cierra alguno de los elementos, hace un cast de lo que ha leído para convertirlo a lo que toque.
El problema es que no hay metadata, por eso tiene que hacer ese procesado tan costoso.
Lo cuentan en el video: http://vimeo.com/64659016  16:45

Solución messagepack
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
