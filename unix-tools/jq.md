http://stedolan.github.io/jq/ 

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

curl ... | jq '.items[] |.metadata.name,.spec.nodeName,.status.podIP'
de un array sacar varios valores por cada vuelta

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


Extraer las keys de un diccionario:
cat fichero.json | jq '.[].mappings | to_entries[] | .key'
Nos devolverá una linea por cada key que cuelga de "mappings" (que a su vez colgaba de un diccionario)


# Contar elementos
https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions
Cuenta cuantas keys de primer nivel tenemos en el doc
cat fichero.json | jq '. | length'

The length of a string is the number of Unicode codepoints it contains (which will be the same as its JSON-encoded length in bytes if it’s pure ASCII).
The length of an array is the number of elements.
The length of an object is the number of key-value pairs.
The length of null is zero.
