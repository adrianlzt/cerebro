http://stedolan.github.io/jq/
Otra opción: jp (https://github.com/jmespath/jp)

faq: otra opción que vale para bson,json, toml, xml, yaml: https://github.com/jzelinskie/faq/blob/master/README.md
para xml: xq

"gron" nos vale para hacer grep sobre json (nos saca la estructura en plano del json, una linea por elemento)

Test online:
https://jqplay.org/

pacman -S jq

cat fichero.json | jq '.key'


jq '.parent' fichero.json
jq '.parent,.other' fichero.json

Keys con carecteres raros:
.foo.["some:strange"]

jq -r '.cosa'
  quitamos las comillas

jq '.data[]._id' /tmp/incidencias
nos da todos los ids del array data
tambien nos vale para iterar por keys de un diccionario

curl ... | jq '.items[] |.metadata.name,.spec.nodeName,.status.podIP'
de un array sacar varios valores por cada vuelta

'.node[] | .name,(.tasks|length)
de un dict, iterar por sus claves y obtener el campo name y la lontigud de la key "tasks"

jq -r '.data[] | {id: .eid, status: .status, subject: .contact.subject}' /tmp/incidencias
un array con un monton de valores, simplificarlo para solo tener un monton de diccionarios con unos pocos valores

Añadir:
Añadir un objecto al final
.+{"obj":true}


Borrar
del(.[].foo,.[].bar)
input: [{"foo": 42, "bar": 9001, "baz": 42},{"foo": 42, "bar": 9001, "baz": 42}]
output: [{"baz":42},{"baz":42}]

Borrar una parte y agregar otra:
del(.meta)|.+{"overwrite":true}


Indices
Localizar un elemento en un array:
  jq 'indices(1)'
  Input[0,1,2,1,3,1,4]
  Output[1,3,5]


Convertir diccionario a array. Tambien tenemos from_entries (array a dict) y with_entries (para hacer to_entries | map | from_entries)
echo '{"aa": {"foo": 2}, "bb": {"foo": 1}}' | jq '. | to_entries'
[
  {
    "key": "aa",
    "value": {
      "foo": 2
    }
  },
  {
    "key": "bb",
    "value": {
      "foo": 1
    }
  }
]




Extraer las keys de un diccionario:
cat fichero.json | jq '.[].mappings | to_entries[] | .key'
Nos devolverá una linea por cada key que cuelga de "mappings" (que a su vez colgaba de un diccionario)


Keys de un dict:
.nodes | keys


# Contar elementos
https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions
Cuenta cuantas keys de primer nivel tenemos en el doc
cat fichero.json | jq '. | length'

The length of a string is the number of Unicode codepoints it contains (which will be the same as its JSON-encoded length in bytes if it’s pure ASCII).
The length of an array is the number of elements.
The length of an object is the number of key-value pairs.
The length of null is zero.


# Filtrar / regex
less hosts.json | jq '.big | to_entries[] | select (.key | test("es.wcorp")) | [.key, .value.count]'

test negativo (inverso)
less hosts.json | jq '.big | to_entries[] | select (.key | test("es.wcorp") | not) | [.key, .value.count]'

https://stackoverflow.com/questions/18592173/select-objects-based-on-value-of-variable-in-object-using-jq
jq '.[] | select(.location=="Stockholm") | .name' json



# Formatear con tsv (tabs)
https://ubuntu.com/blog/improving-cli-output-with-jq

Lo podemos usar para mostrar como una tabla un array

➜ curl -s httpbin.org/get | jq -r '.headers | keys | @tsv'
Accept  Host    User-Agent      X-Amzn-Trace-Id


# ndjson to json
Si tenemos un fichero con muchos dict json, si queremos meterlos en un array:
cat file.json | jq -s
